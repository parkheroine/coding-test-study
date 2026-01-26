"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

const [N, M, X] = input[0];

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
      if (this.heap[p][1] < this.heap[i][1]) break;
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
      if (l < this.size && this.heap[l][1] < this.heap[s][1]) s = l;
      if (r < this.size && this.heap[r][1] < this.heap[s][1]) s = r;
      if (i === s) break;
      [this.heap[s], this.heap[i]] = [this.heap[i], this.heap[s]];
      i = s;
    }
    return peek;
  }
}

function solution() {
  //1. 순방향 그래프에서 start X : X -> 각자 집
  const graph = Array.from({ length: N + 1 }, () => []);
  const dists = Array(N + 1).fill(Infinity);
  //2. 역방향 그래프에서 start X : 각자 집 -> X
  const reverseGraph = Array.from({ length: N + 1 }, () => []);
  const reverseDists = Array(N + 1).fill(Infinity);

  for (let i = 1; i < input.length; i++) {
    const [s, e, cost] = input[i];
    graph[s].push([e, cost]);
    reverseGraph[e].push([s, cost]);
  }

  dijkstra(X, graph, dists);
  dijkstra(X, reverseGraph, reverseDists);

  let max = 0;

  for (let i = 1; i < dists.length; i++) {
    const cur = dists[i] + reverseDists[i];
    if (max < cur) {
      max = cur;
    }
  }
  return max;
}

function dijkstra(start, graph, dists) {
  const pq = new MinHeap();
  pq.push([start, 0]);
  dists[start] = 0;

  while (pq.size) {
    const [curNode, curDist] = pq.pop();
    if (curDist > dists[curNode]) continue;

    for (const [adj, dist] of graph[curNode]) {
      const newDist = curDist + dist;
      if (dists[adj] > newDist) {
        dists[adj] = newDist;
        pq.push([adj, newDist]);
      }
    }
  }
}

console.log(solution());
