"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));
const [N, M] = input[0];

function solution() {
  let arr = Array.from({ length: N + 1 }, (v, i) => i);
  for (let i = 1; i < input.length; i++) {
    const [begin, end, mid] = input[i];
    const front = [];
    const tail = [];
    for (let j = 0; j <= N; j++) {
      const cur = arr[j];
      if (j < begin) {
        front.push(cur);
      } else if (begin <= j && j < mid) {
        tail.push(cur);
      } else if (mid <= j && j < end) {
        front.push(cur);
      } else if (j === end) {
        front.push(cur);
        front.push(...tail);
      } else {
        front.push(cur);
      }
    }
    arr = front;
  }

  arr.splice(0, 1);
  return arr.join(" ");
}

console.log(solution());
