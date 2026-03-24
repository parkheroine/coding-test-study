"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
input.splice(0, 1);
const map = [...input];

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
    const temp = this.store[this.front];
    delete this.store[this.front];
    this.front++;
    if (this.front === this.rear) {
      this.front = 0;
      this.rear = 0;
    }

    return temp;
  }
}

class MaxHeap {
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
      if (this.store[p][2] > this.store[i][2]) break;
      [this.store[p], this.store[i]] = [this.store[i], this.store[p]];
      i = p;
    }
  }

  pop() {
    if (this.size === 1) return this.store.pop();
    if (this.size === 0) return null;
    const temp = this.store[0];
    this.store[0] = this.store.pop();
    let i = 0;
    while (true) {
      const l = i * 2 + 1;
      const r = i * 2 + 2;
      let s = i;
      if (l < this.size && this.store[l][2] > this.store[s][2]) s = l;
      if (r < this.size && this.store[r][2] > this.store[s][2]) s = r;
      if (s === i) {
        break;
      }
      [this.store[s], this.store[i]] = [this.store[i], this.store[s]];
      i = s;
    }

    return temp;
  }
}

function solution() {
  let start;
  let end;
  const trees = new Queue();
  const distToTree = Array.from({ length: N }, () => Array(M).fill(-1));
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      const cur = map[i][j];
      if (cur === "+") {
        trees.push([i, j]);
        distToTree[i][j] = 0;
      }
      if (cur === "V") {
        start = [i, j];
      }
      if (cur === "J") {
        end = [i, j];
      }
    }
  }

  const dy = [-1, 1, 0, 0];
  const dx = [0, 0, 1, -1];

  //BFS로 각 칸마다 나무까지의 최소 거리 구하기
  while (trees.size) {
    const [y, x] = trees.pop();

    for (let i = 0; i < 4; i++) {
      const ny = y + dy[i];
      const nx = x + dx[i];

      if (0 <= ny && ny < N && 0 <= nx && nx < M && distToTree[ny][nx] === -1) {
        distToTree[ny][nx] = distToTree[y][x] + 1;
        trees.push([ny, nx]);
      }
    }
  }

  //dijkstra로 시작점부터 오두막까지 나무의 거리가 최대한 큰 애 골라서 가기
  const pq = new MaxHeap();
  const visited = Array.from({ length: N }, () => Array(M).fill(false));

  const [sy, sx] = start;
  pq.push([sy, sx, distToTree[sy][sx]]);
  visited[sy][sx] = true;

  while (pq.size) {
    const [y, x, cost] = pq.pop();
    if (y === end[0] && x === end[1]) {
      return cost;
    }
    for (let i = 0; i < 4; i++) {
      const ny = y + dy[i];
      const nx = x + dx[i];

      if (0 <= ny && ny < N && 0 <= nx && nx < M && !visited[ny][nx]) {
        pq.push([ny, nx, Math.min(cost, distToTree[ny][nx])]);
        visited[ny][nx] = true;
      }
    }
  }
}

console.log(solution());
