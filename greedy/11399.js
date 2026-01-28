"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

const people = input[1];
people.sort((a, b) => a - b);

function solution() {
  let result = 0;
  for (let i = 0; i < people.length; i++) {
    result += people[i] * (people.length - i);
  }
  return result;
}

console.log(solution());
