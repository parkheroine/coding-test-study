"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const T = Number(input[0]);

function solution() {
  const result = [];

  let index = 1;
  for (let i = 0; i < T; i++) {
    result.push([]);
    const map = new Map();
    const target = input[index].split(" ");
    index++;
    while (input[index] !== "what does the fox say?") {
      const [value, key] = input[index].split(" goes ");
      map.set(key, value);
      index++;
    }

    for (const word of target) {
      if (!map.has(word)) {
        result[i].push(word);
      }
    }
    index++;
  }

  return result.map((row) => row.join(" ")).join("\n");
}

console.log(solution());
