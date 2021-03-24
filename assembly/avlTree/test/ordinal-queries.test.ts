import { AvlTree } from "../avlTree";

describe("getMaxLessThan", () => {
  it(" should work correctly", () => {
    const tree = new AvlTree<f64>();
    tree.insert(1.2);
    tree.insert(0.2);
    tree.insert(5.2);
    tree.insert(3.2);
    tree.insert(4.3);
    tree.insert(-1.3);

    // expect<f64>(tree.getMaxLessThan(-10.4)).toBeNull();
    // expect<f64>(tree.getMaxLessThan(-1.3)).toBeNull();
    expect<f64>(tree.getMaxLessThan(0.0)).toBe(-1.3);
    expect<f64>(tree.getMaxLessThan(3.2)).toBe(1.2);
    expect<f64>(tree.getMaxLessThan(3.5)).toBe(3.2);
    expect<f64>(tree.getMaxLessThan(5.2)).toBe(4.3);
    expect<f64>(tree.getMaxLessThan(10.0)).toBe(5.2);
  });

  throws("should throw when no valid value exists (1)", () => {
    const tree = new AvlTree<f64>();
    tree.insert(1.2);
    tree.getMaxLessThan(-10.4);
  });

  throws("should throw when no valid value exists (2)", () => {
    const tree = new AvlTree<f64>();
    tree.insert(1.2);
    tree.getMaxLessThan(1.2);
  });
});

describe("getMaxLessThanOrEqual", () => {
  it(" should work correctly", () => {
    const tree = new AvlTree<f64>();
    tree.insert(1.2);
    tree.insert(0.2);
    tree.insert(5.2);
    tree.insert(3.2);
    tree.insert(4.3);
    tree.insert(-1.3);

    // expect<f64>(tree.getMaxLessThanOrEqual(-10.4)).toBeNull();
    expect<f64>(tree.getMaxLessThanOrEqual(-1.3)).toBe(-1.3);
    expect<f64>(tree.getMaxLessThanOrEqual(0.0)).toBe(-1.3);
    expect<f64>(tree.getMaxLessThanOrEqual(3.2)).toBe(3.2);
    expect<f64>(tree.getMaxLessThanOrEqual(3.5)).toBe(3.2);
    expect<f64>(tree.getMaxLessThanOrEqual(5.2)).toBe(5.2);
    expect<f64>(tree.getMaxLessThanOrEqual(10.0)).toBe(5.2);
  });

  throws("should throw when no valid value exists (1)", () => {
    const tree = new AvlTree<f64>();
    tree.insert(1.2);
    tree.getMaxLessThanOrEqual(-10.4);
  });

  // throws("should throw when no valid value exists (2)", () => {
  //   const tree = new AvlTree<f64>();
  //   tree.insert(1.2);
  //   tree.getMaxLessThanOrEqual(1.2);
  // });
});

describe("getMinGreaterThan", () => {
  it("should work correctly", () => {
    const tree = new AvlTree<f64>();
    tree.insert(1.2);
    tree.insert(0.2);
    tree.insert(5.2);
    tree.insert(3.2);
    tree.insert(4.3);
    tree.insert(-1.3);

    expect<f64>(tree.getMinGreaterThan(-10.4)).toBe(-1.3);
    expect<f64>(tree.getMinGreaterThan(-1.3)).toBe(0.2);
    expect<f64>(tree.getMinGreaterThan(0.0)).toBe(0.2);
    expect<f64>(tree.getMinGreaterThan(3.2)).toBe(4.3);
    expect<f64>(tree.getMinGreaterThan(2.5)).toBe(3.2);
    expect<f64>(tree.getMinGreaterThan(4.2)).toBe(4.3);
    // expect<f64>(tree.getMinGreaterThan(10.0)).toBe();
  });

  throws("should throw when no valid value exists (1)", () => {
    const tree = new AvlTree<f64>();
    tree.insert(1.2);
    tree.getMinGreaterThan(10.4);
  });

  throws("should throw when no valid value exists (2)", () => {
    const tree = new AvlTree<f64>();
    tree.insert(1.2);
    tree.getMinGreaterThan(1.2);
  });
});

describe("getMinGreaterThanOrEqual", () => {
  it("should work correctly", () => {
    const tree = new AvlTree<f64>();
    tree.insert(1.2);
    tree.insert(0.2);
    tree.insert(5.2);
    tree.insert(3.2);
    tree.insert(4.3);
    tree.insert(-1.3);

    expect<f64>(tree.getMinGreaterThanOrEqual(-10.4)).toBe(-1.3);
    expect<f64>(tree.getMinGreaterThanOrEqual(-1.3)).toBe(-1.3);
    expect<f64>(tree.getMinGreaterThanOrEqual(0.0)).toBe(0.2);
    expect<f64>(tree.getMinGreaterThanOrEqual(3.2)).toBe(3.2);
    expect<f64>(tree.getMinGreaterThanOrEqual(2.5)).toBe(3.2);
    expect<f64>(tree.getMinGreaterThanOrEqual(4.2)).toBe(4.3);
    expect<f64>(tree.getMinGreaterThanOrEqual(5.2)).toBe(5.2);
  });

  throws("should throw when no valid value exists (1)", () => {
    const tree = new AvlTree<f64>();
    tree.insert(1.2);
    tree.getMinGreaterThanOrEqual(10.4);
  });

  // throws("should throw when no valid value exists (2)", () => {
  //   const tree = new AvlTree<f64>();
  //   tree.insert(1.2);
  //   tree.getMinGreaterThanOrEqual(1.2);
  // });
});
