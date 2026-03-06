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

function solution() {
  const [H, W] = input[0].split(" ").map(Number);
  const graph = [];

  const landArr = [];
  for (let i = 1; i < input.length; i++) {
    graph.push([]);
    const y = i - 1;
    for (let j = 0; j < W; j++) {
      graph[y].push(input[i][j]);
      if (input[i][j] === "L") {
        landArr.push([y, j]);
      }
    }
  }

  let maxResult = 0;

  for (const [y, x] of landArr) {
    //BFS
    const q = new Queue();
    const visited = Array.from({ length: H }, () => Array(W).fill(false));
    q.push([y, x, 0]);
    visited[y][x] = true;
    let result = 0;

    const dy = [1, -1, 0, 0];
    const dx = [0, 0, 1, -1];
    while (q.size > 0) {
      const [y, x, depth] = q.pop();
      if (result < depth) {
        result = depth;
      }

      for (let i = 0; i < 4; i++) {
        const ny = y + dy[i];
        const nx = x + dx[i];

        if (
          0 <= ny &&
          ny < H &&
          0 <= nx &&
          nx < W &&
          graph[ny][nx] === "L" &&
          !visited[ny][nx]
        ) {
          q.push([ny, nx, depth + 1]);
          visited[ny][nx] = true;
        }
      }
    }

    if (maxResult < result) {
      maxResult = result;
    }
  }

  return maxResult;
}

console.log(solution());
