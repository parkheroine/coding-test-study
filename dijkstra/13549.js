"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

const [START, END] = input[0];
const MAX = 100000;

class Deque {
  constructor() {
    this.nodes = {};
    this.head = 0;
    this.tail = 0;
  }
  push(value) {
    this.nodes[this.tail++] = value;
  }
  unshift(value) {
    this.nodes[--this.head] = value;
  }
  shift() {
    if (this.head === this.tail) return null;
    const value = this.nodes[this.head];
    delete this.nodes[this.head++];
    return value;
  }
  get length() {
    return this.tail - this.head;
  }
}

function solution() {
  if (START >= END) {
    return START - END;
  }
  const dists = Array(MAX + 1).fill(Infinity);
  const queue = new Deque();
  queue.push([START, 0]);
  dists[START] = 0;

  while (queue.length) {
    const [cur, time] = queue.shift();
    if (cur === END) {
      return time;
    }
    if (time > dists[cur]) continue;

    const cases = [
      [cur * 2, 0],
      [cur + 1, 1],
      [cur - 1, 1],
    ];

    for (const [newPosition, cost] of cases) {
      if (newPosition < 0 || newPosition > MAX) {
        continue;
      }
      const newTime = time + cost;
      if (dists[newPosition] > newTime) {
        dists[newPosition] = newTime;
        if (cost === 0) {
          queue.unshift([newPosition, time + 0]);
        } else {
          queue.push([newPosition, time + 1]);
        }
      }
    }
  }
}

console.log(solution());
