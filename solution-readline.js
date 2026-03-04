"use strict";

const readline = require("readline");
const fs = require("fs");
const rl = readline.createInterface({
  input:
    process.platform === "linux"
      ? process.stdin
      : fs.createReadStream("input.txt"),
  output: process.stdout,
  terminal: false,
});

function solution() {
  rl.on("line", (line) => {});

  rl.on("close", () => {
    console.log("solution");
  });
}

solution();
