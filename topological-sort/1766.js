"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

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
      const p = Math.floor((i - 1) / 2);
      if (this.heap[p] < this.heap[i]) break;
      [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]];
      i = p;
    }
  }

  pop() {
    if (this.size === 0) return null;
    if (this.size === 1) return this.heap.pop();
    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    let i = 0;
    while (true) {
      const l = i * 2 + 1;
      const r = i * 2 + 2;
      let s = i;
      if (l < this.size && this.heap[l] < this.heap[s]) s = l;
      if (r < this.size && this.heap[r] < this.heap[s]) s = r;
      if (i === s) break;
      [this.heap[s], this.heap[i]] = [this.heap[i], this.heap[s]];
      i = s;
    }
    return top;
  }
}
function solution() {
  const [N, M] = input[0];
  const nexts = Array.from({ length: N + 1 }, () => []);
  const degree = Array(N + 1).fill(0);
  const result = [];
  const pq = new MinHeap();

  for (let i = 1; i < input.length; i++) {
    const [A, B] = input[i];
    degree[B]++;
    nexts[A].push(B);
  }

  for (let i = 1; i < degree.length; i++) {
    if (degree[i] === 0) {
      pq.push(i);
    }
  }

  while (pq.size > 0) {
    const cur = pq.pop();
    result.push(cur);
    for (const next of nexts[cur]) {
      degree[next]--;
      if (degree[next] === 0) {
        pq.push(next);
      }
    }
  }
  return result.join(" ");
}

console.log(solution());
