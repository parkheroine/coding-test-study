"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map((item) => item.split(":")));

function solution() {
  const result = [];

  const getClockInt = (arr) => Number(arr.join(""));

  const getFormattedTimeStr = (value) => {
    return `${Math.floor(value / 10) === 0 ? "0" + value : value}`;
  };

  for (const [startStrArr, endStrArr] of input) {
    let ans = getClockInt(startStrArr) % 3 === 0 ? 1 : 0;

    if (getClockInt(startStrArr) > getClockInt(endStrArr)) {
      endStrArr[0] = `${Number(endStrArr[0]) + 24}`; // 시간 통일
    }
    while (getClockInt(startStrArr) < getClockInt(endStrArr)) {
      const startNum = startStrArr.map(Number);
      const [sHour, sMin, sSec] = startNum;

      let newSec = sSec + 1;
      let newMin = sMin;
      let newHour = sHour;
      if (newSec === 60) {
        newMin += 1;
        newSec = 0;
      }
      if (newMin === 60) {
        newHour += 1;
        newMin = 0;
      }

      startStrArr[0] = getFormattedTimeStr(newHour);
      startStrArr[1] = getFormattedTimeStr(newMin);
      startStrArr[2] = getFormattedTimeStr(newSec);

      const clockInt = Number(startStrArr.join(""));
      if (clockInt % 3 === 0) {
        ans++;
      }
    }

    result.push(ans);
  }

  return result.join("\n");
}

console.log(solution());
