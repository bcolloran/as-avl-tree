import { AvlTree } from "../avlTree";

describe("contains", () => {
  it("should return false if the tree is empty", () => {
    const tree = new AvlTree<i32>();
    expect<bool>(tree.contains(1)).toBe(false);
  });

  it("should return whether the tree contains a node", () => {
    const tree = new AvlTree<i32>();
    expect<bool>(tree.contains(1)).toBe(false);
    expect<bool>(tree.contains(2)).toBe(false);
    expect<bool>(tree.contains(3)).toBe(false);
    tree.insert(3);
    tree.insert(1);
    tree.insert(2);
    expect<bool>(tree.contains(1)).toBe(true);
    expect<bool>(tree.contains(2)).toBe(true);
    expect<bool>(tree.contains(3)).toBe(true);
  });

  it("should return false when the expected parent has no children", () => {
    const tree = new AvlTree<i32>();
    tree.insert(2);
    expect<bool>(tree.contains(1)).toBe(false);
    expect<bool>(tree.contains(3)).toBe(false);
  });
});
