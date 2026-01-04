"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

class Queue {
  constructor() {
    this._store = {};
    this._front = 0;
    this._rear = 0;
  }
  get size() {
    return this._rear - this._front;
  }

  push(value) {
    this._store[this._rear] = value;
    this._rear++;
  }
  pop() {
    if (this.size === 0) return null;
    const temp = this._store[this._front];
    delete this._store[this._front];
    this._front++;
    if (this.size === 0) {
      this._front = 0;
      this._rear = 0;
    }
    return temp;
  }
}
const [N, M] = input[0];
input.splice(0, 1);
function solution(input) {
  const spaces = [];
  const graph = [];
  const viruses = [];

  for (let i = 0; i < N; i++) {
    const row = input[i];
    graph.push(row);
    for (let j = 0; j < M; j++) {
      if (input[i][j] === 0) {
        spaces.push([i, j]);
      }
      if (input[i][j] === 2) {
        viruses.push([i, j]);
      }
    }
  }

  let result = 0;

  for (let i = 0; i < spaces.length; i++) {
    for (let j = i + 1; j < spaces.length; j++) {
      for (let k = j + 1; k < spaces.length; k++) {
        const [r1, c1] = spaces[i];
        const [r2, c2] = spaces[j];
        const [r3, c3] = spaces[k];

        graph[r1][c1] = 1;
        graph[r2][c2] = 1;
        graph[r3][c3] = 1;

        const temp = bfs(graph, viruses);
        result = Math.max(result, temp);
        graph[r1][c1] = 0;
        graph[r2][c2] = 0;
        graph[r3][c3] = 0;
      }
    }
  }
  return result;
}

function bfs(originalGraph, viruses) {
  const graph = originalGraph.map((r) => r.map((c) => c));
  const queue = new Queue();

  for (let i = 0; i < viruses.length; i++) {
    queue.push(viruses[i]);
  }

  const dY = [-1, 1, 0, 0];
  const dX = [0, 0, -1, 1];

  while (queue.size) {
    const [curY, curX] = queue.pop();
    for (let i = 0; i < dY.length; i++) {
      const newY = curY + dY[i];
      const newX = curX + dX[i];
      if (
        0 <= newY &&
        newY < N &&
        0 <= newX &&
        newX < M &&
        graph[newY][newX] === 0
      ) {
        graph[newY][newX] = 2;
        queue.push([newY, newX]);
      }
    }
  }
  let temp = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (graph[i][j] === 0) {
        temp++;
      }
    }
  }

  return temp;
}

console.log(solution(input));
