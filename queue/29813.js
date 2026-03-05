"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" "));

class Queue {
  constructor() {
    this.store = {};
    this.front = 0;
    this.rear = 0;
  }

  get size() {
    return this.rear - this.front;
  }

  push(value) {
    this.store[this.rear++] = value;
  }

  pop() {
    if (this.size === 0) return null;
    const temp = this.store[this.front];
    delete this.store[this.front];
    this.front++;

    if (this.front === this.rear) {
      this.front = 0;
      this.rear = 0;
    }

    return temp;
  }
}

function solution() {
  const queue = new Queue();
  for (let i = 1; i < input.length; i++) {
    const [name, strNum] = input[i];
    const num = Number(strNum);
    queue.push([name, num]);
  }

  while (queue.size > 1) {
    const [topName, topNum] = queue.pop();
    for (let i = 0; i < topNum - 1; i++) {
      const cur = queue.pop();
      queue.push(cur);
    }
    queue.pop();
  }

  const [topName, topNum] = queue.pop();

  return topName;
}

console.log(solution());
