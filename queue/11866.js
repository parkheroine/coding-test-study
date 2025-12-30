"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const [N, K] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(" ")
  .map(Number);

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

function soulution(n, k) {
  const result = [];
  const queue = new Queue();

  for (let i = 1; i < n + 1; i++) {
    queue.push(i);
  }

  while (queue.size) {
    for (let i = 1; i <= k; i++) {
      const value = queue.pop();
      if (i !== k) {
        queue.push(value);
      } else {
        result.push(value);
      }
    }
  }

  return `<${result.join(", ")}>`;
}

console.log(soulution(N, K));
