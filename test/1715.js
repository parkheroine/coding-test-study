"use strict";

const readline = require("readline");
const fs = require("fs");
const rl = readline.createInterface({
  input:
    process.platform === "linux"
      ? process.stdin
      : fs.createReadStream("input.txt"),
  output: process.stdout,
  terminal: false,
});

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
    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    let i = 0;
    while (true) {
      const l = i * 2 + 1;
      const r = i * 2 + 2;
      let s = i;
      if (l < this.size && this.heap[l] < this.heap[s]) s = l;
      if (r < this.size && this.heap[r] < this.heap[s]) s = r;
      if (s === i) break;
      [this.heap[s], this.heap[i]] = [this.heap[i], this.heap[s]];
      i = s;
    }

    return top;
  }
}
function solution() {
  let index = 0;
  let N;
  const pq = new MinHeap();
  rl.on("line", (line) => {
    if (index === 0) {
      N = Number(line);
      index++;
    } else {
      pq.push(Number(line));
    }
  });

  rl.on("close", () => {
    let result = 0;
    while (pq.size > 1) {
      const n1 = pq.pop();
      const n2 = pq.pop();

      const sum = Number(n1) + Number(n2);
      result += sum;

      pq.push(sum);
    }
    console.log(result);
  });
}

solution();
