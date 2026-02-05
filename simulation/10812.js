"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));
const [N, M] = input[0];

function solution() {
  let arr = Array.from({ length: N + 1 }, (v, i) => i);
  for (let i = 1; i < input.length; i++) {
    const [begin, end, mid] = input[i];

    const part1 = arr.slice(mid, end + 1);
    const part2 = arr.slice(begin, mid);

    const rotated = [...part1, ...part2];
    arr.splice(begin, rotated.length, ...rotated);
  }

  arr.splice(0, 1);
  return arr.join(" ");
}

console.log(solution());
