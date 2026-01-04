"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
input.splice(0, 1);
const graph = input.map((el) => el.split("").map(Number));

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

function solution(graph, N, M) {
  let result = Infinity;

  result = bfs(graph);

  return result === Infinity ? -1 : result;
}

function bfs(graph) {
  const queue = new Queue();
  const visited = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => [false, false])
  );

  queue.push([0, 0, 1, 0]);
  visited[0][0][0] = true;

  const dy = [-1, 1, 0, 0];
  const dx = [0, 0, -1, 1];
  while (queue.size) {
    const [curY, curX, dist, broken] = queue.pop();
    if (curY === N - 1 && curX === M - 1) {
      return dist;
    }
    for (let i = 0; i < dy.length; i++) {
      const newY = curY + dy[i];
      const newX = curX + dx[i];
      if (!(0 <= newY && newY < N && 0 <= newX && newX < M)) continue;
      if (graph[newY][newX] === 0 && !visited[newY][newX][broken]) {
        visited[newY][newX][broken] = true;
        queue.push([newY, newX, dist + 1, broken]);
      } else if (
        graph[newY][newX] === 1 &&
        broken === 0 &&
        !visited[newY][newX][1]
      ) {
        visited[newY][newX][1] = true;
        queue.push([newY, newX, dist + 1, 1]);
      }
    }
  }

  return Infinity;
}
console.log(solution(graph, N, M));
