"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

const [START, END] = input[0];

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
  const MAX = 100000;
  const costs = Array(MAX + 1).fill(Infinity);

  function dijkstra(start) {
    const pq = new MinHeap();
    pq.push([start, 0]);
    costs[start] = 0;

    while (pq.size) {
      const [curNode, curCost] = pq.pop();

      if (curCost > costs[curNode]) {
        continue;
      }

      const cases = [
        [curNode + 1, 1],
        [curNode - 1, 1],
        [curNode * 2, 0],
      ];
      for (const [adj, cost] of cases) {
        if (adj > MAX) {
          continue;
        }
        const newCost = curCost + cost;
        if (newCost < costs[adj]) {
          costs[adj] = newCost;
          pq.push([adj, newCost]);
        }
      }
    }
  }

  dijkstra(START);

  return costs[END];
}

console.log(solution());
