"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

const N = Number(input[0][0]);

class Stack {
  constructor() {
    this.store = [];
  }

  get size() {
    return this.store.length;
  }

  push(value) {
    this.store.push(value);
  }

  pop() {
    if (this.size === 0) return -1;
    return this.store.pop();
  }
}

function solution() {
  const stack = new Stack();
  let result = 0;

  for (let i = 1; i < N + 1; i++) {
    const [cmd, A, T] = input[i];
    if (cmd === 0) {
      const curHW = stack.pop();
      if (curHW !== -1) {
        let [score, left] = curHW;
        left--;
        if (left === 0) {
          result += score;
        } else {
          stack.push([score, left]);
        }
      }
    } else {
      //새 과제
      if (T - 1 === 0) {
        result += A;
      } else {
        stack.push([A, T - 1]);
      }
    }
  }
  return result;
}

console.log(solution());
