"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const T = Number(input[0]);

let inputIndex = 1;

const answer = [];
for (let t = 0; t < T; t++) {
  const [M, N, K] = input[inputIndex].split(" ").map(Number);
  inputIndex++;

  const graph = Array.from({ length: N + 2 }, () => Array(M + 2).fill(0));
  const visited = Array.from({ length: N + 2 }, () => Array(M + 2).fill(false));
  const direction = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
  ];

  //배추 있는 곳 마킹
  for (let i = 0; i < K; i++) {
    const [X, Y] = input[inputIndex].split(" ").map(Number);
    graph[Y + 1][X + 1] = 1;
    inputIndex++; // 다음 줄로 이동
  }

  function dfs(y, x) {
    const stack = [
      [
        [y, x],
        [-1, -1],
      ],
    ];

    while (stack.length) {
      const [curY, curX] = stack.pop()[0];
      if (visited[curY][curX]) continue;
      visited[curY][curX] = 1;
      for (const dItem of direction) {
        const [dy, dx] = dItem;
        const newY = curY + dy;
        const newX = curX + dx;
        if (!visited[newY][newX] && graph[newY][newX] === 1) {
          stack.push([
            [newY, newX],
            [curY, curX],
          ]);
        }
      }
    }
  }

  let result = 0;
  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= M; j++) {
      if (!visited[i][j] && graph[i][j]) {
        result++;
        dfs(i, j);
      }
    }
  }
  answer.push(result);
}

console.log(answer.join("\n"));
