
import Stack from '../lib';


describe('./queue/test/index.test.js', () => {
  test('初始化对象', () => {
    const stack = new Stack();

    expect(stack.empty()).toBe(true);
    expect(stack.length).toBe(0);
  });

  test('case-1', () => {
    const stack = new Stack();

    stack.push(1);

    expect(stack.top()).toBe(1);

    expect(stack.pop()).toBe(1);
    expect(stack.pop()).toBe(undefined);
    expect(stack.length).toBe(0);
  });

  test('case-2', () => {
    const stack = new Stack();

    stack.push(1);
    stack.push(2);
    stack.push(3);
    stack.push(4);
    expect(stack.length).toBe(4);
    expect(stack.pop()).toBe(4);
    expect(stack.pop()).toBe(3);
    expect(stack.pop()).toBe(2);

    expect(stack.top()).toBe(1);
    expect(stack.pop()).toBe(1);

    expect(stack.top()).toBe(undefined);
    expect(stack.top()).toBe(undefined);
  });
});
