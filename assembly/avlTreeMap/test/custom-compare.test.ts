import { AvlTree } from "./testUtils";

describe("Custom compare function", () => {
  it("should function correctly given a non-reverse customCompare", () => {
    const tree = new AvlTree<number, null>((a, b) => b - a);
    tree.insert(2);
    tree.insert(1);
    tree.insert(3);
    expect(tree.size).toBe(3);
    expect(tree.findMinimum()).toBe(3);
    expect(tree.findMaximum()).toBe(1);
    tree.delete(3);
    expect(tree.size).toBe(2);
    // if (!tree.root) {
    //      throw new Error("tree.root must exist");
    //     return;
    //   }
    expect(tree.root?.key).toBe(2);
    expect(tree.root?.left).toBe(null);
    // if (!tree.root?.right) {
    //   throw new Error("tree.root?.right must exist");
    //   return;
    // }
    expect(tree.root?.right?.key).toBe(1);
  });

  it("should work when the key is a complex object", () => {
    interface IComplexObject {
      innerKey: number;
    }
    const tree = new AvlTree<IComplexObject, null>(
      (a, b) => a.innerKey - b.innerKey
    );
    tree.insert({ innerKey: 1 });
    expect(tree.contains({ innerKey: 1 })).toBe(true);
    expect(tree.contains({ innerKey: 2 })).toBe(true);
  });
});
