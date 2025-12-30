"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

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
  get isEmpty() {
    return this.size === 0 ? 1 : 0;
  }

  get front() {
    if (this.isEmpty) {
      return -1;
    }
    return this._store[this._front];
  }
  get back() {
    if (this.isEmpty) {
      return -1;
    }
    return this._store[this._rear];
  }

  push(value) {
    if (this.isEmpty) {
      this._store[0] = value;
      return;
    }
    this._rear += 1;
    this._store[this._rear] = value;
  }

  pop() {
    let temp;
    temp = this._store[this._front];
    delete this._store[this._front];
    if (this._front === this._rear) {
      this._front = 0;
      this._rear = 0;
    } else {
      this._front += 1;
    }
    return temp === undefined ? -1 : temp;
  }
}

function solution(input) {
  const result = [];
  const queue = new Queue();
  for (let i = 1; i < input.length; i++) {
    const [command, value] = input[i].split(" ");
    if (command === "push") {
      queue.push(value);
    }
    if (command === "pop") {
      result.push(queue.pop());
    }
    if (command === "size") {
      result.push(queue.size);
    }
    if (command === "empty") {
      result.push(queue.isEmpty);
    }
    if (command === "front") {
      result.push(queue.front);
    }
    if (command === "back") {
      result.push(queue.back);
    }
  }
  return result.join("\n");
}

console.log(solution(input));
