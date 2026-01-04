"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
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
      let p = Math.floor((i - 1) / 2);
      if (this.heap[p][1] < this.heap[i][1]) break;
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
      if (l < this.size && this.heap[s][1] > this.heap[l][1]) s = l;
      if (r < this.size && this.heap[s][1] > this.heap[r][1]) s = r;
      if (i === s) break;
      [this.heap[s], this.heap[i]] = [this.heap[i], this.heap[s]];
      i = s;
    }
    return min;
  }
}
function solution() {
  const [V, _] = input[0];
  const [target] = input[1];

  const pq = new MinHeap();

  const graph = Array.from({ length: V + 1 }, () => []);

  for (let i = 2; i < input.length; i++) {
    const [u, v, w] = input[i];
    graph[u].push([v, w]);
  }

  const dist = Array(V + 1).fill(Infinity);
  dist[target] = 0;
  pq.push([target, 0]);

  while (pq.size) {
    const [curV, curW] = pq.pop();
    if (dist[curV] < curW) continue;

    for (const [nextV, weight] of graph[curV]) {
      if (dist[nextV] > curW + weight) {
        dist[nextV] = curW + weight;
        pq.push([nextV, dist[nextV]]);
      }
    }
  }

  const result = [];

  for (let i = 1; i < dist.length; i++) {
    if (dist[i] === Infinity) {
      result.push("INF");
    } else {
      result.push(dist[i]);
    }
  }

  return result.join("\n");
}

console.log(solution(input));
