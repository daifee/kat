
import { describe, expect, test } from '@jest/globals';
import LinkedList from '../lib';


function toArray(list) {
  const result = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const val of list) {
    result.push(val);
  }

  return result;
}


describe('./linked-list/test/index.test.js', () => {
  test('初始化接口', () => {
    const list = new LinkedList();

    expect(list.size()).toBe(0);
    expect(list.getHead()).toBeUndefined();
    expect(list.getTail()).toBeUndefined();
    expect(toArray(list)).toEqual([]);
  });

  test('addHead', () => {
    const list = new LinkedList();
    list.addHead(32);

    expect(list.size()).toBe(1);
    expect(toArray(list)).toEqual([32]);
  });
});
