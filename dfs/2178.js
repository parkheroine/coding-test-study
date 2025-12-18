"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

function createInfo() {
  let N;
  let M;
  const graph = [];
  for (let i = 0; i < input.length; i++) {
    if (i === 0) {
      [N, M] = input[i].split(" ").map(Number);
      graph.push(Array(M + 2).fill(0));
    } else {
      graph.push([0, ...input[i].split("").map(Number), 0]);
    }
  }
  graph.push(Array(M + 2).fill(0));

  const visited = Array.from({ length: N + 2 }, () => Array(M + 2).fill(false));

  return { M, N, graph, visited };
}

class Queue {
  constructor() {
    this._store = {};
    this._front = 0;
    this._rear = 0;
  }

  get size() {
    if (this._store[this._rear] === undefined) {
      return 0;
    }
    return this._rear - this._front + 1;
  }
  push(value) {
    if (this.size === 0) {
      this._store["0"] = value;
      return;
    }
    this._rear += 1;
    this._store[this._rear] = value;
  }
  pop() {
    let tmp;
    tmp = this._store[this._front];
    delete this._store[this._front];
    if (this._front === this._rear) {
      this._front = 0;
      this._rear = 0;
    } else {
      this._front += 1;
    }
    return tmp === undefined ? -1 : tmp;
  }
}

const direactions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

/**
 * 최단거리를 보장하기 위해 BFS
 */
function solution() {
  const { M, N, graph, visited } = createInfo();
  const queue = new Queue();
  queue.push([1, 1, 1]); //시작 좌표Y, X, 현재까지의 칸수
  visited[1][1] = true;

  while (queue.size) {
    const [curY, curX, result] = queue.pop();

    if (curY === N && curX === M) {
      return result; //도착
    }

    for (const dItem of direactions) {
      const [dy, dx] = dItem;
      const newY = curY + dy;
      const newX = curX + dx;
      if (!visited[newY][newX] && graph[newY][newX] === 1) {
        //방문하지 않음 && 갈 수 있는 길
        queue.push([newY, newX, result + 1]);
        visited[newY][newX] = true;
      }
    }
  }
}

console.log(solution());
