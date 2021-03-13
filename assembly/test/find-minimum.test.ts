import { TestAvlTree } from "./testUtils";

describe("findMinimum", () => {
  xit("should return null when the tree is empty", () => {
    const tree = new TestAvlTree();
    assert.equal(tree.findMinimum(), null);
  });

  xit("should return the minimum key in the tree", () => {
    const tree = new TestAvlTree();
    tree.insert(5);
    tree.insert(3);
    tree.insert(1);
    tree.insert(4);
    tree.insert(2);
    assert.equal(tree.findMinimum(), 1);
  });
});
