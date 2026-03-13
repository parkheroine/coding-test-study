"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map(Number);

class MaxHeap {
  constructor() {
    this.heap = [];
  }

  get size() {
    return this.heap.length;
  }

  push(value) {
    this.heap.push(value);
    let i = this.heap.length - 1;

    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.heap[p] > this.heap[i]) break;
      [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]];
      i = p;
    }
  }

  pop() {
    if (this.size === 1) return this.heap.pop();
    if (this.size === 0) return null;
    const peek = this.heap[0];
    this.heap[0] = this.heap.pop();
    let i = 0;

    while (true) {
      const l = i * 2 + 1;
      const r = i * 2 + 2;
      let s = i;
      if (l < this.size && this.heap[l] > this.heap[s]) s = l;
      if (r < this.size && this.heap[r] > this.heap[s]) s = r;
      if (s === i) break;
      [this.heap[s], this.heap[i]] = [this.heap[i], this.heap[s]];
      i = s;
    }

    return peek;
  }
}

function solution() {
  const pq = new MaxHeap();
  const N = input[0];
  let target = input[1];
  if (N === 1) return 0;
  for (let i = 2; i < input.length; i++) {
    pq.push(input[i]);
  }

  let result = 0;
  while (true) {
    const peek = pq.pop();
    if (target > peek) {
      break;
    }

    target++;
    result++;
    pq.push(peek - 1);
  }
  return result;
}

console.log(solution());
