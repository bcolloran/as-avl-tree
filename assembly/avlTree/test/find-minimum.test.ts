import { AvlTree } from "../avlTree";

describe("findMinimum", () => {
  // it("should return null when the tree is empty", () => {
  //   const tree = new AvlTree();
  //   expect(tree.findMinimum()).toBeNull();
  // });

  it("should return the minimum key in the tree", () => {
    const tree = new AvlTree<i32>();
    tree.insert(5);
    tree.insert(3);
    tree.insert(1);
    tree.insert(4);
    tree.insert(2);
    expect<i32>(tree.findMinimum()).toBe(1);
  });
});
