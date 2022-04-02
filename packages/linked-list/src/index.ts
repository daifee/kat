

class ListNode<V> {
  val: V;

  next: ListNode<V> | null = null;

  prev: ListNode<V> | null = null;

  constructor(val: V, next: ListNode<V> | null = null) {
    this.val = val;
    this.next = next;
  }
}


/**
 * 插入
 * - add
 * - addHead
 * - addTail
 */
/**
 * 检索
 * - get
 * - getHead
 * - getTail
 */
/**
 * 删除
 * - delete
 * - deleteHead
 * - deleteTail
 */


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

  size() {
    return this._size;
  }

  add(index: number, val: V): void {
    if (index < 0 || index > this.size()) {
      return;
    }

    if (index === 0) {
      this.addHead(val);
      return;
    }

    if (index === this.size()) {
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

    this._size += 1;
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

    this._size += 1;
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

    this._size += 1;
  }

  // get(index: number): V | void {
  //   return this.head?.val;
  // }

  getHead(): V | undefined {
    return this.head?.val;
  }

  getTail(): V | undefined {
    return this.tail?.val;
  }
}
