"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

class Stack {
  constructor() {
    this.state = [];
  }

  push(value) {
    this.state.push(value);
  }

  pop() {
    if (this.state.length === 0) {
      return -1;
    }
    const top = this.state.pop();
    return top;
  }

  get size() {
    return this.state.length;
  }
  get empty() {
    return this.state.length === 0 ? 1 : 0;
  }
  get top() {
    if (this.state.length > 0) {
      return this.state[this.state.length - 1];
    }
    return -1;
  }
}

let answer = "";
const stack = new Stack();

for (const i in input) {
  if (i === 0) {
    continue;
  }
  const [command, value] = input[i].split(" ");

  if (command === "push" && value !== undefined) {
    stack.push(Number(value));
  }
  if (command === "pop") {
    const value = stack.pop();
    answer += `${value}\n`;
  }
  if (command === "size") {
    const value = stack.size;
    answer += `${value}\n`;
  }
  if (command === "empty") {
    const value = stack.empty;
    answer += `${value}\n`;
  }
  if (command === "top") {
    const value = stack.top;
    answer += `${value}\n`;
  }
}

console.log(answer);
