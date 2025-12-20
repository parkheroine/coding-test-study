"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

function createGraph() {
  const [N, E] = input.map(Number);
  const edges = input.slice(2).map((el) => el.split(" ").map(Number));
  const graph = {};

  for (let i = 1; i < N + 1; i++) {
    graph[i] = [];
  }

  for (const edge of edges) {
    const [node1, node2] = edge;
    graph[node1].push(node2);
    graph[node2].push(node1);
  }

  return { N, E, graph };
}

const { N, E, graph } = createGraph();

function solution(N, graph) {
  const visited = new Array(N).fill(false);
  let answer = -1;

  function dfs() {
    const stack = [[1, -1]];

    while (stack.length) {
      const [cur, parent] = stack.pop();
      if (visited[cur]) continue;
      stack.push([cur, parent]);
      visited[cur] = 1;
      answer++;

      for (const node of graph[cur]) {
        if (!visited[node]) stack.push([node, cur]);
      }
    }
  }

  dfs();
  return answer;
}

console.log(solution(N, graph));
