"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim();
const N = Number(input);

class Queue {
  constructor() {
    this._store = [];
    this._front = 0;
    this._rear = 0;
  }

  push(value) {
    if (this.size === 0) {
      this._store[0] = value;
      return;
    }
    this._rear++;
    this._store[this._rear] = value;
  }

  pop() {
    const temp = this._store[this._front];
    delete this._store[this._front];
    if (this._front === this._rear) {
      this._front = 0;
      this._rear = 0;
    } else {
      this._front++;
    }
    return temp === undefined ? -1 : temp;
  }

  get size() {
    if (this._store[this._rear] === undefined) {
      return 0;
    }
    return this._rear - this._front + 1;
  }
}

function solution(n) {
  const queue = new Queue();
  for (let i = 1; i <= n; i++) {
    queue.push(i);
  }
  while (queue.size > 1) {
    queue.pop();
    const value = queue.pop();
    queue.push(value);
  }
  return queue.pop();
}

console.log(solution(N));
