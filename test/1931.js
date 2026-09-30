"use strict";

const { time } = require("console");
const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

function solution() {
  const [[N], ...times] = input;
  times.sort((a, b) => {
    if (a[1] === b[1]) {
      return a[0] - b[0];
    }
    return a[1] - b[1];
  });

  let result = 0;
  let prevEnd = 0;
  for (let i = 0; i < times.length; i++) {
    const [s, e] = times[i];
    if (prevEnd <= s) {
      //가능
      result++;
      prevEnd = e;
      console.log(`[${s}, ${e}]`);
    }
  }

  return result;
}

console.log(solution());
