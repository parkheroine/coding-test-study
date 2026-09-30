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
  const N = input[0][0];
  const board = input.slice(1);
  const d = [
    [1, 0],
    [0, -1],
    [-1, 0],
    [0, 1],
  ];

  let cx, cy;
  let level = 2;
  let nfish = 0;
  let fishCount = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (board[i][j] === 9) {
        cy = i;
        cx = j;
        board[i][j] = 0;
      } else if (board[i][j] > 0) {
        nfish++;
      }
    }
  }

  let result = 0;
  while (true) {
    const next = bfs(cy, cx);
    if (!next) break;
    cy = next[0];
    cx = next[1];
  }

  function bfs(cy, cx) {
    const queue = [[cy, cx, 0]];
    let head = 0;
    const visited = Array.from({ length: N }, () => Array(N).fill(false));
    visited[cy][cx] = true;

    const candidates = []; // 먹을 수 있는 물고기 후보들
    let minDist = Infinity;

    while (head < queue.length) {
      const [y, x, time] = queue[head++];

      // 이미 찾은 최단 거리보다 멀어지면 더 이상 탐색할 필요 없음
      if (time > minDist) break;

      // 먹을 수 있는 물고기 발견 시
      if (board[y][x] > 0 && board[y][x] < level) {
        minDist = time;
        candidates.push([y, x, time]);
        continue; // 아래 이동 탐색은 계속 진행해서 같은 거리의 다른 물고기도 찾음
      }

      for (let i = 0; i < 4; i++) {
        const ny = y + d[i][0];
        const nx = x + d[i][1];
        if (
          0 <= ny &&
          ny < N &&
          0 <= nx &&
          nx < N &&
          !visited[ny][nx] &&
          board[ny][nx] <= level
        ) {
          visited[ny][nx] = true;
          queue.push([ny, nx, time + 1]);
        }
      }
    }

    // 먹을 수 있는 물고기가 없으면 종료
    if (candidates.length === 0) return null;

    // 🌟 가장 위(y 오름차순), 가장 왼쪽(x 오름차순) 정렬
    candidates.sort((a, b) => (a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]));

    const [targetY, targetX, targetTime] = candidates[0];

    // 먹기 처리
    board[targetY][targetX] = 0;
    fishCount++;
    if (fishCount === level) {
      fishCount = 0;
      level++;
    }
    result += targetTime;

    return [targetY, targetX];
  }
  return result;
}

console.log(solution());
