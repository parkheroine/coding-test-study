"use strict";

const readline = require("readline");
const fs = require("fs");
const rl = readline.createInterface({
  input:
    process.platform === "linux"
      ? process.stdin
      : fs.createReadStream("input.txt"),
  output: process.stdout,
  terminal: false,
});

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
    this.store[this.rear] = value;
    this.rear++;
  }

  pop() {
    if (this.size === 0) {
      return null;
    }
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
  const q = new Queue();
  let N, K;
  let i = 0;
  let result = 0;
  const countArr = Array(21).fill(0);

  rl.on("line", (line) => {
    if (i === 0) {
      [N, K] = line.split(" ").map(Number);
      i++;
      return;
    }
    q.push(line);
    countArr[line.length]++;
    if (q.size > K) {
      const target = q.pop();
      countArr[target.length]--;
      result += countArr[target.length];
    }
  });

  rl.on("close", () => {
    while (q.size > 0) {
      const target = q.pop();
      countArr[target.length]--;
      result += countArr[target.length];
    }
    console.log(result);
  });
}

solution();
