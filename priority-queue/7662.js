"use strict";

const readline = require("readline");
const fs = require("fs");
const rl = readline.createInterface({
  input:
    process.platform === "linux"
      ? process.stdin
      : fs.createReadStream("input.txt"),
  output: process.stdout,
  terminal: false,
});

class Heap {
  constructor(compare) {
    this.heap = [];
    this.compare = compare;
  }

  get size() {
    return this.heap.length;
  }

  get min() {
    if (this.size === 0) return null;
    return this.heap[0];
  }
  get max() {
    if (this.size === 0) return null;
    return this.heap[this.size - 1];
  }

  push(value) {
    this.heap.push(value);
    let i = this.heap.length - 1;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.compare(this.heap[p], this.heap[i])) break;
      [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]];
      i = p;
    }
  }

  pop() {
    if (this.size === 1) return this.heap.pop();
    if (this.size === 0) return null;
    const peek = this.heap[0];
    this.heap[0] = this.heap.pop();
    let i = 0;
    while (true) {
      const l = i * 2 + 1;
      const r = i * 2 + 2;
      let s = i;
      if (l < this.size && this.compare(this.heap[l], this.heap[s])) s = l;
      if (r < this.size && this.compare(this.heap[r], this.heap[s])) s = r;
      if (i === s) break;
      [this.heap[i], this.heap[s]] = [this.heap[s], this.heap[i]];
      i = s;
    }
    return peek;
  }

  clean(visited) {
    while (this.size > 0 && visited[this.heap[0][0]]) {
      this.pop();
    }
  }
}

function solution() {
  let index = 0;
  let endLine = 0;

  const maxHeap = new Heap((a, b) => a[1] > b[1]);
  const minHeap = new Heap((a, b) => a[1] < b[1]);
  let visited = new Map();
  const result = [];

  let j = 0;
  rl.on("line", (line) => {
    if (index === 0) {
      index++;
      return;
    }
    if (index > endLine) {
      endLine = Number(line) + index++;
      maxHeap.init();
      minHeap.init();
      visited.clear();
      j = 0;
      return;
    }

    const [command, valueStr] = line.split(" ");
    const value = Number(valueStr);
    if (command === "I") {
      maxHeap.push([j, value]);
      minHeap.push([j, value]);
      visited[j] = false;
    } else if (command === "D") {
      const targetHeap = value === 1 ? maxHeap : minHeap;
      targetHeap.clean(visited);
      if (targetHeap.size > 0) {
        const [id, val] = targetHeap.pop();
        visited[id] = true;
      }
    }

    maxHeap.clean(visited);
    minHeap.clean(visited);
    if (index === endLine) {
      if (maxHeap.size === 0) {
        result.push("EMPTY");
      } else {
        result.push(`${maxHeap.heap[0][1]} ${minHeap.heap[0][1]}`);
      }
    } else {
      j++;
    }
    index++;
  });

  rl.on("close", () => {
    console.log(result.join("\n"));
  });
}

solution();
