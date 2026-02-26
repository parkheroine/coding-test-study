"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

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

    if (this.size === 0) {
      this.front = 0;
      this.rear = 0;
    }

    return temp;
  }
}

function solution() {
  const K = input[0][0];
  const [W, H] = input[1];
  const graph = [];
  for (let i = 2; i < input.length; i++) {
    graph.push(input[i]);
  }

  const queue = new Queue();
  const visited = Array.from({ length: H }, () =>
    Array.from({ length: W }, () => Array(K + 1).fill(false)),
  );
  const dy = [-1, 1, 0, 0];
  const dx = [0, 0, 1, -1];

  const dh = [
    [-2, 1],
    [-2, -1],
    [2, 1],
    [2, -1],
    [-1, 2],
    [-1, -2],
    [1, 2],
    [1, -2],
  ];

  queue.push([0, 0, 0, 0]);
  visited[0][0][0] = true;

  while (queue.size > 0) {
    const [y, x, count, usedK] = queue.pop();
    if (y == H - 1 && x == W - 1) {
      return count;
    }

    for (let i = 0; i < 4; i++) {
      const ny = y + dy[i];
      const nx = x + dx[i];
      if (
        0 <= ny &&
        ny < H &&
        0 <= nx &&
        nx < W &&
        !visited[ny][nx][usedK] &&
        graph[ny][nx] === 0
      ) {
        queue.push([ny, nx, count + 1, usedK]);
        visited[ny][nx][usedK] = true;
      }
    }

    if (usedK < K) {
      for (let i = 0; i < dh.length; i++) {
        const [dy, dx] = dh[i];
        const ny = y + dy;
        const nx = x + dx;
        if (
          0 <= ny &&
          ny < H &&
          0 <= nx &&
          nx < W &&
          !visited[ny][nx][usedK + 1] &&
          graph[ny][nx] === 0
        ) {
          queue.push([ny, nx, count + 1, usedK + 1]);
          visited[ny][nx][usedK + 1] = true;
        }
      }
    }
  }

  return -1;
}

console.log(solution());
