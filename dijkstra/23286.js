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
  const graph = Array.from({ length: N + 1 }, () => []);

  for (let i = 1; i <= M; i++) {
    const [u, v, h] = input[i].split(" ").map(Number);
    graph[u].push([v, h]);
  }

  // 모든 시작점에 대해 미리 구해두기 (N번 다익스트라)
  const allPairsDist = Array.from({ length: N + 1 }, () =>
    Array(N + 1).fill(Infinity),
  );

  for (let startNode = 1; startNode <= N; startNode++) {
    const pq = new MinHeap();
    pq.push([startNode, 0]);
    allPairsDist[startNode][startNode] = 0;

    while (pq.size) {
      const [cur, h] = pq.pop();
      if (h > allPairsDist[startNode][cur]) continue;

      for (const [next, nh] of graph[cur]) {
        const nextMax = Math.max(h, nh);
        if (allPairsDist[startNode][next] > nextMax) {
          allPairsDist[startNode][next] = nextMax;
          pq.push([next, nextMax]);
        }
      }
    }
  }

  // 질문은 O(1)로 처리
  const results = [];
  let queryStart = M + 1;
  for (let i = queryStart; i < queryStart + T; i++) {
    const [S, E] = input[i].split(" ").map(Number);
    const res = allPairsDist[S][E];
    results.push(res === Infinity ? -1 : res);
  }

  return results.join("\n");
}

console.log(solution());
