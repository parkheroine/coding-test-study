"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));
const [N, P] = input[0];

function solution() {
  const melodyArray = Array.from({ length: N + 1 }, () => []);
  let result = 0;

  for (let i = 1; i < input.length; i++) {
    const [melody, plat] = input[i];
    while ((melodyArray[melody][melodyArray[melody].length - 1] ?? 0) > plat) {
      melodyArray[melody].pop();
      result++;
    }
    if (melodyArray[melody][melodyArray[melody].length - 1] === plat) {
    } else {
      melodyArray[melody].push(plat);
      result++;
    }

    melodyArray[melody].sort((a, b) => a - b);
  }

  return result;
}

console.log(solution());
