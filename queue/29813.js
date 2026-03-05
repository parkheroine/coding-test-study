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
  let students = [];
  for (let i = 1; i < input.length; i++) {
    students.push({
      name: input[i][0],
      num: Number(input[i][1]),
    });
  }

  let currentIndex = 0;

  while (students.length > 1) {
    const leader = students[currentIndex];
    students.splice(currentIndex, 1);

    const skip = leader.num - 1;
    currentIndex = (currentIndex + skip) % students.length;

    students.splice(currentIndex, 1);

    if (currentIndex >= students.length) {
      currentIndex = 0;
    }
  }

  return students[0].name;
}

console.log(solution());
