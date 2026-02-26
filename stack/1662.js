"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? 0 : "input.txt")
  .toString()
  .trim();

function solution() {
  const stack = [];
  let currentLength = 0;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (char === "(") {
      //K배가 될 길이, K stack에 저장, k 자체는 길이에서 제외
      const K = Number(input[i - 1]);
      stack.push([currentLength - 1, K]);

      //괄호 내부 길이 초기화
      currentLength = 0;
    } else if (char === ")") {
      //괄호 닫힘, 계산
      const [prevLength, K] = stack.pop();
      currentLength = prevLength + K * currentLength;
    } else {
      // 일반 숫자, 길이++
      currentLength++;
    }
  }

  return currentLength;
}

console.log(solution());
