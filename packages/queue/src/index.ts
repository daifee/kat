
import LinkedList from '@daifee/linked-list';


export default class Queue<V> {
  protected items: LinkedList<V>;

  constructor() {
    this.items = new LinkedList();
  }

  get length(): number {
    return this.items.size;
  }

  push(item: V) {
    this.items.addHead(item);
  }

  pop(): V | undefined {
    const item = this.top();

    this.items.deleteHead();

    return item;
  }

  top(): V | undefined {
    if (!this.items.size) {
      return undefined;
    }

    const item = this.items.getHead() as V;

    return item;
  }

  empty(): boolean {
    return this.length === 0;
  }
}
