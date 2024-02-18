type tKey = string | number;
type tValue = string | number;

class Node {
  constructor(
    public key: tKey = null,
    public value: tValue = null,
    public counter = 0,
    public next: Node = null,
    public prev: Node = null,
  ) { }
}

class List {
  public size = 0;

  constructor(
    public head = new Node(),
    public tail = new Node(),
  ) { }

  add(node: Node) {
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
  }

  remove(node: Node) {
    this.size -= 1;

    if (this.head.next === node && this.tail.prev === node) {
      this.head.next = null;
      this.tail.prev = null;
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

export class LFUCache {
  private size = 0;

  constructor(
    private capacity = 100,
    private cache: Record<tKey, Node> = {},
    private frequencyCache: Array<List> = [],
  ) { }

  put(key: tKey, value: tValue): void {
    let node = this.cache[key];

    if (node) {
      node.value = value;
      this.promote(node)
    } else {
      node = new Node(key, value, 1);
      this.append(node);
    }
  }

  get(key: tKey): tValue | -1 {
    const node = this.cache[key];

    if (!node) return -1;

    this.promote(node);

    return node.value;
  }

  getList(frequency: number) {
    return this.frequencyCache[frequency] ??= new List();
  }

  promote(node: Node) {
    this.evict(node);
    node.counter += 1;
    this.append(node);
  }

  append(node: Node) {
    if (this.size === this.capacity) {
      // check for LFU item
      const list = this.frequencyCache.find(Boolean)!;
      this.evict(list.head.next)
    }

    this.cache[node.key] = node;

    this.size += 1;

    const list = this.getList(node.counter);

    list.add(node);
  }

  evict(node: Node) {
    delete this.cache[node.key];
    this.size -= 1;

    const list = this.getList(node.counter);

    list.remove(node);

    if (list.size <= 0) {
      delete this.frequencyCache[node.counter];
    }
  }
}


