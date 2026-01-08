"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map(Number);

class MinHeap {
  constructor() {
    this.heap = [];
  }

  get size() {
    return this.heap.length;
  }

  isSmall(a, b) {
    const absA = Math.abs(a);
    const absB = Math.abs(b);
    if (absA === absB) {
      return a < b;
    }
    return absA < absB;
  }

  push(value) {
    this.heap.push(value);
    let i = this.heap.length - 1;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.isSmall(this.heap[p], this.heap[i])) {
        break;
      }

      [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]];
      i = p;
    }
  }
  pop() {
    if (this.size === 1) return this.heap.pop();
    if (this.size === 0) return 0;
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    let i = 0;
    while (true) {
      const l = i * 2 + 1;
      const r = i * 2 + 2;
      let s = i;
      if (l < this.size) {
        if (this.isSmall(this.heap[l], this.heap[s])) {
          s = l;
        }
      }

      if (r < this.size) {
        if (this.isSmall(this.heap[r], this.heap[s])) {
          s = r;
        }
      }
      if (s === i) break;
      [this.heap[s], this.heap[i]] = [this.heap[i], this.heap[s]];
      i = s;
    }

    return min;
  }
}

function solution() {
  const pq = new MinHeap();
  const result = [];

  for (let i = 1; i < input.length; i++) {
    const value = input[i];
    if (value === 0) {
      const value = pq.pop();
      result.push(value);
    } else {
      pq.push(value);
    }
  }
  return result.join("\n");
}

console.log(solution());
