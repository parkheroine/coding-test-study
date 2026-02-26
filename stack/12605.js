"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

function solution() {
  const result = [];

  for (let i = 1; i < input.length; i++) {
    const arr = input[i].split(" ");
    arr.reverse();
    result.push(`Case #${i}: ${arr.join(" ")}`);
  }
  return result.join("\n");
}

console.log(solution());
