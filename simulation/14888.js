"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

function solution() {
  const N = input[0][0];
  const numbers = input[1];
  const [add, sub, mul, div] = input[2];

  let max = -Infinity;
  let min = Infinity;

  // index: 다음에 연산할 숫자의 인덱스
  // current: 현재까지 누적된 계산 결과
  function dfs(index, current, plus, minus, multiply, divide) {
    // 모든 숫자를 다 사용했을 때 최댓값, 최솟값 갱신 후 종료
    if (index === N) {
      max = Math.max(max, current);
      min = Math.min(min, current);
      return;
    }

    const nextNum = numbers[index];

    // 남은 연산자가 있으면 각각의 연산을 수행하며 재귀 호출
    if (plus > 0)
      dfs(index + 1, current + nextNum, plus - 1, minus, multiply, divide);
    if (minus > 0)
      dfs(index + 1, current - nextNum, plus, minus - 1, multiply, divide);
    if (multiply > 0)
      dfs(index + 1, current * nextNum, plus, minus, multiply - 1, divide);
    if (divide > 0)
      dfs(
        index + 1,
        Math.trunc(current / nextNum),
        plus,
        minus,
        multiply,
        divide - 1,
      );
  }

  // 첫 번째 숫자(numbers[0])부터 출발, 인덱스는 1부터 시작
  dfs(1, numbers[0], add, sub, mul, div);

  // -0 처리 및 결과 출력
  return `${max === 0 ? 0 : max}\n${min === 0 ? 0 : min}`;
}

console.log(solution());
