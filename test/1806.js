"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((el) => el.trim().split(/\s+/).map(Number));

function solution() {
  const [N, S] = input[0];
  const arr = input[1];

  let start = 0;
  let sum = 0;
  let minLength = Infinity;

  // end 포인터를 0부터 N-1까지 진행
  for (let end = 0; end < N; end++) {
    sum += arr[end];

    // 합이 S 이상이 되는 순간, start를 최대한 오른쪽으로 당겨 최단 길이 갱신
    while (sum >= S) {
      minLength = Math.min(minLength, end - start + 1);
      sum -= arr[start];
      start++;
    }
  }

  return minLength === Infinity ? 0 : minLength;
}

console.log(solution());
