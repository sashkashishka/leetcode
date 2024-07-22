class TN {
  public val: number;

  public right: TN | null;

  public left: TN | null;

  constructor(val?: number, left?: TN | null, right?: TN | null) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
  }
}

function bstToGst(root: TN): TN | null {
  function walk(node: TN | null, initSum = 0) {
    if (!node) return node;

    if (!node.right) {
      node.val += initSum;

      if (node?.left) {
        node.left.val += node.val;

        return node.left;
      }

      return node;
    }

    const rightMostNode = walk(node.right, initSum);

    if (rightMostNode) {
      node.val += rightMostNode?.val!;
    }

    const leftMostNode = walk(node.left, node.val);

    return leftMostNode || node;
  }

  walk(root);

  return root;
}

function bstToGst2(root: TN): TN {
  let sum = 0;

  function walk(node: TN | null) {
    if (!node) return null;

    walk(node.right);
    node.val += sum;
    sum = node.val;
    walk(node.left);
  }

  walk(root);

  return root;
}

export { bstToGst, bstToGst2, TN }

