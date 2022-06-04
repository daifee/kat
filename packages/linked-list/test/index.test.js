
// import { describe, expect, test } from '@jest/globals';
import LinkedList from '../lib';

function runCases(cases = []) {
  const list = new LinkedList();
  cases.forEach((item) => {
    list[item[0]](...item[1]);
  });

  return list;
}

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

    expect(list.size).toBe(0);

    // 检索
    expect(list.getHead()).toBeUndefined();
    expect(list.getTail()).toBeUndefined();
    expect(list.get(0)).toBeUndefined();
    expect(list.get(-3)).toBeUndefined();
    expect(list.get(3999)).toBeUndefined();

    // 删除
    expect(list.deleteHead()).toBeUndefined();
    expect(list.deleteTail()).toBeUndefined();
    expect(list.delete(0)).toBeUndefined();
    expect(list.delete(-3)).toBeUndefined();
    expect(list.delete(3999)).toBeUndefined();

    expect(toArray(list)).toEqual([]);
  });

  test('addHead', () => {
    const list = new LinkedList();
    list.addHead(32);

    expect(list.size).toBe(1);
    expect(list.getHead()).toBe(32);
    expect(list.getTail()).toBe(32);
    expect(list.get(0)).toBe(32);

    expect(toArray(list)).toEqual([32]);
  });

  test('addTail', () => {
    const list = new LinkedList();
    list.addTail(32);

    expect(list.size).toBe(1);
    expect(list.getHead()).toBe(32);
    expect(list.getTail()).toBe(32);
    expect(list.get(0)).toBe(32);

    expect(toArray(list)).toEqual([32]);
  });

  test('add', () => {
    const list = new LinkedList();
    list.add(0, 32);

    expect(list.size).toBe(1);
    expect(list.getHead()).toBe(32);
    expect(list.getTail()).toBe(32);
    expect(list.get(0)).toBe(32);

    expect(toArray(list)).toEqual([32]);
  });

  test('add 超出范围', () => {
    const list = new LinkedList();
    list.add(1, 32);
    expect(list.size).toBe(0);
  });

  test('case-1', () => {
    const cases = [
      ['addHead', [0]],
      ['addHead', [1]],
      ['addTail', [2]],
      ['addTail', [3]],
      ['add', [2, 4]],
      ['add', [4, 5]],
    ];
    const expected = [1, 0, 4, 2, 5, 3];

    const list = runCases(cases);

    const received = toArray(list);
    expect(received).toEqual(expected);
    expect(list.size).toBe(expected.length);
  });

  test('case-2', () => {
    const cases = [
      ['addHead', [0]],
      ['addTail', [1]],
      ['add', [1, 2]],
      ['addHead', [10]],
      ['addTail', [11]],
      ['add', [1, 12]],
      ['deleteTail', []],
      ['deleteHead', []],
      ['delete', [3]],
      ['delete', [3]],
      ['addHead', [20]],
      ['addTail', [21]],
      ['add', [1, 22]],
    ];
    const expected = [20, 22, 12, 0, 2, 21];

    const list = runCases(cases);

    const received = toArray(list);
    expect(received).toEqual(expected);
    expect(list.size).toBe(expected.length);
  });

  test('case-3', () => {
    const cases = [
      ['addHead', [0]],
      ['deleteHead', []],
      ['addHead', [1]],
      ['addTail', [2]],
      ['addTail', [3]],
      ['deleteTail', []],
      ['deleteTail', []],
      ['addTail', [7]],
      ['add', [2, 4]],
      ['delete', [99]],
      ['add', [4, 5]],
    ];
    const expected = [1, 7, 4];

    const list = runCases(cases);

    const received = toArray(list);
    expect(received).toEqual(expected);
    expect(list.size).toBe(expected.length);
  });

  test('case-4', () => {
    const cases = [
      ['addHead', [0]],
      ['addTail', [1]],
      ['add', [1, 2]],
      ['addHead', [10]],
      ['addTail', [11]],
      ['add', [1, 12]],
      ['deleteTail', []],
      ['deleteHead', []],
      ['addHead', [20]],
      ['addTail', [21]],
      ['delete', [2]],
      ['delete', [2]],
      ['add', [1, 22]],
    ];
    const expected = [20, 22, 12, 1, 21];

    const list = runCases(cases);

    const received = toArray(list);
    expect(received).toEqual(expected);
    expect(list.size).toBe(expected.length);

    // 检索
    received.forEach((val, index) => {
      expect(list.get(index)).toBe(val);
    });

    expect(list.getHead()).toBe(received[0]);
    expect(list.getTail()).toBe(received[(received.length - 1)]);
  });

  test('case-empty', () => {
    const cases = [
      ['addHead', [0]],
      ['addTail', [1]],
      ['add', [1, 2]],
      ['addHead', [10]],
      ['addTail', [11]],
      ['add', [1, 12]],
      ['deleteTail', []],
      ['deleteHead', []],
      ['addHead', [20]],
      ['addTail', [21]],
      ['delete', [2]],
      ['delete', [2]],
      ['add', [1, 22]],
      // const expected = [20, 22, 12, 1, 21];

      ['deleteHead', []],
      ['deleteHead', []],
      ['deleteHead', []],
      ['deleteHead', []],
      ['deleteHead', []],
    ];

    const list = runCases(cases);

    const received = toArray(list);
    expect(received).toEqual([]);
    expect(list.size).toBe(0);

    expect(list.empty()).toBe(true);
  });
});
