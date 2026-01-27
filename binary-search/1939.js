"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));
const [N, M] = input[0];
const [START, END] = input.pop();

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
    this.store[this.rear] = value;
    this.rear++;
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
  const graph = Array.from({ length: N + 1 }, () => []);

  let l = Infinity;
  let r = 0;

  for (let i = 1; i < input.length; i++) {
    const [nodeA, nodeB, weight] = input[i];
    graph[nodeA].push([nodeB, weight]);
    graph[nodeB].push([nodeA, weight]);
    if (weight < l) l = weight;
    if (weight > r) r = weight;
  }

  let result = 0;

  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    const flag = bfs(graph, mid);
    if (flag) {
      l = mid + 1;
      result = mid;
    } else {
      r = mid - 1;
    }
  }
  return result;
}

function bfs(graph, mid) {
  const queue = new Queue();
  queue.push(START);
  const visited = Array(N + 1).fill(false);
  let flag = false;
  while (queue.size) {
    const cur = queue.pop();
    if (cur === END) {
      flag = true;
    }

    for (const [next, weight] of graph[cur]) {
      if (!visited[next] && weight >= mid) {
        visited[next] = true;
        queue.push(next);
      }
    }
  }
  return flag;
}
console.log(solution());
