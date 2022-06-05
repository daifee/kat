
import LinkedList from '@daifee/linked-list';


export default class Queue<V> {
  protected items: LinkedList<V>;

  constructor() {
    this.items = new LinkedList();
  }

  get length(): number {
    return this.items.size;
  }

  enqueue(item: V) {
    this.items.addTail(item);
  }

  dequeue(): V | undefined {
    const item = this.items.getHead();
    this.items.deleteHead();

    return item;
  }

  first(): V | undefined {
    if (this.empty()) {
      return undefined;
    }

    return this.items.getHead();
  }

  last(): V | undefined {
    if (this.empty()) {
      return undefined;
    }

    return this.items.getTail();
  }

  empty(): boolean {
    return this.length === 0;
  }
}
