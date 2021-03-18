/**
 * @license Copyright Daniel Imms <http://www.growingwiththeweb.com> Released
 *   under MIT license. See LICENSE in the project root for details.
 */

import { Node } from "./node";

/** Represents how balanced a node's left and right children are. */
const enum BalanceState {
  /** Right child's height is 2+ greater than left child's height */
  UNBALANCED_RIGHT,
  /** Right child's height is 1 greater than left child's height */
  SLIGHTLY_UNBALANCED_RIGHT,
  /** Left and right children have the same height */
  BALANCED,
  /** Left child's height is 1 greater than right child's height */
  SLIGHTLY_UNBALANCED_LEFT,
  /** Left child's height is 2+ greater than right child's height */
  UNBALANCED_LEFT,
}

type CompareFunction<K> = (a: K, b: K) => i32;

/**
 * Compares two keys with each other.
 *
 * @param a The first key to compare.
 * @param b The second key to compare.
 * @returns -1, 0 or 1 if a < b, a == b or a > b respectively.
 */
function _defaultCompare<K>(a: K, b: K): i32 {
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  return 0;
}

export class AvlTree<K> {
  protected _root: Node<K> | null = null;
  private _size: i32 = 0;

  private _compare: CompareFunction<K> = (a: K, b: K): i32 => {
    if (!(isInteger<K>() || isFloat<K>() || isString<K>())) {
      throw new Error(
        "A custom CompareFunction must be defined for types other than integers, floats and strings"
      );
    }
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    return 0;
  };

  /**
   * Creates a new AVL Tree.
   *
   * @param compare An custom compare function. Required for types other than
   *   integers, floats, and strings.
   */
  constructor(compare: CompareFunction<K> | null = null) {
    if (compare != null) {
      this._compare = compare;
    }
  }

  /**
   * Inserts a new node with a specific key into the tree.
   *
   * @param key The key being inserted.
   */
  public insert(key: K): void {
    this._root = this._insert(key, this._root);
    this._size++;
  }

  /**
   * Inserts a new node with a specific key into the tree.
   *
   * @param key The key being inserted.
   * @param root The root of the tree to insert in.
   * @returns The new tree root.
   */
  private _insert(key: K, root: Node<K> | null): Node<K> {
    // Perform regular BST insertion
    if (root == null) {
      return new Node(key);
    }

    if (this._compare(key, root.key) < 0) {
      root.left = this._insert(key, root.left);
    } else if (this._compare(key, root.key) > 0) {
      root.right = this._insert(key, root.right);
    } else {
      // It's a duplicate so insertion failed, decrement size to make up for it
      this._size--;
      return root;
    }

    // Update height and rebalance tree
    root.height = max(root.leftHeight, root.rightHeight) + 1;
    const balanceState = this._getBalanceState(root);

    if (balanceState == BalanceState.UNBALANCED_LEFT) {
      if (this._compare(key, (<Node<K>>root.left).key) < 0) {
        // Left left case
        root = root.rotateRight();
      } else {
        // Left right case
        root.left = (<Node<K>>root.left).rotateLeft();
        return root.rotateRight();
      }
    }

    if (balanceState == BalanceState.UNBALANCED_RIGHT) {
      if (this._compare(key, (<Node<K>>root.right).key) > 0) {
        // Right right case
        root = root.rotateLeft();
      } else {
        // Right left case
        root.right = (<Node<K>>root.right).rotateRight();
        return root.rotateLeft();
      }
    }

    return root;
  }

  /**
   * Deletes a node with a specific key from the tree.
   *
   * @param key The key being deleted.
   */
  public delete(key: K): void {
    this._root = this._delete(key, this._root);
    this._size--;
  }

