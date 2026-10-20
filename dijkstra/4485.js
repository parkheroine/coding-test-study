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
      if (this.heap[p][2] < this.heap[i][2]) break;
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
      if (l < this.size && this.heap[s][2] > this.heap[l][2]) s = l;
      if (r < this.size && this.heap[s][2] > this.heap[r][2]) s = r;
      if (i === s) break;
      [this.heap[s], this.heap[i]] = [this.heap[i], this.heap[s]];
      i = s;
    }

    return top;
  }
}

function solution() {
  let index = 0;
  const result = [];
  const dy = [-1, 1, 0, 0];
  const dx = [0, 0, -1, 1];

  while (true) {
    const N = input[index++][0];
    if (N === 0) break;
    const map = Array.from({ length: N }, () => Array(N));
    const costs = Array.from({ length: N }, () => Array(N).fill(Infinity));
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        map[i][j] = input[i + index][j];
      }
    }
    index += N;

    const pq = new MinHeap();
    costs[0][0] = map[0][0];
    pq.push([0, 0, costs[0][0]]);

    while (pq.size > 0) {
      const [y, x, curCost] = pq.pop();

      for (let i = 0; i < 4; i++) {
        const ny = y + dy[i];
        const nx = x + dx[i];

        if (ny < 0 || ny >= N || nx < 0 || nx >= N) continue;
        const nextCost = curCost + map[ny][nx];
        if (nextCost >= costs[ny][nx]) continue;
        costs[ny][nx] = nextCost;
        pq.push([ny, nx, nextCost]);
      }
    }

    result.push(costs[N - 1][N - 1]);
  }

  for (let i = 0; i < result.length; i++) {
    console.log(`Problem ${i + 1}: ${result[i]}`);
  }
}

solution();
