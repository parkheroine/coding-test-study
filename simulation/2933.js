"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [R, C] = input[0].split(" ").map(Number);
const board = input.slice(1, R + 1).map((line) => line.split(""));
const N = Number(input[R + 1]);
const heights = input[R + 2].split(" ").map(Number);

const dr = [-1, 1, 0, 0];
const dc = [0, 0, -1, 1];

function solution() {
  for (let i = 0; i < N; i++) {
    const row = R - heights[i];
    const isLeft = i % 2 === 0;

    // 1. 막대 던지기
    let targetC = -1;
    if (isLeft) {
      for (let j = 0; j < C; j++) {
        if (board[row][j] === "x") {
          targetC = j;
          break;
        }
      }
    } else {
      for (let j = C - 1; j >= 0; j--) {
        if (board[row][j] === "x") {
          targetC = j;
          break;
        }
      }
    }

    if (targetC !== -1) {
      board[row][targetC] = "."; // 미네랄 파괴
      // 2. 파괴된 주변 클러스터 확인
      for (let d = 0; d < 4; d++) {
        const nr = row + dr[d];
        const nc = targetC + dc[d];
        if (nr >= 0 && nr < R && nc >= 0 && nc < C && board[nr][nc] === "x") {
          findAndDrop(nr, nc);
        }
      }
    }
  }
  console.log(board.map((line) => line.join("")).join("\n"));
}

function findAndDrop(startR, startC) {
  //BFS
  const cluster = [];
  const visited = Array.from({ length: R }, () => Array(C).fill(false));
  const queue = [[startR, startC]];
  visited[startR][startC] = true;

  let isFloating = true;
  let idx = 0;
  while (idx < queue.length) {
    const [r, c] = queue[idx++];
    cluster.push([r, c]);
    if (r === R - 1) isFloating = false; // 바닥에 닿아있으면 안 떨어짐

    for (let d = 0; d < 4; d++) {
      const nr = r + dr[d];
      const nc = c + dc[d];
      if (
        nr >= 0 &&
        nr < R &&
        nc >= 0 &&
        nc < C &&
        //범위 내
        board[nr][nc] === "x" &&
        !visited[nr][nc]
        //미네랄
      ) {
        visited[nr][nc] = true;
        queue.push([nr, nc]);
      }
    }
  }

  // 3. 공중에 떠 있다면 떨어뜨리기
  if (isFloating) {
    // 클러스터가 있던 자리를 일단 비움
    cluster.forEach(([r, c]) => (board[r][c] = "."));

    let dropDist = R; //공중에 뜬 클러스터가 최대로 내려갈 수 있는 칸 수
    cluster.forEach(([r, c]) => {
      let h = 1;
      while (r + h < R && board[r + h][c] === ".") h++;
      dropDist = Math.min(dropDist, h - 1);
    });

    cluster.forEach(([r, c]) => {
      board[r + dropDist][c] = "x";
    });
  }
}

solution();
