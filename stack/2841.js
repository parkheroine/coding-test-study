"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));
const [N, P] = input[0];

class Stack {
  constructor() {
    this.store = [];
  }

  push(value) {
    this.store.push(value);
  }
  pop() {
    if (this.size === 0) return -1;
    return this.store.pop();
  }

  get size() {
    return this.store.length;
  }
  get top() {
    return this.store[this.store.length - 1] || -1;
  }
}

function solution() {
  const melodyArray = Array(N + 1);
  let result = 0;

  for (let i = 1; i < input.length; i++) {
    const [melody, plat] = input[i];
    if (!melodyArray[melody]) {
      melodyArray[melody] = new Stack();
    }
    const curPlat = melodyArray[melody];

    while (curPlat.size && curPlat.top > plat) {
      curPlat.pop();
      result++;
    }

    if (curPlat.top !== plat) {
      result++;
      curPlat.push(plat);
    }
  }

  return result;
}

console.log(solution());
