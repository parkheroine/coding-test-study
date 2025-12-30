"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

class Queue {
  constructor() {
    this._store = [];
    this._front = 0;
    this._rear = 0;
  }

  get size() {
    if (this._store[this._rear] === undefined) {
      return 0;
    } else {
      return this._rear - this._front + 1;
    }
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

  isPrimary(current) {
    if (this.size <= 1) return true;
    for (let i = this._front; i <= this._rear; i++) {
      if (current[1] < this._store[i][1]) {
        return false;
      }
    }
    return true;
  }
}

function solution() {
  const result = [];
  for (let i = 1; i < input.length; i += 2) {
    let count = 0;
    const queue = new Queue();
    const [N, targetIndex] = input[i];
    for (let j = 0; j < N; j++) {
      queue.push([j, input[i + 1][j]]);
    }

    while (queue.size) {
      const current = queue.pop();

      if (queue.isPrimary(current)) {
        count++;
        if (current[0] === targetIndex) {
          result.push(count);
          break;
        }
      } else {
        queue.push(current);
      }
    }
  }

  return result.join("\n");
}

console.log(solution());
