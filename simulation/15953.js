"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

function solution() {
  const result = [];
  const first = [0];
  const firstMap = {
    1: 500,
    2: 300,
    3: 200,
    4: 50,
    5: 30,
    6: 10,
  };
  const second = [0];
  const secondMap = {
    1: 512,
    2: 256,
    3: 128,
    4: 64,
    5: 32,
  };

  for (let i = 1; i <= 6; i++) {
    for (let j = 1; j <= i; j++) {
      first.push(firstMap[i]);
    }
  }

  for (let i = 1; i <= 5; i++) {
    for (let j = 1; j <= 2 ** (i - 1); j++) {
      second.push(secondMap[i]);
    }
  }

  for (let i = 1; i < input.length; i++) {
    const [firstRank, secondRank] = input[i];
    result.push(((first[firstRank] || 0) + (second[secondRank] || 0)) * 10000);
  }

  return result.join("\n");
}
console.log(solution());
