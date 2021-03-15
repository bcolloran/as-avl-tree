import { AvlTree } from "../avlTree";
import { Node } from "../node";

type StringNode = Node<i32, string> | null;

const i32NullStringNode = (x: i32): StringNode =>
  new Node<i32, string>(2, null);

describe("insert", () => {
  it("should return the size of the tree", () => {
    const tree = new AvlTree<i32, string>();
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);
    expect<i32>(tree.size).toBe(5);
  });

  it("should ignore insert of duplicate key", () => {
    const tree = new AvlTree<i32, string>();
    tree.insert(1);
    tree.insert(1);
    expect<i32>(tree.size).toBe(1);
  });

  /* prettier-ignore
   *
   *         c
   *        / \           _b_
   *       b   z         /   \
   *      / \     ->    a     c
   *     a   y         / \   / \
   *    / \           w   x y   z
   *   w   x
   */ it("should correctly balance the left left case", () => {
    const tree = new AvlTree<i32, string>();
    tree.insert(3);
    tree.insert(2);
    tree.insert(1);

    const root = tree.root;
    if (root === null) {
      throw new Error("must not be null");
    }
    expect<i32>(root.key).toBe(2);
  });

  /* prettier-ignore
   *       c
   *      / \           _b_
   *     a   z         /   \
   *    / \     ->    a     c
   *   w   b         / \   / \
   *      / \       w   x y   z
   *     x   y
   */ it("should correctly balance the left right case", () => {
    const tree = new AvlTree<i32, string>();
    tree.insert(3);
    tree.insert(1);
    tree.insert(2);
    const root = tree.root;
    if (root === null) {
      throw new Error("must not be null");
    }
    expect<i32>(root.key).toBe(2);
  });

  /* prettier-ignore
   *     a
   *    / \               _b_
   *   w   b             /   \
   *      / \     ->    a     c
   *     x   c         / \   / \
   *        / \       w   x y   z
   *       y   z
   */
  it("should correctly balance the right right case", () => {
    const tree = new AvlTree<i32, string>();
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    const root = tree.root;
    if (root === null) {
      throw new Error("must not be null");
    }
    expect<i32>(root.key).toBe(2);
  });

  /* prettier-ignore
   *     a
   *    / \             _b_
   *   w   c           /   \
   *      / \   ->    a     c
   *     b   z       / \   / \
   *    / \         w   x y   z
   *   x   y
   */
  it("should correctly balance the right left case", () => {
    const tree = new AvlTree<i32, string>();
    tree.insert(1);
    tree.insert(3);
    tree.insert(2);
    const root = tree.root;
    if (root === null) {
      throw new Error("must not be null");
    }
    expect<i32>(root.key).toBe(2);
  });
});
