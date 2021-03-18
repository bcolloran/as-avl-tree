import { AvlTree } from "../avlTree";

describe("isEmpty", () => {
  it("should return whether the tree is empty", () => {
    const tree = new AvlTree<i32>();
    expect<bool>(tree.isEmpty).toBe(true);
    tree.insert(1);
    expect<bool>(tree.isEmpty).toBe(false);
    tree.insert(2);
    expect<bool>(tree.isEmpty).toBe(false);
    tree.delete(2);
    expect<bool>(tree.isEmpty).toBe(false);
    tree.delete(1);
    expect<bool>(tree.isEmpty).toBe(true);
  });
});
