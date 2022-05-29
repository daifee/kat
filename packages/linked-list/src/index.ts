

class ListNode<V> {
  val: V;

  next: ListNode<V> | null = null;

  prev: ListNode<V> | null = null;

  constructor(val: V, next: ListNode<V> | null = null) {
    this.val = val;
    this.next = next;
  }
}


class LinkedListIterator<V> {
  protected head: ListNode<V> | null = null;

  [Symbol.iterator]() {
    let cursor = this.head;

    return {
      next: () => {
        if (!cursor) {
          return { done: true };
        }
        const { val } = cursor;
        cursor = cursor.next;

        return { done: false, value: val };
      },
    };
  }
}

export default class LinkedList<V> extends LinkedListIterator<V> {
  protected head: ListNode<V> | null;

  protected tail: ListNode<V> | null;

  protected _size: number = 0;

  constructor() {
    super();
    this.head = null;
    this.tail = null;
  }

  get size() {
    return this._size;
  }

  protected set size(num: number) {
    this._size = num;
  }

  add(index: number, val: V): void {
    if (index < 0 || index > this.size) {
      return;
    }

    if (index === 0) {
      this.addHead(val);
      return;
    }

    if (index === this.size) {
      this.addTail(val);
      return;
    }


    let current = this.head;
    let count = 0;
    while (current) {
      if (count === index) {
        break;
      }
      current = current.next;
      count += 1;
    }

    if (!current) {
      return;
    }

    const node = new ListNode(val);
    const prev = current.prev as ListNode<V>;

    prev.next = node;
    node.prev = prev;

    node.next = current;
    current.prev = node;

    this.size += 1;
  }

  addHead(val: V): void {
    const node = new ListNode(val);

    if (this.head) {
      this.head.prev = node;
      node.next = this.head;

      this.head = node;
    } else {
      this.head = node;
      this.tail = node;
    }

    this.size += 1;
  }

  addTail(val: V): void {
    const node = new ListNode(val);

    if (this.tail) {
      this.tail.next = node;
      node.prev = this.tail;

      this.tail = node;
    } else {
      this.head = node;
      this.tail = node;
    }

    this.size += 1;
  }

  get(index: number): V | undefined {
    let cursor = this.head;
    let count = 0;
    while (cursor) {
      if (index === count) {
        break;
      }

      cursor = cursor.next;
      count += 1;
    }

    if (!cursor) {
      throw new Error('不存在');
    }

    return cursor?.val;
  }

  getHead(): V | undefined {
    return this.head?.val;
  }

  getTail(): V | undefined {
    return this.tail?.val;
  }

  delete(index: number): void {
    if (index < 0 || index >= this.size) return;

    if (index === 0) {
      this.deleteHead();
      return;
    }

    if (index === (this.size - 1)) {
      this.deleteTail();
      return;
    }

    this.size -= 1;
    let target = this.head;
    let i = 0;
    while (target) {
      if (i === index) {
        break;
      }

      target = target.next;
      i += 1;
    }

    // `target`不是 `head`, `tail`; 所以必然存在 `prev`, `next`
    const prev = target?.prev as ListNode<V>;
    const next = target?.next as ListNode<V>;

    prev.next = next;
    next.prev = prev;
  }

  deleteHead(): void {
    if (!this.head) return;

    if (this.head === this.tail) {
      this.size = 0;
      this.head = null;
      this.tail = null;
      return;
    }

    this.size -= 1;
    this.head = this.head.next;
    if (!this.head) {
      this.tail = null;
    } else {
      this.head.prev = null;
    }
  }

  deleteTail(): void {
    if (!this.tail) return;

    if (this.tail === this.head) {
      this.size = 0;
      this.tail = null;
      this.head = null;
      return;
    }

    this.size -= 1;
    this.tail = this.tail.prev as ListNode<V>;
    this.tail.next = null;
  }
}
