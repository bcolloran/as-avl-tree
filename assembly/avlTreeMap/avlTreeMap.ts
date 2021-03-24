/**
 * @license Copyright Daniel Imms <http://www.growingwiththeweb.com> Released
 *   under MIT license. See LICENSE in the project root for details.
 */

import { AvlTree, CompareFunction } from "../avlTree/avlTree";

export class AvlTreeMap<K, V> {
  private _tree: AvlTree<K>;
  private _map: Map<K, V>;

  constructor(compare: CompareFunction<K> | null = null) {
    this._tree = new AvlTree<K>(compare);
    this._map = new Map<K, V>();
  }

  /**
   * Inserts a new node with a specific key into the tree.
   *
   * @param key The key being inserted.
   * @param value The value being inserted.
   */
  public insert(key: K, value: V): void {
    this._tree.insert(key);
    this._map.set(key, value);
  }

  /**
   * Deletes a node with a specific key from the tree.
   *
   * @param key The key being deleted.
   */
  public delete(key: K): void {
    this._tree.delete(key);
    this._map.delete(key);
  }

  /**
   * Gets the value of a node within the tree with a specific key.
   *
   * @param key The key being searched for.
   * @param root The root of the tree to search in.
   * @returns The value of the node or null if it doesn't exist.
   */
  private get(key: K): V {
    return this._map.get(key);
  }

  /**
   * Gets whether a node with a specific key is within the tree.
   *
   * @param key The key being searched for.
   * @returns Whether a node with the key exists.
   */
  public contains(key: K): bool {
    return this._map.has(key);
  }

  /** @returns The minimum key in the tree or throw if tree is empty. */
  public findLeftmostValue(): V {
    const key = this._tree.findMinimum();
    return this._map.get(key);
  }

  /** Gets the maximum key in the tree or throw if tree is empty. */
  public findRightmostValue(): V {
    const key = this._tree.findMaximum();
    return this._map.get(key);
  }

  /** Gets the size of the tree. */
  public get size(): i32 {
    return this._tree.size;
  }

  /** Gets whether the tree is empty. */
  public get isEmpty(): bool {
    return this._tree.size == 0;
  }
}
