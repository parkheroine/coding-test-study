"use strict";

const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split("\n");

let [R, C, K] = input[0].split(" ").map(Number);
let board = input.slice(1).map((line) => line.split(" ").map(Number));

// 문제의 인덱스는 1부터 시작하므로 0번 인덱스로 보정
R -= 1;
C -= 1;

function solution() {
  let time = 0;

  while (time <= 100) {
    // 목표 좌표에 값이 K인지 확인
    if (board[R] && board[R][C] === K) return time;

    const rowLen = board.length;
    const colLen = board[0].length;

    if (rowLen >= colLen) {
      board = operationR(board);
    } else {
      // C 연산은 배열을 회전시킨 뒤 R 연산을 하고 다시 돌리는 방식이 편함
      board = transpose(operationR(transpose(board)));
    }
    time++;
  }

  return -1;
}

function operationR(matrix) {
  let newMatrix = [];
  let maxLen = 0;

  for (let i = 0; i < matrix.length; i++) {
    const counts = new Map();
    matrix[i].forEach((num) => {
      if (num === 0) return;
      counts.set(num, (counts.get(num) || 0) + 1);
    });

    // [숫자, 횟수] 쌍으로 변환 후 정렬
    const sorted = [...counts.entries()].sort((a, b) => {
      if (a[1] === b[1]) return a[0] - b[0]; // 횟수 같으면 숫자 오름차순
      return a[1] - b[1]; // 횟수 오름차순
    });

    const nextRow = [];
    for (const [num, count] of sorted) {
      if (nextRow.length >= 100) break;
      nextRow.push(num, count);
    }
    newMatrix.push(nextRow);
    maxLen = Math.max(maxLen, nextRow.length);
  }

  // 0으로 채워서 길이 맞추기
  for (let i = 0; i < newMatrix.length; i++) {
    while (newMatrix[i].length < maxLen) {
      newMatrix[i].push(0);
    }
  }

  return newMatrix;
}

// 행과 열을 바꾸는 함수
function transpose(matrix) {
  const rowLen = matrix.length;
  const colLen = matrix[0].length;
  const newMatrix = Array.from({ length: colLen }, () => Array(rowLen).fill(0));

  for (let i = 0; i < rowLen; i++) {
    for (let j = 0; j < colLen; j++) {
      newMatrix[j][i] = matrix[i][j];
    }
  }
  return newMatrix;
}

console.log(solution());
