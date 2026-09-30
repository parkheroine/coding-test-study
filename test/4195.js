"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

function solution() {
  let index = 0;
  const T = Number(input[index++]);

  const result = Array.from({ length: T }, () => []);

  for (let t = 0; t < T; t++) {
    const F = Number(input[index++]);
    const parent = new Map();
    const networks = new Map();
    for (let i = index; i < index + F; i++) {
      const [A, B] = input[i].split(" ");
      const count = union(A, B);
      result[t].push(count);
    }
    index += F;

    function find(node) {
      // 처음 등장한 이름일 때만 초기화
      if (!parent.has(node)) {
        parent.set(node, node);
        networks.set(node, 1);
        return node;
      }

      if (parent.get(node) === node) return node;

      parent.set(node, find(parent.get(node)));
      return parent.get(node);
    }

    function union(A, B) {
      const rootA = find(A);
      const rootB = find(B);

      if (rootA !== rootB) {
        parent.set(rootB, rootA);
        networks.set(rootA, networks.get(rootA) + networks.get(rootB));
      }

      return networks.get(rootA);
    }
  }

  return result.map((el) => el.join("\n")).join("\n");
}

console.log(solution());
