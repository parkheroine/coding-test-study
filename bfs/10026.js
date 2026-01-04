"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const N = Number(input[0]);
input.splice(0, 1);

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

const dY = [-1, 1, 0, 0];
const dX = [0, 0, 1, -1];

const blindGraph = input.map((row) => row.replace(/G/g, "R"));

function solution(graph) {
  const visited = Array.from({ length: N }, () => Array(N).fill(false));
  const queue = new Queue();

  let result = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (visited[i][j]) continue;
      result++;
      queue.push([i, j]);
      bfs(i, j, graph, visited, queue);
    }
  }

  return result;
}

function bfs(i, j, graph, visited, queue, isValid) {
  const color = graph[i][j];
  visited[i][j] = true;
  while (queue.size) {
    const [curY, curX] = queue.pop();
    for (let i = 0; i < dY.length; i++) {
      const newY = curY + dY[i];
      const newX = curX + dX[i];
      if (
        0 <= newX &&
        newX < N &&
        0 <= newY &&
        newY < N &&
        !visited[newY][newX] &&
        graph[newY][newX] === color
      ) {
        queue.push([newY, newX]);
        visited[newY][newX] = true;
      }
    }
  }
}

console.log(solution(input), solution(blindGraph));
