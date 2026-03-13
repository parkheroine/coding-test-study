"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input[0]);
const lines = input[1].split(" ").map(Number);

function solution() {
  const tails = []; //최장 증가 부분 수열 길이

  for (let i = 0; i < N; i++) {
    const current = lines[i];
    if (tails.length === 0 || current > tails[tails.length - 1]) {
      //증가, tails에 추가
      tails.push(current);
    } else {
      //tails에서 들어갈 자리 찾기
      let l = 0;
      let r = tails.length - 1;
      while (l <= r) {
        const mid = Math.floor((l + r) / 2);
        if (tails[mid] < current) {
          l = mid + 1;
        } else {
          r = mid - 1;
        }
      }
      tails[l] = current;
    }
  }

  return tails.length;
}

console.log(solution());
