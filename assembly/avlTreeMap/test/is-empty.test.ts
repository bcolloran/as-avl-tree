import { AvlTree } from "./testUtils";

describe("isEmpty", () => {
  it("should return whether the tree is empty", () => {
    const tree = new AvlTree();
    expect(tree.isEmpty).toBe(true);
    tree.insert(1);
    expect(tree.isEmpty).toBe(false);
    tree.delete(1);
    expect(tree.isEmpty).toBe(true);
  });
});
