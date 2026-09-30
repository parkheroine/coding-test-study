"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

function solution() {
  const [N, M] = input[0].split(" ").map(Number);
  const map = [];
  for (let i = 1; i < input.length; i++) {
    const row = input[i].split("").map(Number);
    map.push(row);
  }

  const dy = [-1, 1, 0, 0];
  const dx = [0, 0, -1, 1];

  const queue = [];
  let head = 0;
  const visited = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => Array(2).fill(false)),
  );

  queue.push([0, 0, 1, false]);
  visited[0][0][0] = true;

  while (head < queue.length) {
    const [y, x, count, broken] = queue[head++];

    if (y === N - 1 && x === M - 1) return count;

    for (let i = 0; i < 4; i++) {
      const ny = y + dy[i];
      const nx = x + dx[i];

      if (0 <= ny && ny < N && 0 <= nx && nx < M) {
        if (map[ny][nx] === 0 && !visited[ny][nx][broken ? 1 : 0]) {
          queue.push([ny, nx, count + 1, broken]);
          visited[ny][nx][broken ? 1 : 0] = true;
        }
        if (map[ny][nx] === 1 && !broken && !visited[ny][nx][1]) {
          queue.push([ny, nx, count + 1, true]);
          visited[ny][nx][1] = true;
        }
      }
    }
  }

  return -1;
}

console.log(solution());
