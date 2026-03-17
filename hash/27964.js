"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" "));

function solution() {
  const topping = input[1];
  const set = new Set();
  for (let i = 0; i < topping.length; i++) {
    const cur = topping[i];
    if (cur.endsWith("Cheese")) {
      set.add(cur);
    }
  }

  return set.size >= 4 ? "yummy" : "sad";
}

console.log(solution());
