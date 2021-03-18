import { AvlTree } from "../avlTree";

describe("delete", () => {
  it("should not change the size of a tree with no root", () => {
    const tree = new AvlTree<i32>();
    tree.delete(1);
    expect(tree.size).toBe(0);
  });

  it("should delete a single key", () => {
    const tree = new AvlTree<i32>();
    tree.insert(1);
    tree.delete(1);
    expect(tree.isEmpty).toBe(true);
  });

  /** _4_ _2_ / \ / \ 2 6 -> delete(6) -> 1 4 / \ / 1 3 3 */
  it("should correctly balance the left left case", () => {
    const tree = new AvlTree<i32>();
    tree.insert(4);
    tree.insert(2);
    tree.insert(6);
    tree.insert(3);
    tree.insert(5);
    tree.insert(1);
    tree.insert(7);
    tree.delete(7);
    tree.delete(5);
    tree.delete(6);
    const root = tree.root;
    expect(root).not.toBeNull();
    if (!root) return;
    // if (root == null) {
    //   throw new Error("tree.root must exist");
    //   return;
    // }
    expect(root.key).toBe(2);
    // expect(root.value).toBe(2);

    const left = root.left;
    // if (!left) throw new Error("tree.root.left must exist");

    expect(left).not.toBeNull();
    if (!left) return;
    expect(left.key).toBe(1);
    // expect(left.value).toBe(1);

    const right = root.right;
    expect(right).not.toBeNull();
    if (!right) return;
    // if (!right) throw new Error("tree.root.right must exist");
    // if (!tree.root.right) {
    //   throw new Error("tree.root.right must exist");
    //   return;
    // }
    expect(right.key).toBe(4);
    // expect(right.value).toBe(4);
    // if (!tree.root.right.left) {
    //   throw new Error("tree.root.right.left must exist");
    //   return;
    // }
    const rightleft = right.left;
    expect(rightleft).not.toBeNull();
    if (!rightleft) return;
    expect(rightleft.key).toBe(3);
    // expect(rightleft.value).toBe(3);
  });

  /** _4_ _6_ / \ / \ 2 6 -> delete(2) -> 4 7 / \ \ 5 7 5 */
  it("should correctly balance the right right case", () => {
    const tree = new AvlTree<i32>();
    tree.insert(4);
    tree.insert(2);
    tree.insert(6);
    tree.insert(3);
    tree.insert(5);
    tree.insert(1);
    tree.insert(7);
    tree.delete(1);
    tree.delete(3);
    tree.delete(2);
    const root = tree.root;
    // if (!root) throw new Error("tree.root must exist");
    expect(root).not.toBeNull();
    if (!root) return;

    // if (!tree.root) {
    //      throw new Error("tree.root must exist");
    //     return;
    //   }
    expect(root.key).toBe(6);
    // expect(root.value).toBe(6);

    const left = root.left;
    expect(left).not.toBeNull();
    if (!left) return;
    // if (!tree.root.left) {
    //   throw new Error("tree.root.left must exist");
    //   return;
    // }
    expect(left.key).toBe(4);
    // expect(left.value).toBe(4);
    // if (!left.right) {
    //   throw new Error("left.right must exist");
    //   return;
    // }
    const leftright = left.right;
    expect(leftright).not.toBeNull();
    if (!leftright) return;
    expect(leftright.key).toBe(5);
    // expect(leftright.value).toBe(5);

    const right = root.right;
    expect(right).not.toBeNull();
    if (!right) return;
    // if (!right) throw new Error("tree.root.right must exist");
    // if (!tree.root.right) {
    //   throw new Error("tree.root.right must exist");
    //   return;
    // }
    expect(right.key).toBe(7);
    // expect(right.value).toBe(7);
  });

  /** _6_ _4_ / \ / \ 2 7 -> delete(8) -> 2 6 / \ \ / \ / \ 1 4 8 1 3 5 7 / \ 3 5 */
  it("should correctly balance the left right case", () => {
    const tree = new AvlTree<i32>();
    tree.insert(6);
    tree.insert(2);
    tree.insert(7);
    tree.insert(1);
    tree.insert(8);
    tree.insert(4);
    tree.insert(3);
    tree.insert(5);
    tree.delete(8);
    const root = tree.root;
    // if (!root) throw new Error("tree.root must exist");
    expect(root).not.toBeNull();
    if (!root) return;

    // if (!tree.root) {
    //      throw new Error("tree.root must exist");
    //     return;
    //   }
    expect(root.key).toBe(4);
    // expect(root.value).toBe(4);

    // if (!tree.root.left) {
    //   throw new Error("tree.root.left must exist");
    //   return;
    // }

    const left = root.left;
    expect(left).not.toBeNull();
    if (!left) return;
    expect(left.key).toBe(2);
    // expect(left.value).toBe(2);
    // if (!left.left) {
    //   throw new Error("left.left must exist");
    //   return;
    // }

    const leftleft = left.left;
    expect(leftleft).not.toBeNull();
    if (!leftleft) return;
    expect(leftleft.key).toBe(1);
    // expect(leftleft.value).toBe(1);
    // if (!left.right) {
    //   throw new Error("left.right must exist");
    //   return;
    // }

    const leftright = left.right;
    expect(leftright).not.toBeNull();
    if (!leftright) return;
    expect(leftright.key).toBe(3);
    // expect(leftright.value).toBe(3);

    const right = root.right;
    expect(right).not.toBeNull();
    if (!right) return;
    // if (!right) throw new Error("tree.root.right must exist");
    // if (!tree.root.right) {
    //   throw new Error("tree.root.right must exist");
    //   return;
    // }
    expect(right.key).toBe(6);
    // expect(right.value).toBe(6);
    // if (!tree.root.right.left) {
    //   throw new Error("tree.root.right.left must exist");
    //   return;
    // }
    const rightleft = right.left;
    expect(rightleft).not.toBeNull();
    if (!rightleft) return;
    expect(rightleft.key).toBe(5);
    // expect(rightleft.value).toBe(5);
    // if (!tree.root.right.right) {
    //   throw new Error("tree.root.right.right must exist");
    //   return;
    // }
    const rightright = right.right;
    expect(rightright).not.toBeNull();
    if (!rightright) return;
    expect(rightright.key).toBe(7);
    // expect(rightright.value).toBe(7);
  });

  /** _3_ _5_ / \ / \ 2 7 -> delete(1) -> 3 7 / / \ / \ / \ 1 5 8 2 4 6 8 / \ 4 6 */
  it("should correctly balance the right left case", () => {
    const tree = new AvlTree<i32>();
    tree.insert(3);
    tree.insert(2);
    tree.insert(7);
    tree.insert(1);
    tree.insert(8);
    tree.insert(5);
    tree.insert(4);
    tree.insert(6);
    tree.delete(1);
    const root = tree.root;
    // if (!root) throw new Error("tree.root must exist");
    expect(root).not.toBeNull();
    if (!root) return;

    // if (!tree.root) {
    //      throw new Error("tree.root must exist");
    //     return;
    //   }
    expect(root.key).toBe(5);
    // expect(root.value).toBe(5);

    const left = root.left;
    if (!left) throw new Error("");

    // if (!tree.root.left) {
    //   throw new Error("tree.root.left must exist");
    //   return;
    // }
    expect(left.key).toBe(3);
    // expect(left.value).toBe(3);
    // if (!left.left) {
    //   throw new Error("left.left must exist");
    //   return;
    // }
    const leftleft = left.left;
    expect(leftleft).not.toBeNull();
    if (!leftleft) return;
    expect(leftleft.key).toBe(2);
    // expect(leftleft.value).toBe(2);
    // if (!left.right) {
    //   throw new Error("left.right must exist");
    //   return;
    // }
    const leftright = left.right;
    expect(leftright).not.toBeNull();
    if (!leftright) return;
    expect(leftright.key).toBe(4);
    // expect(leftright.value).toBe(4);
    const right = root.right;

    expect(right).not.toBeNull();
    if (!right) return;
    // if (!right) throw new Error("tree.root.right must exist");
    // if (!tree.root.right) {
    //   throw new Error("tree.root.right must exist");
    //   return;
    // }
    expect(right.key).toBe(7);
    // expect(right.value).toBe(7);
    // if (!tree.root.right.left) {
    //   throw new Error("tree.root.right.left must exist");
    //   return;
    // }
    const rightleft = right.left;
    expect(rightleft).not.toBeNull();
    if (!rightleft) return;
    expect(rightleft.key).toBe(6);
    // expect(rightleft.value).toBe(6);
    // if (!tree.root.right.right) {
    //   throw new Error("tree.root.right.right must exist");
    //   return;
    // }
    const rightright = right.right;
    expect(rightright).not.toBeNull();
    if (!rightright) return;
    expect(rightright.key).toBe(8);
    // expect(rightright.value).toBe(8);
  });

  it("should take the right child if the left does not exist", () => {
    const tree = new AvlTree<i32>();
    tree.insert(1);
    tree.insert(2);
    tree.delete(1);
    const root = tree.root;
    // if (!root) throw new Error("tree.root must exist");
    expect(root).not.toBeNull();
    if (!root) return;

    // if (!tree.root) {
    //      throw new Error("tree.root must exist");
    //     return;
    //   }
    expect(root.key).toBe(2);
    // expect(root.value).toBe(2);
  });

  it("should take the left child if the right does not exist", () => {
    const tree = new AvlTree<i32>();
    tree.insert(2);
    tree.insert(1);
    tree.delete(2);
    const root = tree.root;
    // if (!root) throw new Error("tree.root must exist");
    expect(root).not.toBeNull();
    if (!root) return;

    // if (!tree.root) {
    //      throw new Error("tree.root must exist");
    //     return;
    //   }
    expect(root.key).toBe(1);
    // expect(root.value).toBe(1);
  });

  it("should get the right child if the node has 2 leaf children", () => {
    const tree = new AvlTree<i32>();
    tree.insert(2);
    tree.insert(1);
    tree.insert(3);
    tree.delete(2);
    const root = tree.root;
    // if (!root) throw new Error("tree.root must exist");
    expect(root).not.toBeNull();
    if (!root) return;

    // if (!tree.root) {
    //      throw new Error("tree.root must exist");
    //     return;
    //   }
    expect(root.key).toBe(3);
    // expect(root.value).toBe(3);
  });

  it("should get the in-order successor if the node has both children", () => {
    const tree = new AvlTree<i32>();
    tree.insert(2);
    tree.insert(1);
    tree.insert(4);
    tree.insert(3);
    tree.insert(5);
    tree.delete(2);
    const root = tree.root;
    // if (!root) throw new Error("tree.root must exist");
    expect(root).not.toBeNull();
    if (!root) return;

    // if (!tree.root) {
    //      throw new Error("tree.root must exist");
    //     return;
    //   }
    expect(root.key).toBe(3);
    // expect(root.value).toBe(3);
  });
});
