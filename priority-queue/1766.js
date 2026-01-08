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

  get peek() {
    return this.heap[0];
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
    if (this.size === 0) return -1;
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    let i = 0;
    while (true) {
      const l = i * 2 + 1;
      const r = i * 2 + 2;
      let s = i;
      if (l < this.size && this.heap[l] < this.heap[s]) s = l;
      if (r < this.size && this.heap[r] < this.heap[s]) s = r;
      if (i === s) break;
      [this.heap[i], this.heap[s]] = [this.heap[s], this.heap[i]];
      i = s;
    }

    return min;
  }
}
function solution() {
  const [N, M] = input[0];
  const result = [];
  const adj = Array.from({ length: N + 1 }, () => []); //내가 먼저 풀려야하는 문제들 리스트
  const indegree = new Int32Array(N + 1); //내 앞에 남은 장애물 개수
  const pq = new MinHeap();

  for (let i = 1; i < M + 1; i++) {
    const [first, second] = input[i];
    adj[first].push(second);
    indegree[second]++;
  }

  for (let i = 1; i < N + 1; i++) {
    if (indegree[i] === 0) {
      pq.push(i);
    }
  }

  while (pq.size) {
    const target = pq.pop();
    result.push(target);

    for (const next of adj[target]) {
      indegree[next]--;
      if (indegree[next] === 0) {
        pq.push(next);
      }
    }
  }

  return result.join(" ");
}

console.log(solution());
