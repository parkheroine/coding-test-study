"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(" ")
  .map(Number);

function solution() {
  const [X, Y, D, T] = input;
  const dist = Math.sqrt(X ** 2 + Y ** 2);
  const n = Math.floor(dist / D); //ans보다 작거나 같아지는 최대 점프 횟수

  const ans = Math.min(
    dist, //그냥 걷기
    n * T + (dist - n * D), //점프 n번 + 남은 거리 걷기
    (n + 1) * T + ((n + 1) * D - dist), //점프 n+1번, 되돌아오기
    Math.max(2, n + 1) * T, //최소 점프 2번 해서 점프만 하기
  );

  return ans;
}

console.log(solution());
