"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" "));

class Queue {
  constructor(store) {
    this._store = store;
    this._front = 0;
    this._rear = store.length;
  }

  get size() {
    return this._rear - this._front;
  }

  push(value) {
    this._store[this._rear] = value;
    this._rear++;
  }

  pop() {
    const temp = this._store[this._front];
    delete this._store[this._front];
    this._front++;
    if (this.size === 0) {
      this._front = 0;
      this._rear = 0;
    }
    return temp === undefined ? -1 : temp;
  }
  get peek() {
    return this._store[this._front];
  }
}

function solution() {
  const queueList = [];
  const targetStr = input[input.length - 1];
  for (let i = 1; i < input.length - 1; i++) {
    queueList.push(new Queue(input[i]));
  }
  for (let i = 0; i < targetStr.length; i++) {
    const targetWord = targetStr[i];
    let flag = false;
    for (let j = 0; j < queueList.length; j++) {
      if (queueList[j].peek === targetWord) {
        queueList[j].pop();
        flag = true;
        break;
      }
    }
    if (flag === false) {
      return "Impossible";
    }
  }

  for (let i = 0; i < queueList.length; i++) {
    if (queueList[i].size) {
      return "Impossible";
    }
  }

  return "Possible";
}
console.log(solution());
