"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);
input.splice(0, 1);

function solution() {
  let l = 0;
  let r = 0;
  const moneys = [];
  for (let i = 0; i < input.length; i++) {
    const money = +input[i];
    moneys.push(money);
    if (input[i] > l) l = money;
    r += money;
  }

  let k = moneys[N - 1];

  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    let result = 0;
    let leftMoney = 0;
    for (let i = 0; i < moneys.length; i++) {
      if (moneys[i] > leftMoney) {
        result++;
        leftMoney = mid - moneys[i];
      } else {
        leftMoney -= moneys[i];
      }
    }

    if (result > M) {
      l = mid + 1;
    } else {
      k = mid;
      r = mid - 1;
    }
  }

  return k;
}

console.log(solution());
