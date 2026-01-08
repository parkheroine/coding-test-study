"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

class Heap {
  constructor(compare) {
    this.heap = [];
    this.compare = compare;
  }

  get size() {
    return this.heap.length;
  }

  get peek() {
    if (this.heap.length === 0) return -1;
    return this.heap[0];
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
    if (this.size === 0) return -1;
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
      [this.heap[s], this.heap[i]] = [this.heap[i], this.heap[s]];
      i = s;
    }
    return peek;
  }
}

function solution() {
  let i = 0;
  const [N, K] = input[i].split(" ").map(Number);

  const itemList = [];
  const bagList = [];
  const candidateHeap = new Heap((a, b) => {
    return a > b;
  });

  for (i = 1; i < N + 1; i++) {
    const [M, V] = input[i].split(" ").map(Number);
    itemList.push([M, V]);
  }

  for (i; i < input.length; i++) {
    const C = Number(input[i]);
    bagList.push(C);
  }

  itemList.sort((a, b) => a[0] - b[0]);
  bagList.sort((a, b) => a - b);

  let result = 0;
  let itemIndex = 0;
  for (let i = 0; i < bagList.length; i++) {
    const C = bagList[i];

    while (itemIndex < N && itemList[itemIndex][0] <= C) {
      candidateHeap.push(itemList[itemIndex][1]);
      itemIndex++;
    }

    if (candidateHeap.size) {
      const price = candidateHeap.pop();
      result += price;
    }
  }

  return result;
}

console.log(solution());
