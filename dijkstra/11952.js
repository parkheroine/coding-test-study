"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

class Queue {
  constructor() {
    this.store = {};
    this.front = 0;
    this.rear = 0;
  }
  get size() {
    return this.rear - this.front;
  }
  push(value) {
    this.store[this.rear++] = value;
  }
  pop() {
    if (this.size === 0) return null;
    const tmp = this.store[this.front];
    delete this.store[this.front];
    this.front++;
    if (this.size === 0) {
      this.front = 0;
      this.rear = 0;
    }
    return tmp;
  }
}

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
    const tmp = this.store[0];
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
    return tmp;
  }
}

function solution() {
  const [N, M, K, S] = input[0].split(" ").map(Number);
  const [P, Q] = input[1].split(" ").map(Number);
  const citys = Array(N + 1).fill(1); //0: 위험, -1: 불가능, 1:안전
  const graph = Array.from({ length: N + 1 }, () => []);
  const queue = new Queue();
  let index = 2;
  for (let i = index; i < index + K; i++) {
    const num = Number(input[i]);
    citys[num] = -1;
    queue.push([num, 0]); //위험한 도시 번호, 거리
  }
  index = index + K;
  for (let i = index; i < index + M; i++) {
    const [A, B] = input[i].split(" ").map(Number);
    graph[A].push(B);
    graph[B].push(A);
  }

  bfs();
  //BFS 위험한 도시 찾기
  function bfs() {
    while (queue.size) {
      const [cur, dist] = queue.pop();
      if (dist >= S) {
        continue;
      }

      for (const next of graph[cur]) {
        if (citys[next] === 1) {
          queue.push([next, dist + 1]);
          citys[next] = 0;
        }
      }
    }
  }

  //dijkstra: 숙박비 구하기
  const dists = Array(N + 1).fill(Infinity);

  dijkstra();
  function dijkstra() {
    const pq = new MinHeap();
    pq.push([1, 0]);
    dists[1] = 0;
    while (pq.size) {
      const [cur, dist] = pq.pop();
      if (dist > dists[cur]) continue;
      for (const next of graph[cur]) {
        if (citys[next] === -1) continue;
        const cost = citys[next] === 1 ? P : Q;
        const newDist = next === N ? dist : dist + cost;
        if (dists[next] > newDist) {
          dists[next] = newDist;
          pq.push([next, newDist]);
        }
      }
    }
  }

  return dists[N];
}
console.log(solution());
