"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

function solution() {
  const T = Number(input[0]);
  let line = 1;
  const result = [];

  for (let i = 0; i < T; i++) {
    const n = Number(input[line++]);
    const map = new Map();
    const numbers = [];
    for (let j = 0; j < n; j++) {
      const number = input[line++];
      numbers.push(number);
      for (let k = 0; k < number.length; k++) {
        const key = number.substring(0, k + 1);
        map.set(key, (map.get(key) ?? 0) + 1);
      }
    }
    numbers.sort((a, b) => a.length - b.length);
    let flag = true;
    for (let k = 0; k < numbers.length; k++) {
      const key = numbers[k];
      if (map.get(key) > 1) {
        flag = false;
        break;
      }
    }

    result.push(flag ? "YES" : "NO");
  }
  return result.join("\n");
}

console.log(solution());
