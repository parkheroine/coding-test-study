"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" "));

const [N, time, price] = input[0];
const daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function solution() {
  const map = new Map();
  const resultMap = new Map();
  const [bDate, bTime] = time.split("/");
  const [bh, bm] = bTime.split(":");

  const base = Number(bDate) * 24 * 60 + Number(bh) * 60 + Number(bm);

  for (let i = 1; i < input.length; i++) {
    const [date, time, item, name] = input[i];
    const key = `${name}-${item}`;
    const [y, m, d] = date.split("-").map(Number);
    const [hh, mm] = time.split(":").map(Number);
    let totalDays = d - 1;
    for (let i = 1; i < m; i++) {
      totalDays += daysInMonth[i];
    }
    const totalMin = totalDays * 24 * 60 + hh * 60 + mm;

    if (map.has(key)) {
      const prev = map.get(key);
      const delay = totalMin - prev - base;
      if (delay > 0) {
        resultMap.set(name, (resultMap.get(name) || 0) + delay * Number(price));
      }
      map.delete(key);
    } else {
      map.set(key, totalMin);
    }
  }

  const result = [...resultMap];

  if (result.length === 0) return -1;

  result.sort((a, b) => a[0].localeCompare(b[0]));

  return result.map((item) => item.join(" ")).join("\n");
}

console.log(solution());
