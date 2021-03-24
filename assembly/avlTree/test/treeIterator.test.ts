import { AvlTree } from "../avlTree";
import { TreeIterator } from "../treeIterator";

describe("tree iterator", () => {
  it("should function correctly given float keys", () => {
    const tree = new AvlTree<f64>();
    tree.insert(1.2);
    tree.insert(0.2);
    tree.insert(5.2);
    tree.insert(3.2);
    tree.insert(4.3);
    tree.insert(-1.3);

    const iter = new TreeIterator<f64>(tree);
    const expected = [-1.3, 0.2, 1.2, 3.2, 4.3, 5.2];
    let i = 0;

    while (iter.hasNext()) {
      const key = iter.next();
      expect<f64>(key).toBe(expected[i]);
      i++;
    }
    expect<i32>(i).toBe(tree.size);
    expect<bool>(iter.hasNext()).toBe(false);
  });

  it("should function correctly when iterating from the right", () => {
    const tree = new AvlTree<f64>();
    tree.insert(1.2);
    tree.insert(0.2);
    tree.insert(5.2);
    tree.insert(3.2);
    tree.insert(4.3);
    tree.insert(-1.3);

    const iter = new TreeIterator<f64>(tree, false);
    const expected = [-1.3, 0.2, 1.2, 3.2, 4.3, 5.2];
    expected.reverse();
    let i = 0;

    while (iter.hasNext()) {
      const key = iter.next();
      expect<f64>(key).toBe(expected[i]);
      i++;
    }
    expect<i32>(i).toBe(tree.size);
    expect<bool>(iter.hasNext()).toBe(false);
  });

  it("should function correctly given string keys", () => {
    const tree = new AvlTree<string>();
    tree.insert("b");
    tree.insert("d");
    tree.insert("a");
    tree.insert("c");

    const iter = new TreeIterator<string>(tree);
    const expected = ["a", "b", "c", "d"];
    let i = 0;

    while (iter.hasNext()) {
      const key = iter.next();
      expect<string>(key).toBe(expected[i]);
      i++;
    }
    expect<i32>(i).toBe(tree.size);
    expect<bool>(iter.hasNext()).toBe(false);
  });
});
