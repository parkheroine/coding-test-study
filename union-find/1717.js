"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

function solution() {
  const [[N, M], ...commands] = input;
  const parent = Array.from({ length: N + 1 }, (v, i) => i);

  function find(node) {
    if (parent[node] === node) return node;
    parent[node] = find(parent[node]);
    return parent[node];
  }
  function union(a, b) {
    const rootA = find(a);
    const rootB = find(b);

    if (rootA !== rootB) {
      parent[rootB] = rootA;
    }
  }

  function isSameSet(a, b) {
    const rootA = find(a);
    const rootB = find(b);
    return rootA === rootB;
  }

  const result = [];
  for (let i = 0; i < commands.length; i++) {
    const [oper, A, B] = commands[i];
    if (oper === 0) {
      //합집합 연산
      union(A, B);
    }
    if (oper === 1) {
      //같은 집합인지
      result.push(isSameSet(A, B) ? "YES" : "NO");
    }
  }

  return result.join("\n");
}

console.log(solution());
