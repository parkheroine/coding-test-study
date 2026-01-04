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
function solution(input) {
  const [M, N] = input[0];
  const queue = new Queue();
  const graph = [];

  for (let y = 1; y <= N; y++) {
    const row = input[y];
    graph.push(row);
    for (let x = 0; x < M; x++) {
      if (input[y][x] === 1) {
        queue.push([y - 1, x]);
      }
    }
  }

  const dY = [-1, 1, 0, 0];
  const dX = [0, 0, 1, -1];

  while (queue.size) {
    const [curY, curX] = queue.pop();

    for (let i = 0; i < dY.length; i++) {
      const newY = curY + dY[i];
      const newX = curX + dX[i];
      if (
        0 <= newX &&
        newX < M &&
        0 <= newY &&
        newY < N &&
        graph[newY][newX] === 0
      ) {
        queue.push([newY, newX]);
        graph[newY][newX] = graph[curY][curX] + 1;
      }
    }
  }

  let result = 1;

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      result = Math.max(graph[y][x], result);
      if (graph[y][x] === 0) {
        return -1;
      }
    }
  }
  return result - 1;
}

console.log(solution(input));
