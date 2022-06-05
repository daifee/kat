
import Queue from '../lib';


describe.only('./queue/test/index.test.js', () => {
  test('初始化对象', () => {
    const queue = new Queue();

    expect(queue.empty()).toBe(true);
    expect(queue.length).toBe(0);
  });

  test('case-1', () => {
    const queue = new Queue();

    queue.enqueue(1);

    expect(queue.first()).toBe(1);
    expect(queue.last()).toBe(1);

    expect(queue.dequeue()).toBe(1);
    expect(queue.dequeue()).toBe(undefined);
    expect(queue.length).toBe(0);
  });

  test('case-2', () => {
    const queue = new Queue();

    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    queue.enqueue(4);
    expect(queue.length).toBe(4);
    expect(queue.dequeue()).toBe(1);
    expect(queue.dequeue()).toBe(2);
    expect(queue.dequeue()).toBe(3);

    expect(queue.first()).toBe(4);
    expect(queue.dequeue()).toBe(4);

    expect(queue.first()).toBe(undefined);
    expect(queue.last()).toBe(undefined);
  });
});
