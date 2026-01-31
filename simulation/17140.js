"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));
const [R, C, K] = input[0];
input.splice(0, 1);

function solution() {
  let result = 0;
  const arr = Array.from({ length: 101 }, () => Array(101).fill(0));

  let rowNum = 3;
  let colNum = 3;

  for (let i = 0; i < rowNum; i++) {
    for (let j = 0; j < colNum; j++) {
      arr[i + 1][j + 1] = input[i][j];
    }
  }

  if (arr[R][C] === K) {
    return 0;
  }

  while (result < 100) {
    if (rowNum <= colNum) {
      let maxRowNum = rowNum;
      for (let i = 1; i <= 100; i++) {
        const map = new Map();
        for (let j = 1; j <= 100; j++) {
          if (arr[i][j] === 0) continue;
          map.set(arr[i][j], (map.get(arr[i][j]) || 0) + 1);
        }
        const rowArr = Array(...map);
        rowArr.sort((a, b) => {
          if (a[1] === b[1]) return a[0] - b[0];
          return a[1] - b[1];
        });
        const rowResult = rowArr.flatMap((item) => item);

        if (rowResult.length !== 0) {
          for (let j = 1; j <= 100; j++) {
            arr[i][j] = rowResult[j - 1] ?? 0;
          }
        }
        maxRowNum = Math.min(Math.max(rowResult.length, maxRowNum), 100);
      }
      rowNum = maxRowNum;
    } else {
      let maxColNum = colNum;
      for (let j = 1; j <= 100; j++) {
        const map = new Map();
        for (let i = 1; i <= 100; i++) {
          if (arr[i][j] === 0) continue;
          map.set(arr[i][j], (map.get(arr[i][j]) || 0) + 1);
        }
        const colArr = Array(...map);
        colArr.sort((a, b) => {
          if (a[1] === b[1]) return a[0] - b[0];
          return a[1] - b[1];
        });

        const colResult = colArr.flatMap((item) => item);
        if (colResult.length !== 0) {
          for (let i = 1; i <= 100; i++) {
            arr[i][j] = colResult[i - 1] ?? 0;
          }
        }

        maxColNum = Math.min(Math.max(colResult.length, maxColNum), 100);
      }
      colNum = maxColNum;
    }

    result++;

    if (arr[R][C] === K) {
      return result;
    }
  }

  return arr[R][C] === K ? result : -1;
}

console.log(solution());
