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

function solution() {
  const map = new Map();
  const resultMap = new Map();
  const [d, t] = time.split("/");
  const [h, m] = t.split(":");

  const base = parseInt(d) * 24 * 60 + parseInt(h) * 60 + parseInt(m);

  for (let i = 1; i < input.length; i++) {
    const [d, t, item, name] = input[i];
    const key = `${name}-${item}`;
    const value = new Date(d + " " + t).getTime();
    const prev = map.get(key);
    if (prev) {
      map.delete(key);

      const delay = (value - prev) / (1000 * 60) - base;
      if (delay > 0) {
        resultMap.set(name, (resultMap.get(name) ?? 0) + delay * price);
      }
    } else {
      map.set(key, value);
    }
  }

  const result = [...resultMap];

  if (result.length === 0) return -1;

  result.sort((a, b) => a[0].localeCompare(b[0]));

  return result.map((item) => item.join(" ")).join("\n");
}

console.log(solution());
