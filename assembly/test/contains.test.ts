import { TestAvlTree } from "./testUtils";

describe("contains", () => {
  it("should return false if the tree is empty", () => {
    const tree = new TestAvlTree<i32, string>();
    expect<bool>(tree.contains(1)).toBe(false);
  });

  it("should return whether the tree contains a node", () => {
    const tree = new TestAvlTree<i32, string>();
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
    const tree = new TestAvlTree<i32, string>();
    tree.insert(2);
    expect<bool>(tree.contains(1)).toBe(false);
    expect<bool>(tree.contains(3)).toBe(false);
  });
});
