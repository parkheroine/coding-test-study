"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("");

function solution() {
  const cups = [1, 0, 0];

  const pos = {
    A: [0, 1],
    B: [1, 2],
    C: [0, 2],
  };
  for (let i = 0; i < input.length; i++) {
    const [a, b] = pos[input[i]];
    [cups[a], cups[b]] = [cups[b], cups[a]];
  }

  for (let i = 0; i < cups.length; i++) {
    const cup = cups[i];
    if (cup === 1) return i + 1;
  }
}

console.log(solution());
