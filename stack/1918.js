"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("");

let answer = [];
const stack = [];
for (const charater of input) {
  if (charater === "*" || charater === "/") {
    while (
      stack.length &&
      (stack[stack.length - 1] === "*" || stack[stack.length - 1] === "/")
    ) {
      // 먼저 들어온 * /가 먼저 계산되어야함
      answer.push(stack.pop());
    }
    //그다음에 나 쌓아줌
    stack.push(charater);
  } else if (charater === "+" || charater === "-") {
    //+ - 보다 낮은 우선순위가 없으므로 괄호 전까지 다 꺼냄
    while (stack.length && stack[stack.length - 1] !== "(") {
      answer.push(stack.pop());
    }
    //그다음에 나 쌓아줌
    stack.push(charater);
  } else if (charater === ")") {
    //괄호 마무리 됐을 때 괄호 안에 있는거 다 꺼냄
    while (stack.length && stack[stack.length - 1] !== "(") {
      answer.push(stack.pop());
    }
    // ( 꺼냄
    stack.pop();
  } else if (charater === "(") {
    stack.push(charater);
  } else {
    answer.push(charater);
  }
}
while (stack.length) {
  answer.push(stack.pop());
}
console.log(answer.join(""));
