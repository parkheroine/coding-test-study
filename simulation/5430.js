"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const T = Number(input[0]);

function solution() {
  const result = [];

  for (let i = 1; i < input.length; i += 3) {
    const p = input[i];
    const n = Number(input[i + 1]);

    const arr = n === 0 ? [] : input[i + 2].slice(1, -1).split(",").map(Number);

    let flag = false;
    let front = 0;
    let rear = arr.length - 1;
    let isReverse = false;
    for (let j = 0; j < p.length; j++) {
      if (p[j] === "R") {
        isReverse = !isReverse;
      }
      if (p[j] === "D") {
        if (rear - front + 1 === 0) {
          result.push("error");
          flag = true;
          break;
        }
        if (isReverse) {
          rear--;
        } else {
          front++;
        }
      }
    }

    if (!flag) {
      if (isReverse) {
        result.push(`[${arr.slice(front, rear + 1).reverse()}]`);
      } else {
        result.push(`[${arr.slice(front, rear + 1)}]`);
      }
    }
  }

  return result.join("\n");
}

console.log(solution());
