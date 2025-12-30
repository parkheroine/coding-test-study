"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));
const [N, W, L] = input[0];
const trucks = [...input[1]];

class Queue {
  constructor() {
    this._store = {};
    this._front = 0;
    this._rear = 0;
  }

  get size() {
    return this._rear - this._front;
  }

  push(value) {
    this._store[this._rear] = value;
    this._rear++;
  }

  pop() {
    if (this.size === 0) return null;

    const temp = this._store[this._front];
    delete this._store[this._front];
    this._front++;

    if (this.size === 0) {
      this._front = 0;
      this._rear = 0;
    }

    return temp;
  }
}

function solution(W, L, trucks) {
  let time = 0;
  const bridge = new Queue();
  let bridgeWeight = 0;
  let truckIdx = 0;

  for (let i = 0; i < W; i++) {
    bridge.push(0);
  }

  while (truckIdx < trucks.length) {
    time++;
    const first = bridge.pop();
    bridgeWeight -= first;

    if (trucks[truckIdx] + bridgeWeight <= L) {
      bridge.push(trucks[truckIdx]);
      bridgeWeight += trucks[truckIdx];
      truckIdx++;
    } else {
      bridge.push(0);
    }
  }

  return time + W;
}

console.log(solution(W, L, trucks));
