import { AvlTree } from "./avlTree";
import { Node } from "./node";

export class TreeIterator<K> {
  private _iterationStack: Node<K>[] = [];
  constructor(tree: AvlTree<K>, private fromLeft: bool = true) {
    const root = tree.root;
    if (root != null) {
      this._appendNextNodes(root);
    }
  }

  hasNext(): bool {
    return this._iterationStack.length > 0;
  }

  next(): K {
    const nextNode = this._iterationStack.pop();
    const nextChildNode = this._getNextChildNode(nextNode);
    if (nextChildNode != null) {
      this._appendNextNodes(nextChildNode);
    }
    return nextNode.key;
  }

  /**
   * Gets the child node "previous" to the current node given the iteration direction
   *
   * @param node
   * @returns
   */
  private _getPrevChildNode(node: Node<K>): Node<K> | null {
    if (this.fromLeft) return node.left;
    return node.right;
  }

  /**
   * Gets the child node "next" from the current node given the iteration direction
   *
   * @param node
   * @returns
   */
  private _getNextChildNode(node: Node<K>): Node<K> | null {
    if (this.fromLeft) return node.right;
    return node.left;
  }

  private _appendNextNodes(node: Node<K>): void {
    this._iterationStack.push(node);

    let prevNode = this._getPrevChildNode(node);

    while (prevNode != null) {
      this._iterationStack.push(prevNode);
      prevNode = this._getPrevChildNode(prevNode);
    }
  }
}
