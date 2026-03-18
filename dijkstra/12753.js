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
      if (this.store[p][2] < this.store[i][2]) break;
      [this.store[p], this.store[i]] = [this.store[i], this.store[p]];
      i = p;
    }
  }

  pop() {
    if (this.size === 1) return this.store.pop();
    if (this.size === 0) return null;
    const tmp = this.store[0];
    this.store[0] = this.store.pop();
    let i = 0;
    while (true) {
      const l = i * 2 + 1;
      const r = i * 2 + 2;
      let s = i;
      if (l < this.size && this.store[l][2] < this.store[s][2]) s = l;
      if (r < this.size && this.store[r][2] < this.store[s][2]) s = r;
      if (s == i) break;

      [this.store[s], this.store[i]] = [this.store[i], this.store[s]];
      i = s;
    }

    return tmp;
  }
}

function solution() {
  const N = Number(input[0]);
  const [T, M] = input[1].split(" ").map(Number);

  const graph = Array.from({ length: N + 1 }, () => []);
  const result = Array.from({ length: N + 1 }, () =>
    Array(T + 1).fill(Infinity),
  ); //시간도 고려해서 저장

  for (let i = 3; i < input.length; i++) {
    const [A, B, time, cost] = input[i].split(" ").map(Number);
    graph[A].push([B, time, cost]);
    graph[B].push([A, time, cost]);
  }

  dijkstra();
  function dijkstra() {
    const pq = new MinHeap();
    pq.push([1, 0, 0]);
    result[1][0] = 0;

    while (pq.size) {
      const [cur, ct, cm] = pq.pop();
      if (cm > result[cur][ct]) continue;
      for (const [next, time, cost] of graph[cur]) {
        const nt = ct + time;
        const nm = cm + cost;
        if (nt > T || nm > M) continue;
        //특정 시간에 도달하는 최소 비용 갱신
        if (result[next][nt] > nm) {
          result[next][nt] = nm;
          pq.push([next, nt, nm]);
        }
      }
    }
  }

  const minCost = Math.min(...result[N]);
  return minCost === Infinity ? -1 : minCost;
}
console.log(solution());
