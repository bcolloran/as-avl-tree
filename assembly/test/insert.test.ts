import { TestAvlTree } from "./testUtils";

describe("insert", () => {
  xit("should return the size of the tree", () => {
    const tree = new TestAvlTree();
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);
    expect(tree.size).toBe(5);
  });

  xit("should ignore insert of duplicate key", () => {
    const tree = new TestAvlTree();
    tree.insert(1);
    tree.insert(1);
    expect(tree.size).toBe(1);
  });

  /** C / \ _b_ b z / \ / \ -> a c a y / \ / \ / \ w x y z w x */
  xit("should correctly balance the left left case", () => {
    const tree = new TestAvlTree();
    tree.insert(3);
    tree.insert(2);
    tree.insert(1);
    // if (!tree.root) {
    //   assert.fail("tree.root must exist");
    //   return;
    // }
    expect(tree.root?.key).toBe(2);
  });

  /** C / \ _b_ a z / \ / \ -> a c w b / \ / \ / \ w x y z x y */
  xit("should correctly balance the left right case", () => {
    const tree = new TestAvlTree();
    tree.insert(3);
    tree.insert(1);
    tree.insert(2);
    // if (!tree.root) {
    //   assert.fail("tree.root must exist");
    //   return;
    // }
    expect(tree.root?.key).toBe(2);
  });

  /** A / \ _b_ w b / \ / \ -> a c x c / \ / \ / \ w x y z y z */
  xit("should correctly balance the right right case", () => {
    const tree = new TestAvlTree();
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    // if (!tree.root) {
    //   assert.fail("tree.root must exist");
    //   return;
    // }
    expect(tree.root?.key).toBe(2);
  });

  /** A / \ _b_ w c / \ / \ -> a c b z / \ / \ / \ w x y z x y */
  xit("should correctly balance the right left case", () => {
    const tree = new TestAvlTree();
    tree.insert(1);
    tree.insert(3);
    tree.insert(2);
    // if (!tree.root) {
    //   assert.fail("tree.root must exist");
    //   return;
    // }
    expect(tree.root?.key).toBe(2);
  });
});
