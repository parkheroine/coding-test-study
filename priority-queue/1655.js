"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map(Number);

class Heap {
  constructor(compare) {
    this.heap = [];
    this.compare = compare; // (a, b) => a가 b보다 위에 있어야 하면 true
  }

  get size() {
    return this.heap.length;
  }

  push(value) {
    this.heap.push(value);
    let i = this.heap.length - 1;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.compare(this.heap[p], this.heap[i])) break;
      [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]];
      i = p;
    }
  }

  pop() {
    if (this.size === 1) return this.heap.pop();
    if (this.size === 0) return null;
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    let i = 0;
    while (true) {
      const l = i * 2 + 1;
      const r = i * 2 + 2;
      let s = i;
      if (l < this.size && this.compare(this.heap[l], this.heap[s])) s = l;
      if (r < this.size && this.compare(this.heap[r], this.heap[s])) s = r;
      if (s === i) break;
      [this.heap[i], this.heap[s]] = [this.heap[s], this.heap[i]];
      i = s;
    }
    return min;
  }
}

function solution() {
  const minHeap = new Heap((a, b) => a < b);
  const maxHeap = new Heap((a, b) => a > b);

  const result = [];

  for (let i = 1; i < input.length; i++) {
    const value = input[i];
    if (maxHeap.size === minHeap.size) {
      maxHeap.push(value);
    } else {
      minHeap.push(value);
    }
    if (minHeap.size && maxHeap.heap[0] > minHeap.heap[0]) {
      const minTop = minHeap.pop();
      const maxTop = maxHeap.pop();
      minHeap.push(maxTop);
      maxHeap.push(minTop);
    }
    const mid = maxHeap.heap[0];
    result.push(mid);
  }

  return result.join("\n");
}

console.log(solution());
