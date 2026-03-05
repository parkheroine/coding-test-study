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

    if (this.front === this.rear) {
      this.front = 0;
      this.rear = 0;
    }

    return temp;
  }
}

function solution() {
  const [N, M, K, X] = input[0];
  const graph = Array.from({ length: N + 1 }, () => []);
  const q = new Queue();

  for (let i = 1; i < input.length; i++) {
    const [A, B] = input[i];
    graph[A].push(B);
  }

  const result = [];
  const visited = Array(N + 1).fill(false);
  q.push([X, 0]);
  visited[X] = true;

  while (q.size > 0) {
    const [cur, depth] = q.pop();
    if (depth === K) {
      result.push(cur);
      continue;
    }
    for (let i = 0; i < graph[cur].length; i++) {
      const next = graph[cur][i];
      if (!visited[next]) {
        q.push([next, depth + 1]);
        visited[next] = true;
      }
    }
  }

  if (result.length === 0) return -1;
  result.sort((a, b) => a - b);
  return result.join("\n");
}

console.log(solution());
