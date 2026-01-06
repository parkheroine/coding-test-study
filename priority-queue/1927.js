"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map(Number);
input.splice(0, 1);

class MinHeap {
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
      let p = Math.floor((i - 1) / 2);
      if (this.heap[p] < this.heap[i]) {
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
      if (l < this.size && this.heap[s] > this.heap[l]) s = l;
      if (r < this.size && this.heap[s] > this.heap[r]) s = r;
      if (i === s) break;
      [this.heap[i], this.heap[s]] = [this.heap[s], this.heap[i]];
      i = s;
    }
    return min;
  }
}

function solution(input) {
  const pq = new MinHeap();
  const result = [];
  for (const value of input) {
    if (value === 0) {
      result.push(pq.pop());
    } else {
      pq.push(value);
    }
  }

  return result.join("\n");
}

console.log(solution(input));
