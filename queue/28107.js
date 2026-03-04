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
  let N, M;
  let index = 0;
  let queueArr;
  let result;
  rl.on("line", (line) => {
    if (index === 0) {
      [N, M] = line.split(" ").map(Number);
      result = Array(N + 1).fill(0);
      queueArr = Array.from({ length: 200000 + 1 }, () => new Queue());
      index++;
      return;
    }

    if (index < 1 + N) {
      const curOrderArr = line.split(" ").map(Number);

      for (let i = 1; i < curOrderArr.length; i++) {
        const sushiNum = curOrderArr[i];
        queueArr[sushiNum].push(index);
      }
      index++;
      return;
    }

    const madeList = line.split(" ").map(Number);
    for (let i = 0; i < madeList.length; i++) {
      const cur = madeList[i];
      if (queueArr[cur].size) {
        const customerNum = queueArr[cur].pop();
        result[customerNum]++;
      }
    }
  });

  rl.on("close", () => {
    result.splice(0, 1);
    console.log(result.join(" "));
  });
}

solution();
