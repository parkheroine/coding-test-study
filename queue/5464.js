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
    if (this.size === 0) return null;
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
  const [N, M] = input[0].split(" ").map(Number);
  const parkingCost = Array(N + 1);
  const carArr = Array(M + 1);
  const parking = Array(N + 1).fill(false);
  const parkingMap = new Map();
  const q = new Queue();

  let index = 1;

  for (let i = 0; i < N; i++) {
    parkingCost[i + 1] = Number(input[index + i]);
  }
  index += N;

  for (let i = 0; i < M; i++) {
    carArr[i + 1] = Number(input[index + i]);
  }
  index += M;

  for (let i = index; i < input.length; i++) {
    const carNum = Number(input[i]);

    if (carNum > 0) {
      let parkNum = 0;
      for (let j = 1; j < parking.length; j++) {
        if (!parking[j]) {
          parkNum = j;
          break;
        }
      }

      if (parkNum > 0) {
        parking[parkNum] = true;
        parkingMap.set(carNum, parkNum);
      } else {
        q.push(carNum);
      }
    } else {
      const parkNum = parkingMap.get(-carNum);
      parking[parkNum] = false;

      if (q.size > 0) {
        let parkNum = 0;
        for (let j = 1; j < parking.length; j++) {
          if (!parking[j]) {
            parkNum = j;
            break;
          }
        }
        if (parkNum > 0) {
          const next = q.pop();
          parking[parkNum] = true;
          parkingMap.set(next, parkNum);
        }
      }
    }
  }

  let result = 0;
  parkingMap.forEach((value, key) => {
    result += carArr[key] * parkingCost[value];
  });

  return result;
}

console.log(solution());
