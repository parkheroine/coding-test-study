"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
input.splice(0, 1);

function solution() {
  const set = new Set();

  for (const line of input) {
    const [name, log] = line.split(" ");
    if (log === "enter") {
      set.add(name);
    } else {
      set.delete(name);
    }
  }

  const list = [...set];
  list.sort().reverse();
  return list.join("\n");
}

console.log(solution());
