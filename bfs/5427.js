"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

class Queue {
  constructor() {
    this.store = {};
    this.front = 0;
    this.rear = 0;
  }

  get size() {
    return this.rear - this.front;
  }

  push(value) {
    this.store[this.rear++] = value;
  }

  pop() {
    if (this.size === 0) return -1;
    const temp = this.store[this.front];
    delete this.store[this.front];
    this.front++;

    if (this.front === this.rear) {
      this.front = 0;
      this.rear = 0;
    }

    return temp;
  }
}

function solution() {
  const T = Number(input[0]);
  const result = [];
  let index = 0;
  index++;

  const dy = [1, -1, 0, 0];
  const dx = [0, 0, -1, 1];

  for (let i = 0; i < T; i++) {
    const [W, H] = input[index].split(" ").map(Number);
    index++;
    const graph = Array.from({ length: H }, () => Array(W).fill("."));
    let start = [];
    const fires = new Queue();
    for (let j = 0; j < H; j++) {
      for (let k = 0; k < W; k++) {
        const char = input[j + index][k];
        if (char === ".") {
          //빈공간
        } else {
          if (char === "@") {
            start = [j, k];
          }
          if (char === "*") {
            fires.push([j, k]);
          }
          graph[j][k] = char;
        }
      }
    }

    const queue = new Queue();
    queue.push([...start, 0]);

    let flag = false;
    while (queue.size) {
      let curFireCount = fires.size;
      for (let f = 0; f < curFireCount; f++) {
        const [fy, fx] = fires.pop();
        for (let l = 0; l < 4; l++) {
          const ny = fy + dy[l];
          const nx = fx + dx[l];
          if (
            0 <= ny &&
            ny < H &&
            0 <= nx &&
            nx < W &&
            (graph[ny][nx] === "." || graph === "@")
          ) {
            fires.push([ny, nx]);
            graph[ny][nx] = "*";
          }
        }
      }
      let curUserCount = queue.size;
      for (let u = 0; u < curUserCount; u++) {
        const [y, x, depth] = queue.pop();
        if (y === 0 || y === H - 1 || x === 0 || x === W - 1) {
          result.push(depth + 1);
          flag = true;
          break;
        }
        for (let l = 0; l < 4; l++) {
          const ny = y + dy[l];
          const nx = x + dx[l];
          if (0 <= ny && ny < H && 0 <= nx && nx < W && graph[ny][nx] === ".") {
            queue.push([ny, nx, depth + 1]);
            graph[ny][nx] = "@";
          }
        }
      }
      if (flag) {
        break;
      }
    }
    if (!flag) {
      result.push("IMPOSSIBLE");
    }
    index += H;
  }

  return result.join("\n");
}

console.log(solution());
