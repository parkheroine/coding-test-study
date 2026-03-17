"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input[0]);

function solution() {
  const map = new Map();

  for (let i = 1; i < input.length; i++) {
    const name = input[i];
    map.set(name, (map.get(name) ?? 0) + 1);
  }

  const mapArr = [...map.entries()];
  mapArr.sort((a, b) => {
    if (a[1] === b[1]) {
      return a[0].localeCompare(b);
    }
    return b[1] - a[1];
  });

  return mapArr[0][0];
}

console.log(solution());
