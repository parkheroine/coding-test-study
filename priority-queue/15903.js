"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" "));

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
    if (this.size === 1) return this.heap.pop();
    if (this.size === 0) return null;
    const temp = this.heap[0];
    this.heap[0] = this.heap.pop();
    let i = 0;
    while (true) {
      let l = i * 2 + 1;
      let r = i * 2 + 2;
      let s = i;
      if (l < this.size && this.heap[l] < this.heap[s]) s = l;
      if (r < this.size && this.heap[r] < this.heap[s]) s = r;
      if (s === i) break;
      [this.heap[s], this.heap[i]] = [this.heap[i], this.heap[s]];
      i = s;
    }

    return temp;
  }
}

function solution() {
  const [N, M] = input[0].map(Number);
  const pq = new MinHeap();

  for (let i = 0; i < input[1].length; i++) {
    pq.push(BigInt(input[1][i]));
  }

  for (let i = 0; i < M; i++) {
    const a = pq.pop();
    const b = pq.pop();
    const sum = a + b;
    pq.push(sum);
    pq.push(sum);
  }

  return pq.heap.reduce((prev, cur) => prev + cur, 0n).toString();
}
console.log(solution());
