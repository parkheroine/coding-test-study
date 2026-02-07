"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const target = input[0];

function solution() {
  if (target === "0") return "W";
  const result = [];

  if (target.includes("x")) {
    const [a, b] = target.split("x").map(Number);
    if (a / 2 === 1) result.push("xx");
    else if (a / 2 === -1) result.push("-xx");
    else result.push(`${a / 2}xx`);

    if (b) {
      if (b === 1) result.push("+x");
      else if (b === -1) result.push("-x");
      else result.push(b > 0 ? `+${b}x` : `${b}x`);
    }
  } else {
    const b = parseInt(target);
    if (b === 1) result.push("x");
    else if (b === -1) result.push("-x");
    else result.push(`${b}x`);
  }

  return result.join("") + "+W";
}

console.log(solution());
