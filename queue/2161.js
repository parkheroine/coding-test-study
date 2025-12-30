"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const N = fs.readFileSync(filePath).toString().trim();

class Queue {
  constructor() {
    this._store = [];
    this._front = 0;
    this._rear = 0;
  }
  get size() {
    if (this._store[this._rear] === undefined) {
      return 0;
    }
    return this._rear - this._front + 1;
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
}
function solution(n) {
  const result = [];
  const queue = new Queue();

  for (let i = 1; i <= n; i++) {
    queue.push(i);
  }

  while (true) {
    result.push(queue.pop());
    if (queue.size === 0) {
      break;
    }
    const value = queue.pop();
    queue.push(value);
  }

  return result.join(" ");
}

console.log(solution(Number(N)));
