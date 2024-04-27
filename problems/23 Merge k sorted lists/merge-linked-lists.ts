class LinkedList {
  constructor(public val?: number, public next: LinkedList | null = null) { }
}


export function toArr(ll: LinkedList) {
  const arr: number[] = [];
  let n: LinkedList | null = ll;

  while (n) {
    arr.push(n.val!);

    n = n.next;
  }

  return arr;
}

export function fromArr(arr: number[]) {
  let ll: LinkedList | null = null;
  let nll: LinkedList;

  arr.forEach((n) => {
    if (!ll) {
      ll = new LinkedList(n);
      nll = ll;
      return;
    }

    nll.next = new LinkedList(n);
    nll = nll.next;
  })

  return ll!;
}

export function mergeKLists(lists: Array<LinkedList>): LinkedList | null {
  const arr: number[] = [];

  for (let i = 0; i < lists.length; i++) {
    arr.push(...toArr(lists[i]));
  }

  return fromArr(arr.sort((a, b) => a - b))
};
