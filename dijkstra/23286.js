"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

class MinHeap {
  constructor() {
    this.store = [];
  }
  get size() {
    return this.store.length;
  }

  push(value) {
    this.store.push(value);
    let i = this.store.length - 1;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.store[p][1] < this.store[i][1]) break;
      [this.store[p], this.store[i]] = [this.store[i], this.store[p]];
      i = p;
    }
  }

  pop() {
    if (this.size === 1) return this.store.pop();
    if (this.size === 0) return null;
    const top = this.store[0];
    this.store[0] = this.store.pop();
    let i = 0;
    while (true) {
      const l = i * 2 + 1;
      const r = i * 2 + 2;
      let s = i;
      if (l < this.size && this.store[l][1] < this.store[s][1]) s = l;
      if (r < this.size && this.store[r][1] < this.store[s][1]) s = r;
      if (s === i) break;
      [this.store[s], this.store[i]] = [this.store[i], this.store[s]];
      i = s;
    }
    return top;
  }
}
function solution() {
  const [N, M, T] = input[0].split(" ").map(Number);
  let index = 1;
  const graph = Array.from({ length: N + 1 }, () => []);
  const result = [];
  for (let i = index; i < index + M; i++) {
    const [u, v, h] = input[i].split(" ").map(Number);
    graph[u].push([v, h]);
  }
  index += M;

  for (let i = index; i < index + T; i++) {
    const maxH = Array(N + 1).fill(Infinity);
    const [S, E] = input[i].split(" ").map(Number);
    const pq = new MinHeap();
    pq.push([S, 0]);
    maxH[S] = 0;

    while (pq.size) {
      const [cur, h] = pq.pop();
      if (h > maxH[cur]) continue;

      for (const [next, nh] of graph[cur]) {
        const max = Math.max(h, nh);
        if (maxH[next] > max) {
          maxH[next] = max;
          pq.push([next, max]);
        }
      }
    }

    result.push(maxH[E] === Infinity ? -1 : maxH[E]);
  }

  return result.join("\n");
}

console.log(solution());
