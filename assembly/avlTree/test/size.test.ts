import { AvlTree } from "../avlTree";

describe("size", () => {
  it("should return the size of the tree", () => {
    const tree = new AvlTree<i32>();
    expect(tree.size).toBe(0);
    tree.insert(1);
    expect(tree.size).toBe(1);
    tree.insert(2);
    expect(tree.size).toBe(2);
    tree.insert(3);
    expect(tree.size).toBe(3);
    tree.insert(4);
    expect(tree.size).toBe(4);
    tree.insert(5);
    expect(tree.size).toBe(5);
    tree.insert(6);
    expect(tree.size).toBe(6);
    tree.insert(7);
    expect(tree.size).toBe(7);
    tree.insert(8);
    expect(tree.size).toBe(8);
    tree.insert(9);
    expect(tree.size).toBe(9);
    tree.insert(10);
    expect(tree.size).toBe(10);
  });
});
