
import Queue from '../lib';


describe.only('./queue/test/index.test.js', () => {
  test('初始化对象', () => {
    const q = new Queue();

    expect(q.empty()).toBe(true);
    expect(q.length).toBe(0);
  });

  test('case-1', () => {
    const q = new Queue();

    q.push(1);

    expect(q.top()).toBe(1);

    expect(q.pop()).toBe(1);
    expect(q.pop()).toBe(undefined);
    expect(q.length).toBe(0);
  });

  test('case-2', () => {
    const q = new Queue();

    q.push(1);
    q.push(2);
    q.push(3);
    q.push(4);
    expect(q.length).toBe(4);
    expect(q.pop()).toBe(4);
    expect(q.pop()).toBe(3);
    expect(q.pop()).toBe(2);

    expect(q.top()).toBe(1);
    expect(q.pop()).toBe(1);

    expect(q.top()).toBe(undefined);
    expect(q.top()).toBe(undefined);
  });
});
