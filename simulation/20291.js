"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

function solution() {
  const map = new Map();
  for (let i = 1; i < input.length; i++) {
    const [name, extension] = input[i].split(".");
    map.set(extension, (map.get(extension) || 0) + 1);
  }

  const result = Array(...map);
  result.sort((a, b) => a[0].localeCompare(b[0]));
  return result.map((item) => item.join(" ")).join("\n");
}

console.log(solution());
