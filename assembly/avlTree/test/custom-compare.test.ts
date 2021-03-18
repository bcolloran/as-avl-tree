import { AvlTree } from "../avlTree";

describe("built in compare functions", () => {
  it("should function correctly given string keys", () => {
    const tree = new AvlTree<string>();
    tree.insert("b");
    tree.insert("a");
    tree.insert("c");
    expect<i32>(tree.size).toBe(3);
    expect<string>(tree.findMinimum()).toBe("a");
    expect<string>(tree.findMaximum()).toBe("c");
    tree.delete("c");
    expect<i32>(tree.size).toBe(2);
    const root = tree.root;
    expect(root).not.toBeNull();
    if (!root) return;
    expect<string>(root.key).toBe("b");

    const right = root.right;
    expect(right).toBeNull();
    const left = root.left;
    expect(left).not.toBeNull();
    if (!left) return;
    expect<string>(left.key).toBe("a");
  });

  it("should function correctly given float keys", () => {
    const tree = new AvlTree<f64>();
    tree.insert(0.5);
    tree.insert(0.3);
    tree.insert(0.7);
    expect<i32>(tree.size).toBe(3);
    expect<f64>(tree.findMinimum()).toBe(0.3);
    expect<f64>(tree.findMaximum()).toBe(0.7);
    tree.delete(0.7);
    expect<i32>(tree.size).toBe(2);
    const root = tree.root;
    expect(root).not.toBeNull();
    if (!root) return;
    expect<f64>(root.key).toBe(0.5);

    const right = root.right;
    expect(right).toBeNull();
    const left = root.left;
    expect(left).not.toBeNull();
    if (!left) return;
    expect<f64>(left.key).toBe(0.3);
  });
});

class ComplexObject {
  constructor(public innerKey: i32) {}
}

describe("Custom compare function", () => {
  it("should function correctly given a reversed customCompare", () => {
    const tree = new AvlTree<i32>((a: i32, b: i32): i32 => b - a);
    tree.insert(2);
    tree.insert(1);
    tree.insert(3);
    expect<i32>(tree.size).toBe(3);
    expect<i32>(tree.findMinimum()).toBe(3);
    expect<i32>(tree.findMaximum()).toBe(1);
    tree.delete(3);
    expect<i32>(tree.size).toBe(2);

    const root = tree.root;
    expect(root).not.toBeNull();
    if (!root) return;
    expect<i32>(root.key).toBe(2);

    const left = root.left;
    expect(left).toBeNull();
    const right = root.right;
    expect(right).not.toBeNull();
    if (!right) return;
    expect<i32>(right.key).toBe(1);
  });

  it("should work when the key is a complex object", () => {
    const tree = new AvlTree<ComplexObject>(
      (a: ComplexObject, b: ComplexObject): i32 => a.innerKey - b.innerKey
    );
    tree.insert(new ComplexObject(1));
    tree.insert(new ComplexObject(2));
    tree.insert(new ComplexObject(3));
    expect(tree.contains(new ComplexObject(1))).toBe(true);
    expect(tree.contains(new ComplexObject(2))).toBe(true);
    expect<ComplexObject>(tree.findMinimum()).toStrictEqual(
      new ComplexObject(1)
    );
  });
});
