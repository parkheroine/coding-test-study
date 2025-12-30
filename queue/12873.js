"use strict";
const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const N = fs.readFileSync(filePath).toString().trim();

function solution(N) {
  let players = Array.from({ length: N }, (_, i) => i + 1);
  let currentIndex = 0;

  for (let level = 1; level < N; level++) {
    let step = (BigInt(level) ** 3n - 1n) % BigInt(players.length);
    currentIndex = (currentIndex + Number(step)) % players.length;
    players.splice(currentIndex, 1);
  }

  return players[0];
}

console.log(solution(Number(N)));
