interface iCacheValue {
  value: number;
  freshness: number;
}

export class LRUCache {
  private cache = new Map<number, iCacheValue>();

  private capacity = 0;

  private freshness = 0;

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  get(key: number): number {
    const value = this.cache.get(key);

    if (value) {
      this.refresh(key);

      return value.value;
    }

    return -1;
  }

  put(key: number, value: number): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
      this.cache.set(key, { value, freshness: ++this.freshness });

      return;
    }

    if (this.capacity <= this.cache.size) {
      const lruKey = this.getLRUKey();

      this.cache.delete(lruKey);
    }

    this.cache.set(key, { value, freshness: ++this.freshness });
  }

  private refresh(key: number) {
    const value = this.cache.get(key);

    if (!value) return;

    value.freshness = ++this.freshness;

    this.cache.set(key, value);
  }

  private getLRUKey(): number {
    let k: number = -1;
    let f = this.freshness;

    this.cache.forEach((value, key) => {
      if (value.freshness <= f) {
        k = key;
        f = value.freshness;
      }
    });

    return k;
  }
}
