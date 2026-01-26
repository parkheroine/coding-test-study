"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));
const [V] = input[0];
const [E] = input[1];
input.splice(0, 2);

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
      [this.heap[i], this.heap[s]] = [this.heap[s], this.heap[i]];
      i = s;
    }
    return peek;
  }
}

function solution() {
  const [startNode, endNode] = input.pop();
  const graph = Array.from({ length: V + 1 }, () => []);
  input.forEach(([s, e, cost]) => {
    graph[s].push([e, cost]);
  });
  const costs = Array(V + 1).fill(Infinity);
  dijkstra(startNode);

  function dijkstra(start) {
    const pq = new MinHeap();
    pq.push([start, 0]);
    costs[start] = 0;

    while (pq.size) {
      const [curNode, curCost] = pq.pop();
      if (curCost > costs[curNode]) {
        continue;
      }

      for (const [adj, cost] of graph[curNode]) {
        const totalCost = curCost + cost;
        if (totalCost < costs[adj]) {
          costs[adj] = totalCost;
          pq.push([adj, totalCost]);
        }
      }
    }
  }

  return costs[endNode];
}

console.log(solution());
