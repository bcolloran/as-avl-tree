An AssemblyScript implementation of the [AVL tree](http://www.growingwiththeweb.com/data-structures/avl-tree/overview/) data structure (port of [ts-avl-tree](https://github.com/gwtw/ts-avl-tree)).

## Features

- 100% test coverage
- Supports all common tree operations
- Store keys with optional associated values
- Optional custom compare function that can utilize both key and value to give full control over the order of the data

## Install

```bash
npm install --save @tyriar/avl-tree
```

## Usage

See the [typings file](./typings/avl-tree.d.ts) for the full API.

```typescript
// Import npm module
import { AvlTree } from "@tyriar/avl-tree";

// Construct AvlTree
const tree = new AvlTree<i32>();

// Insert keys
tree.insert(1);
tree.insert(2);
tree.insert(3);
tree.insert(4);
tree.insert(5);
console.log("size: " + tree.size);
console.log("contains 2: " + tree.contains(2));
console.log("contains 7: " + tree.contains(7));
// > size: 5
// > contains 2: true
// > contains 7: false

// Delete a key
tree.delete(2);
console.log("size: " + tree.size);
console.log("contains 2: " + tree.contains(2));
// > size: 4
// > contains 2: false

// Construct custom compare AvlTree
const tree2 = new AvlTree<string, string>(function (a, b) {
  return a.localeCompare(b);
});
tree2.insert("a");
tree2.insert("A");
tree2.insert("b");
tree2.insert("B");

// Delete the minimum key
const minKey = tree2.findMinimum();
tree2.delete(minKey);
console.log("minKey: " + minKey);
console.log("new minKey: " + tree2.findMinimum());
// > min key: 'a'
// > new min key: 'A'
```

# AssemblySCript quirks

Note that these AvlTree and AvlTreeMap implementation have the same limitation as the implementation of [Map in the AssemblyScript stdlib](https://www.assemblyscript.org/stdlib/map.html#constructor): namely, because `undefined` cannot be represented and (not all types are nullable)[https://www.assemblyscript.org/types.html#nullability], using `.get` on a missing key will result in an error, as will using `.findMinimum()` and `.findMaximum()` on an empty tree.

Therefore, one must unfortuntately do a manual validity check when using these methods, similar to what is required for `Map`, for example:

```typescript
var tree = new AvlTreeMap<i32, string>();

var str = tree.get(1); // ERROR
var minStr = tree.findMinimum(); // ERROR

// The error can be avoided by first doing a validity check:
var str: string | null = tree.has(1) ? tree.get(1) : null; // OK
var str: string | null = tree.isEmpty() ? tree.findMinimum() : null; // OK

// Note that if the values in an AvlTreeMap are of a non-nullable
// type (such as numeric types) you'll need to expand the conditional,
// because a one-liner like the ones above won't compile

var tree = new AvlTreeMap<i32, f64>();
// `f64 | null` is not a valid type
var num: f64 | null = tree.has(1) ? tree.get(1) : null; // ERROR
```

## Operation time complexity

| Operation   | Complexity |
| ----------- | ---------- |
| contains    | O(log n)   |
| delete      | O(log n)   |
| findMaximum | O(log n)   |
| findMinimum | O(log n)   |
| get         | O(log n)   |
| insert      | O(log n)   |
| isEmpty     | Θ(1)       |
| size        | Θ(1)       |
