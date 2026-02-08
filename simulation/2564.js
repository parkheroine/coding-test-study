"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));
const [W, H] = input[0];
const [dir, position] = input[input.length - 1];

function solution() {
  const posList = [];
  //시계방향
  const getPos = (dir, dist) => {
    if (dir === 1) return dist;
    if (dir === 2) return W + H + W - dist;
    if (dir === 3) return W + H + W + H - dist;
    if (dir === 4) return W + dist;
  };

  const dPos = getPos(dir, position);

  for (let i = 2; i < input.length - 1; i++) {
    posList.push(getPos(...input[i]));
  }

  const totalLength = 2 * (W + H);
  let result = 0;
  for (let i = 0; i < posList.length; i++) {
    //시계 방향
    const d1 = Math.abs(posList[i] - dPos);
    //반시계 방향
    const d2 = totalLength - d1;

    result += Math.min(d1, d2);
  }
  return result;
}

console.log(solution());
