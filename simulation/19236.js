"use strict";

const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split("\n");

// 8가지 방향: ↑, ↖, ←, ↙, ↓, ↘, →, ↗
const dr = [-1, -1, 0, 1, 1, 1, 0, -1];
const dc = [0, -1, -1, -1, 0, 1, 1, 1];

let maxScore = 0;

function solution() {
  let board = Array.from({ length: 4 }, () => Array(4).fill(null));
  let fishes = Array(17).fill(null);

  for (let i = 0; i < 4; i++) {
    const line = input[i].split(" ").map(Number);
    for (let j = 0; j < 4; j++) {
      const num = line[j * 2];
      const dir = line[j * 2 + 1] - 1; // 0~7로 보정
      board[i][j] = num;
      fishes[num] = { r: i, c: j, dir, alive: true };
    }
  }

  // 초기 상어 진입: (0,0) 물고기를 먹음
  const firstFishNum = board[0][0];
  const sharkDir = fishes[firstFishNum].dir;
  fishes[firstFishNum].alive = false;
  board[0][0] = -1; // 상어 위치는 -1로 표시

  dfs(board, fishes, 0, 0, sharkDir, firstFishNum);
  console.log(maxScore);
}

function dfs(board, fishes, sR, sC, sDir, sum) {
  maxScore = Math.max(maxScore, sum);

  // 1. 상태 복사 (Deep Copy)
  const newBoard = board.map((row) => [...row]);
  const newFishes = fishes.map((f) => (f ? { ...f } : null));

  // 2. 물고기 이동
  moveFishes(newBoard, newFishes);

  // 3. 상어 이동 시도
  for (let dist = 1; dist < 4; dist++) {
    const nR = sR + dr[sDir] * dist;
    const nC = sC + dc[sDir] * dist;

    // 경계 안이고 물고기가 있다면
    if (nR >= 0 && nR < 4 && nC >= 0 && nC < 4 && newBoard[nR][nC] > 0) {
      const targetFishNum = newBoard[nR][nC];
      const nextSharkDir = newFishes[targetFishNum].dir;

      // 이동 처리
      newBoard[sR][sC] = 0; // 원래 상어 있던 곳 빈칸
      newBoard[nR][nC] = -1; // 새로운 상어 위치
      newFishes[targetFishNum].alive = false;

      dfs(newBoard, newFishes, nR, nC, nextSharkDir, sum + targetFishNum);

      // 백트래킹 복구
      newBoard[sR][sC] = -1;
      newBoard[nR][nC] = targetFishNum;
      newFishes[targetFishNum].alive = true;
    }
  }
}

function moveFishes(board, fishes) {
  for (let i = 1; i <= 16; i++) {
    const f = fishes[i];
    if (!f.alive) continue;

    for (let d = 0; d < 8; d++) {
      const nextDir = (f.dir + d) % 8;
      const nR = f.r + dr[nextDir];
      const nC = f.c + dc[nextDir];

      // 경계 안이고 상어(-1)가 아니면 이동 가능
      if (nR >= 0 && nR < 4 && nC >= 0 && nC < 4 && board[nR][nC] !== -1) {
        const targetFishNum = board[nR][nC];

        if (targetFishNum > 0) {
          // 다른 물고기와 위치 교체
          const targetFish = fishes[targetFishNum];
          targetFish.r = f.r;
          targetFish.c = f.c;
          board[f.r][f.c] = targetFishNum;
        } else {
          // 빈칸으로 이동
          board[f.r][f.c] = 0;
        }

        f.r = nR;
        f.c = nC;
        f.dir = nextDir;
        board[nR][nC] = i;
        break;
      }
    }
  }
}

solution();
