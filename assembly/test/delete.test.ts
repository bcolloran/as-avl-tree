import { TestAvlTree } from "./testUtils";

describe("delete", () => {
  xit("should not change the size of a tree with no root", () => {
    const tree = new TestAvlTree();
    tree.delete(1);
    expect(tree.size).toBe(0);
  });

  xit("should delete a single key", () => {
    const tree = new TestAvlTree();
    tree.insert(1);
    tree.delete(1);
    expect(tree.isEmpty).toBe(true);
  });

  /** _4_ _2_ / \ / \ 2 6 -> delete(6) -> 1 4 / \ / 1 3 3 */
  xit("should correctly balance the left left case", () => {
    const tree = new TestAvlTree();
    tree.insert(4, 4);
    tree.insert(2, 2);
    tree.insert(6, 6);
    tree.insert(3, 3);
    tree.insert(5, 5);
    tree.insert(1, 1);
    tree.insert(7, 7);
    tree.delete(7);
    tree.delete(5);
    tree.delete(6);
    // if (!tree.root) {
    //      assert.fail("tree.root must exist");
    //     return;
    //   }
    expect(tree.root?.key).toBe(2);
    expect(tree.root?.value).toBe(2);
    // if (!tree.root?.left) {
    //   assert.fail("tree.root?.left must exist");
    //   return;
    // }
    expect(tree.root?.left?.key).toBe(1);
    expect(tree.root?.left?.value).toBe(1);
    // if (!tree.root?.right) {
    //   assert.fail("tree.root?.right must exist");
    //   return;
    // }
    expect(tree.root?.right?.key).toBe(4);
    expect(tree.root?.right?.value).toBe(4);
    // if (!tree.root?.right?.left) {
    //   assert.fail("tree.root?.right?.left must exist");
    //   return;
    // }
    expect(tree.root?.right?.left?.key).toBe(3);
    expect(tree.root?.right?.left?.value).toBe(3);
  });

  /** _4_ _6_ / \ / \ 2 6 -> delete(2) -> 4 7 / \ \ 5 7 5 */
  xit("should correctly balance the right right case", () => {
    const tree = new TestAvlTree();
    tree.insert(4, 4);
    tree.insert(2, 2);
    tree.insert(6, 6);
    tree.insert(3, 3);
    tree.insert(5, 5);
    tree.insert(1, 1);
    tree.insert(7, 7);
    tree.delete(1);
    tree.delete(3);
    tree.delete(2);
    // if (!tree.root) {
    //      assert.fail("tree.root must exist");
    //     return;
    //   }
    expect(tree.root?.key).toBe(6);
    expect(tree.root?.value).toBe(6);
    // if (!tree.root?.left) {
    //   assert.fail("tree.root?.left must exist");
    //   return;
    // }
    expect(tree.root?.left?.key).toBe(4);
    expect(tree.root?.left?.value).toBe(4);
    // if (!tree.root?.left?.right) {
    //   assert.fail("tree.root?.left?.right must exist");
    //   return;
    // }
    expect(tree.root?.left?.right?.key).toBe(5);
    expect(tree.root?.left?.right?.value).toBe(5);
    // if (!tree.root?.right) {
    //   assert.fail("tree.root?.right must exist");
    //   return;
    // }
    expect(tree.root?.right?.key).toBe(7);
    expect(tree.root?.right?.value).toBe(7);
  });

  /** _6_ _4_ / \ / \ 2 7 -> delete(8) -> 2 6 / \ \ / \ / \ 1 4 8 1 3 5 7 / \ 3 5 */
  xit("should correctly balance the left right case", () => {
    const tree = new TestAvlTree();
    tree.insert(6, 6);
    tree.insert(2, 2);
    tree.insert(7, 7);
    tree.insert(1, 1);
    tree.insert(8, 8);
    tree.insert(4, 4);
    tree.insert(3, 3);
    tree.insert(5, 5);
    tree.delete(8);
    // if (!tree.root) {
    //      assert.fail("tree.root must exist");
    //     return;
    //   }
    expect(tree.root?.key).toBe(4);
    expect(tree.root?.value).toBe(4);
    // if (!tree.root?.left) {
    //   assert.fail("tree.root?.left must exist");
    //   return;
    // }
    expect(tree.root?.left?.key).toBe(2);
    expect(tree.root?.left?.value).toBe(2);
    // if (!tree.root?.left?.left) {
    //   assert.fail("tree.root?.left?.left must exist");
    //   return;
    // }
    expect(tree.root?.left?.left?.key).toBe(1);
    expect(tree.root?.left?.left?.value).toBe(1);
    // if (!tree.root?.left?.right) {
    //   assert.fail("tree.root?.left?.right must exist");
    //   return;
    // }
    expect(tree.root?.left?.right?.key).toBe(3);
    expect(tree.root?.left?.right?.value).toBe(3);
    // if (!tree.root?.right) {
    //   assert.fail("tree.root?.right must exist");
    //   return;
    // }
    expect(tree.root?.right?.key).toBe(6);
    expect(tree.root?.right?.value).toBe(6);
    // if (!tree.root?.right?.left) {
    //   assert.fail("tree.root?.right?.left must exist");
    //   return;
    // }
    expect(tree.root?.right?.left?.key).toBe(5);
    expect(tree.root?.right?.left?.value).toBe(5);
    // if (!tree.root?.right?.right) {
    //   assert.fail("tree.root?.right?.right must exist");
    //   return;
    // }
    expect(tree.root?.right?.right?.key).toBe(7);
    expect(tree.root?.right?.right?.value).toBe(7);
  });

  /** _3_ _5_ / \ / \ 2 7 -> delete(1) -> 3 7 / / \ / \ / \ 1 5 8 2 4 6 8 / \ 4 6 */
  xit("should correctly balance the right left case", () => {
    const tree = new TestAvlTree();
    tree.insert(3, 3);
    tree.insert(2, 2);
    tree.insert(7, 7);
    tree.insert(1, 1);
    tree.insert(8, 8);
    tree.insert(5, 5);
    tree.insert(4, 4);
    tree.insert(6, 6);
    tree.delete(1);
    // if (!tree.root) {
    //      assert.fail("tree.root must exist");
    //     return;
    //   }
    expect(tree.root?.key).toBe(5);
    expect(tree.root?.value).toBe(5);
    // if (!tree.root?.left) {
    //   assert.fail("tree.root?.left must exist");
    //   return;
    // }
    expect(tree.root?.left?.key).toBe(3);
    expect(tree.root?.left?.value).toBe(3);
    // if (!tree.root?.left?.left) {
    //   assert.fail("tree.root?.left?.left must exist");
    //   return;
    // }
    expect(tree.root?.left?.left?.key).toBe(2);
    expect(tree.root?.left?.left?.value).toBe(2);
    // if (!tree.root?.left?.right) {
    //   assert.fail("tree.root?.left?.right must exist");
    //   return;
    // }
    expect(tree.root?.left?.right?.key).toBe(4);
    expect(tree.root?.left?.right?.value).toBe(4);
    // if (!tree.root?.right) {
    //   assert.fail("tree.root?.right must exist");
    //   return;
    // }
    expect(tree.root?.right?.key).toBe(7);
    expect(tree.root?.right?.value).toBe(7);
    // if (!tree.root?.right?.left) {
    //   assert.fail("tree.root?.right?.left must exist");
    //   return;
    // }
    expect(tree.root?.right?.left?.key).toBe(6);
    expect(tree.root?.right?.left?.value).toBe(6);
    // if (!tree.root?.right?.right) {
    //   assert.fail("tree.root?.right?.right must exist");
    //   return;
    // }
    expect(tree.root?.right?.right?.key).toBe(8);
    expect(tree.root?.right?.right?.value).toBe(8);
  });

  xit("should take the right child if the left does not exist", () => {
    const tree = new TestAvlTree();
    tree.insert(1, 1);
    tree.insert(2, 2);
    tree.delete(1);
    // if (!tree.root) {
    //      assert.fail("tree.root must exist");
    //     return;
    //   }
    expect(tree.root?.key).toBe(2);
    expect(tree.root?.value).toBe(2);
  });

  xit("should take the left child if the right does not exist", () => {
    const tree = new TestAvlTree();
    tree.insert(2, 2);
    tree.insert(1, 1);
    tree.delete(2);
    // if (!tree.root) {
    //      assert.fail("tree.root must exist");
    //     return;
    //   }
    expect(tree.root?.key).toBe(1);
    expect(tree.root?.value).toBe(1);
  });

  xit("should get the right child if the node has 2 leaf children", () => {
    const tree = new TestAvlTree();
    tree.insert(2, 2);
    tree.insert(1, 1);
    tree.insert(3, 3);
    tree.delete(2);
    // if (!tree.root) {
    //      assert.fail("tree.root must exist");
    //     return;
    //   }
    expect(tree.root?.key).toBe(3);
    expect(tree.root?.value).toBe(3);
  });

  xit("should get the in-order successor if the node has both children", () => {
    const tree = new TestAvlTree();
    tree.insert(2, 2);
    tree.insert(1, 1);
    tree.insert(4, 4);
    tree.insert(3, 3);
    tree.insert(5, 5);
    tree.delete(2);
    // if (!tree.root) {
    //      assert.fail("tree.root must exist");
    //     return;
    //   }
    expect(tree.root?.key).toBe(3);
    expect(tree.root?.value).toBe(3);
  });
});
