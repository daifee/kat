"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.symbol.description.js");

let _Symbol$iterator;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ListNode {
  constructor(val) {
    let next = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    _defineProperty(this, "val", void 0);

    _defineProperty(this, "next", null);

    _defineProperty(this, "prev", null);

    this.val = val;
    this.next = next;
  }

}

_Symbol$iterator = Symbol.iterator;

class LinkedListIterator {
  constructor() {
    _defineProperty(this, "head", null);
  }

  [_Symbol$iterator]() {
    let cursor = this.head;
    return {
      next: () => {
        if (!cursor) {
          return {
            done: true
          };
        }

        const {
          val
        } = cursor;
        cursor = cursor.next;
        return {
          done: false,
          value: val
        };
      }
    };
  }

}

class LinkedList extends LinkedListIterator {
  constructor() {
    super();

    _defineProperty(this, "head", void 0);

    _defineProperty(this, "tail", void 0);

    _defineProperty(this, "_size", 0);

    this.head = null;
    this.tail = null;
  }

  get size() {
    return this._size;
  }

  set size(num) {
    this._size = num;
  }

  add(index, val) {
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
    const prev = current.prev;
    prev.next = node;
    node.prev = prev;
    node.next = current;
    current.prev = node;
    this.size += 1;
  }

  addHead(val) {
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

  addTail(val) {
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

  get(index) {
    var _cursor;

    let cursor = this.head;
    let count = 0;

    while (cursor) {
      if (index === count) {
        break;
      }

      cursor = cursor.next;
      count += 1;
    }

    return (_cursor = cursor) === null || _cursor === void 0 ? void 0 : _cursor.val;
  }

  getHead() {
    var _this$head;

    return (_this$head = this.head) === null || _this$head === void 0 ? void 0 : _this$head.val;
  }

  getTail() {
    var _this$tail;

    return (_this$tail = this.tail) === null || _this$tail === void 0 ? void 0 : _this$tail.val;
  }

  delete(index) {
    var _target, _target2;

    if (index < 0 || index >= this.size) return;

    if (index === 0) {
      this.deleteHead();
      return;
    }

    if (index === this.size - 1) {
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
    } // `target`不是 `head`, `tail`; 所以必然存在 `prev`, `next`


    const prev = (_target = target) === null || _target === void 0 ? void 0 : _target.prev;
    const next = (_target2 = target) === null || _target2 === void 0 ? void 0 : _target2.next;
    prev.next = next;
    next.prev = prev;
  }

  deleteHead() {
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

  deleteTail() {
    if (!this.tail) return;

    if (this.tail === this.head) {
      this.size = 0;
      this.tail = null;
      this.head = null;
      return;
    }

    this.size -= 1;
    this.tail = this.tail.prev;
    this.tail.next = null;
  }

}

exports.default = LinkedList;