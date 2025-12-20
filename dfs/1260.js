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

  size() {
    if (this._store[this._rear] === undefined) {
      return 0;
    }
    return this._rear - this._front + 1;
  }

  push(value) {
    if (this.size() === 0) {
      this._store["0"] = value;
      return;
    }
    this._rear += 1;
    this._store[this._rear] = value;
  }

  pop() {
    let temp;
    temp = this._store[this._front];
    delete this._store[this._front];

    if (this._front === this._rear) {
      this._front = 0;
      this._rear = 0;
    } else {
      this._front += 1;
    }

    return temp === undefined ? -1 : temp;
  }
}

function createAdjacencyList() {
  const [N, M, V] = input[0];
  const edges = input.slice(1);
  const graph = {};

  for (let i = 1; i <= N; i++) {
    graph[i] = [];
  }

  for (const edge of edges) {
    const [nodeA, nodeB] = edge;
    graph[nodeA].push(nodeB);
    graph[nodeB].push(nodeA);
  }

  for (let i = 1; i <= N; i++) {
    graph[i].sort((a, b) => a - b);
  }

  return { N, M, V, graph };
}
const { N, V, graph } = createAdjacencyList();

function dfsSolution() {
  const visited = new Array(N + 1).fill(false);
  const result = [];

  function dfs() {
    const stack = [[V, -1]];

    while (stack.length) {
      let [cur, parent] = stack.pop();
      if (visited[cur]) continue;
      stack.push([cur, parent]);
      visited[cur] = true;
      result.push(cur);

      const nodes = graph[cur];
      for (let i = nodes.length - 1; i >= 0; i--) {
        const node = nodes[i];
        if (!visited[node]) stack.push([node, cur]);
      }
    }
  }

  dfs();

  return result;
}

function bfsSolution() {
  const visited = new Array(N + 1).fill(false);
  const result = [];
  const queue = new Queue();

  queue.push(V);
  visited[V] = true;

  while (queue.size()) {
    const node = queue.pop();
    result.push(node);

    for (const neighbor of graph[node]) {
      if (!visited[neighbor]) {
        queue.push(neighbor);
        visited[neighbor] = true;
      }
    }
  }
  return result;
}

console.log(`${dfsSolution().join(" ")}\n${bfsSolution().join(" ")}`);
