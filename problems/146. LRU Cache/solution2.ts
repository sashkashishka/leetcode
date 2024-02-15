type tKey = string | number;
type tValue = string | number;

class Node {
  constructor(
    public key: tKey = null,
    public value: tValue = null,
    public next: Node = null,
    public prev: Node = null,
  ) {}
}

export class LRUCache {
  private size = 0;

  constructor(
    private capacity = 100,
    private cache: Record<tKey, Node> = {},
    private head = new Node(), // lru
    private tail = new Node(), // mru
  ) {}

  put(key: tKey, value: tValue): void {
    let node = this.cache[key];

    if (node) {
      node.value = value;

      this.promote(node);
    } else {
      node = new Node(key, value);
      this.append(node);
    }
  }

  get(key: tKey): tValue | -1 {
    const node = this.cache[key];

    if (!node) return -1;

    this.promote(node);

    return node.value;
  }

  promote(node) {
    this.evict(node);
    this.append(node);
  }

  append(node) {
    this.cache[node.key] = node;

    if (!this.head.next) {
      this.head.next = node;
      this.tail.prev = node;
      node.prev = this.head;
      node.next = this.tail;
    } else {
      const oldTail = this.tail.prev;
      oldTail.next = node;
      node.prev = oldTail;
      node.next = this.tail;
      this.tail.prev = node;
    }

    this.size += 1;

    if (this.size > this.capacity) {
      this.evict(this.head.next);
    }
  }

  evict(node) {
    delete this.cache[node.key];
    this.size -= 1;

    if (this.head.next === node && this.tail.prev === node) {
      this.head.next = null;
      this.tail.prev = null;
      this.size = 0;
      return;
    }

    if (this.head.next === node) {
      this.head.next = node.next;
      node.next.prev = this.head;
      return;
    }

    if (this.tail.prev === node) {
      this.tail.prev = node.prev;
      node.prev.next = this.tail;
      return;
    }

    node.prev.next = node.next;
    node.next.prev = node.prev;
  }
}

