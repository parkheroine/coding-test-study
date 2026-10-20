"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map(Number);

function solution() {
  const arr = input;
  const result = [];
  function postorder(start, end) {
    if (start >= end) return;

    const root = arr[start];

    let mid = start + 1;

    while (mid < end && arr[mid] < root) {
      mid++;
    }

    postorder(start + 1, mid);
    postorder(mid, end);
    result.push(root);
  }

  postorder(0, arr.length);

  return result.join("\n");
}

console.log(solution());