  /**
   * Deletes a node with a specific key from the tree.
   *
   * @param key The key being deleted.
   * @param root The root of the tree to delete from.
   * @returns The new tree root.
   */
  private _delete(key: K, root: Node<K> | null): Node<K> | null {
    // Perform regular BST deletion
    if (root == null) {
      this._size++;
      return root;
    }

    if (this._compare(key, root.key) < 0) {
      // The key to be deleted is in the left sub-tree
      root.left = this._delete(key, root.left);
    } else if (this._compare(key, root.key) > 0) {
      // The key to be deleted is in the right sub-tree
      root.right = this._delete(key, root.right);
    } else {
      // root is the node to be deleted
      if (!root.left && !root.right) {
        root = null;
      } else if (!root.left && root.right) {
        root = root.right;
      } else if (root.left && !root.right) {
        root = root.left;
      } else {
        // Node has 2 children, get the in-order successor
        const inOrderSuccessor = this._minKeyNode(<Node<K>>root.right);
        root.key = inOrderSuccessor.key;
        root.right = this._delete(inOrderSuccessor.key, root.right);
      }
    }

    if (root == null) {
      return root;
    }

    // Update height and rebalance tree
    root.height = max(root.leftHeight, root.rightHeight) + 1;
    const balanceState = this._getBalanceState(root);

    if (balanceState == BalanceState.UNBALANCED_LEFT) {
      // Left left case
      if (
        this._getBalanceState(<Node<K>>root.left) == BalanceState.BALANCED ||
        this._getBalanceState(<Node<K>>root.left) ==
          BalanceState.SLIGHTLY_UNBALANCED_LEFT
      ) {
        return root.rotateRight();
      }
      // Left right case
      // this._getBalanceState(root.left) == BalanceState.SLIGHTLY_UNBALANCED_RIGHT
      root.left = (<Node<K>>root.left).rotateLeft();
      return root.rotateRight();
    }

    if (balanceState == BalanceState.UNBALANCED_RIGHT) {
      // Right right case
      if (
        this._getBalanceState(<Node<K>>root.right) == BalanceState.BALANCED ||
        this._getBalanceState(<Node<K>>root.right) ==
          BalanceState.SLIGHTLY_UNBALANCED_RIGHT
      ) {
        return root.rotateLeft();
      }
      // Right left case
      // this._getBalanceState(root.right) == BalanceState.SLIGHTLY_UNBALANCED_LEFT
      root.right = (<Node<K>>root.right).rotateRight();
      return root.rotateLeft();
    }

    return root;
  }

  /**
   * Gets the value of a node within the tree with a specific key.
   *
   * @param key The key being searched for.
   * @param root The root of the tree to search in.
   * @returns The value of the node or null if it doesn't exist.
   */
  private _get(key: K, root: Node<K>): Node<K> | null {
    const result = this._compare(key, root.key);
    if (result == 0) return root;

    if (result < 0) {
      const left = root.left;
      return left != null ? this._get(key, left) : null;
    }
    const right = root.right;
    return right != null ? this._get(key, right) : null;
  }

  /**
   * Gets whether a node with a specific key is within the tree.
   *
   * @param key The key being searched for.
   * @returns Whether a node with the key exists.
   */
  public contains(key: K): bool {
    const root = this._root;
    return root != null ? this._get(key, root) != null : false;
  }

  /** @returns The minimum key in the tree or null if there are no nodes. */
  public findMinimum(): K {
    const root = this._root;
    if (root == null) {
      throw new Error("findMaximum cannot be called on an empty tree");
    }
    return this._minKeyNode(root).key;
  }

  /** Gets the maximum key in the tree or null if there are no nodes. */
  public findMaximum(): K {
    const root = this._root;
    if (root == null) {
      throw new Error("findMaximum cannot be called on an empty tree");
    }
    return this._maxKeyNode(root).key;
  }

  /** Gets the size of the tree. */
  public get size(): i32 {
    return this._size;
  }

  /** Gets whether the tree is empty. */
  public get isEmpty(): bool {
    return this._size == 0;
  }

  public get root(): Node<K> | null {
    return this._root;
  }

  /**
   * Starting from given node, retrieves the descendent with minimal key.
   *
   * @param root The node to search.
   * @returns The node with the minimum key in the tree.
   */
  private _minKeyNode(root: Node<K>): Node<K> {
    let current = root;
    let left = current.left;
    while (left !== null) {
      current = left;
      left = current.left;
    }
    return current;
  }

  /**
   * Starting from given node, retrieves the descendent with maximal key.
   *
   * @param root The node to search.
   * @returns The node with the maximum key in the tree.
   */
  private _maxKeyNode(root: Node<K>): Node<K> {
    let current = root;
    let right = current.right;
    while (right !== null) {
      current = right;
      right = current.right;
    }
    return current;
  }

  /**
   * Gets the balance state of a node, indicating whether the left or right
   * sub-trees are unbalanced.
   *
   * @param node The node to get the difference from.
   * @returns The BalanceState of the node.
   */
  private _getBalanceState(node: Node<K>): BalanceState {
    const heightDifference = node.leftHeight - node.rightHeight;
    switch (heightDifference) {
      case -2:
        return BalanceState.UNBALANCED_RIGHT;
      case -1:
        return BalanceState.SLIGHTLY_UNBALANCED_RIGHT;
      case 1:
        return BalanceState.SLIGHTLY_UNBALANCED_LEFT;
      case 2:
        return BalanceState.UNBALANCED_LEFT;
      default:
        return BalanceState.BALANCED;
    }
  }
}
