"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

function solution() {
  const inputStr = input[0];
  const targetStr = input[1];
  const stack = [];

  for (let i = 0; i < inputStr.length; i++) {
    if (inputStr[i] === targetStr[targetStr.length - 1]) {
      //stack 뒤에서 앞으로 글자 검사
      //틀린 게 하나라도 있으면 stack에 push, 킵고잉
      //다 맞으면 targetStr pop, 주의: 0 ~ targetStr.length-2 (1개 문자 아직 넣지 않은 상태)
      let isValid = true;
      for (let j = 1; j < targetStr.length; j++) {
        if (stack[stack.length - j] === targetStr[targetStr.length - j - 1]) {
          continue;
        } else {
          isValid = false;
        }
      }
      if (isValid) {
        for (let j = 1; j < targetStr.length; j++) {
          stack.pop();
        }
      } else {
        stack.push(inputStr[i]);
      }
    } else {
      stack.push(inputStr[i]);
    }
  }

  const result = stack.join("");
  return result ? result : "FRULA";
}

console.log(solution());
