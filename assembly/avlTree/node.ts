/**
 * @license Copyright Daniel Imms <http://www.growingwiththeweb.com> Released
 *   under MIT license. See LICENSE in the project root for details.
 */

export class Node<K> {
  public left: Node<K> | null = null;
  public right: Node<K> | null = null;
  // public height: i32 | null = null;
  public height: i32 = 0;

  /**
   * Creates a new AVL Tree node.
   *
   * @param key The key of the new node.
   * @param value The value of the new node.
   */
  constructor(public key: K) {}

  /**
   * Performs a right rotate on this node.
   *
   * @returns The root of the sub-tree; the node where this node used to be.
   * @throws If Node.left is null.
   */
  public rotateRight(): Node<K> {
    //     b                           a
    //    / \                         / \
    //   a   e -> b.rotateRight() -> c   b
    //  / \                             / \
    // c   d                           d   e
    const other = <Node<K>>this.left;
    this.left = other.right;
    other.right = this;
    this.height = max(this.leftHeight, this.rightHeight) + 1;
    other.height = max(other.leftHeight, this.height) + 1;
    return other;
  }

  /**
   * Performs a left rotate on this node.
   *
   * @returns The root of the sub-tree; the node where this node used to be.
   * @throws If Node.right is null.
   */
  public rotateLeft(): Node<K> {
    //   a                              b
    //  / \                            / \
    // c   b   -> a.rotateLeft() ->   a   e
    //    / \                        / \
    //   d   e                      c   d
    const other = <Node<K>>this.right;
    this.right = other.left;
    other.left = this;
    this.height = max(this.leftHeight, this.rightHeight) + 1;
    other.height = max(other.rightHeight, this.height) + 1;
    return other;
  }

  /**
   * Convenience function to get the height of the left child of the node,
   * returning -1 if the node is null.
   *
   * @returns The height of the left child, or -1 if it doesn't exist.
   */
  public get leftHeight(): i32 {
    const left = this.left;
    return left == null ? -1 : left.height;
  }

  /**
   * Convenience function to get the height of the right child of the node,
   * returning -1 if the node is null.
   *
   * @returns The height of the right child, or -1 if it doesn't exist.
   */
  public get rightHeight(): i32 {
    const right = this.right;
    return right == null ? -1 : right.height;
  }
}
