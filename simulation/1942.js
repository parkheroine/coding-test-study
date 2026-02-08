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
  const result = [];

  for (const [start, end] of input) {
    let [sH, sM, sS] = start.split(":").map(Number);
    const [eH, eM, eS] = end.split(":").map(Number);

    let ans = 0;

    while (true) {
      const timeInt = sH * 10000 + sM * 100 + sS;
      if (timeInt % 3 === 0) ans++;

      if (sH === eH && sM === eM && sS === eS) break;
      sS++;
      if (sS === 60) {
        sS = 0;
        sM += 1;
      }
      if (sM === 60) {
        sM = 0;
        sH += 1;
      }

      if (sH === 24) {
        sH = 0;
      }
    }

    result.push(ans);
  }

  return result.join("\n");
}

console.log(solution());
