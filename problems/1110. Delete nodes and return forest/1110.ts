class LN<V> {
  public val: V;

  public next: LN<V> | undefined;

  public prev: LN<V> | undefined;

  constructor(val?: any, next?: LN<V> | undefined, prev?: LN<V> | undefined) {
    this.val = val;
    this.next = next;
    this.prev = prev;
  }
}

class Q<V> {
  public tail: LN<V>;

  public head: LN<V>;

  public length: number;

  constructor() {
    this.length = 0;
    this.tail = new LN<V>();
    this.head = new LN<V>();
  }

  push(val: V) {
    const node = new LN<V>(val);

    this.length += 1;

    if (!this.head.prev) {
      this.head.prev = node;
      this.tail.next = node;

      node.next = this.head;
      node.prev = this.tail;
    } else {
      const last = this.tail.next!;

      last.prev = node;
      node.next = last;
      node.prev = this.tail;
      this.tail.next = node;
    }
  }

  unshift() {
    if (!this.head.prev) {
      return undefined;
    }

    this.length -= 1;

    const first = this.head.prev;

    first.next = undefined;
    this.head.prev = first.prev;

    if (this.head.prev === this.tail) {
      this.head.prev = undefined;
      this.tail.next = undefined;
    }

    return first.val;
  }
}

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

// TODO: refactor forest traversing

type TNItem = { node: TN; parent: TN | null; dir: 'right' | 'left' | null }

function delNodes(root: TN | null, to_delete: number[]): Array<TN | null> {
  let toDel = to_delete.slice();
  const forest: TN[] = [];
  const treeQueue = new Q<TN>();

  if (!root) {
    return forest;
  }

  treeQueue.push(root);

  function bfd(queue: Q<TNItem>) {
    while (queue.length > 0) {
      if (!toDel.length) break;

      let n = queue.unshift();

      if (!n) {
        break;
      }

      const { node, parent, dir } = n;

      if (toDel.includes(node.val)) {
        if (node.left) {
          treeQueue.push(node.left);
        }

        if (node.right) {
          treeQueue.push(node.right);
        }

        toDel = toDel.filter(v => v !== node.val);

        if (dir && parent?.[dir]) {
          parent[dir] = null
        } else {
          return node;
        }

        continue;
      }

      if (node.left) {
        queue.push({ node: node.left, parent: node, dir: 'left' });
      }

      if (node.right) {
        queue.push({ node: node.right, parent: node, dir: 'right' });
      }
    }
  }


  while (treeQueue.length > 0) {
    const queue = new Q<TNItem>();
    const tree = treeQueue.unshift();

    if (!tree) {
      break;
    }

    if (!toDel.length) {
      forest.push(tree)
      continue;
    }

    queue.push({ node: tree, parent: null, dir: null });

    const rootToDelete = bfd(queue);

    if (rootToDelete) {
      continue;
    }

    forest.push(tree);
  }


  return forest.filter(Boolean);
}

export { delNodes, TN }
