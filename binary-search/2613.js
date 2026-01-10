"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(/\s+/)
  .map(Number);

function solution() {
  const N = input[0];
  const M = input[1];
  const beads = input.slice(2);

  let left = Math.max(...beads); // 그룹 합의 최솟값: 가장 큰 구슬 하나
  let right = beads.reduce((a, b) => a + b, 0); // 그룹 합의 최댓값: 모든 구슬의 합
  let resultValue = right;

  // 1. 파라메트릭 서치: 그룹 합의 최댓값 중 '최솟값' 찾기
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (canDivide(beads, N, M, mid)) {
      resultValue = mid;
      right = mid - 1; // 더 작은 최댓값을 찾으러 왼쪽으로
      //최대한 작은 값을 찾도록 return/break 안함
    } else {
      left = mid + 1; // 불가능하면 합의 한계를 키워야 함
    }
  }

  // 2. 결과 출력 구성 (M개 그룹 강제 맞추기)
  const resultCounts = [];
  let currentSum = 0;
  let currentCount = 0;
  let remainingBeads = N;
  let groupsToMake = M;

  for (let i = 0; i < N; i++) {
    currentSum += beads[i];
    currentCount++;
    remainingBeads--;

    // 조건 1: 다음 구슬을 더했을 때 resultValue를 넘는가?
    // 조건 2: 남은 구슬들을 하나씩만 배정해도 남은 그룹 수를 채울 수 없는가?
    //-> 그룹 마무리
    if (
      (i + 1 < N && currentSum + beads[i + 1] > resultValue) ||
      remainingBeads < groupsToMake
    ) {
      resultCounts.push(currentCount);
      currentSum = 0;
      currentCount = 0;
      groupsToMake--;
    }
  }
  // 마지막 그룹은 남은 개수를 다 넣었으므로 루프가 끝나면 push가 완료됨

  return `${resultValue}\n${resultCounts.join(" ")}`;
}

// 결정 함수: mid라는 한계를 가질 때 M개 이하의 그룹으로 나눌 수 있는가?
function canDivide(beads, N, M, limit) {
  let groups = 1;
  let sum = 0;

  for (let i = 0; i < N; i++) {
    if (sum + beads[i] > limit) {
      groups++;
      sum = beads[i];
    } else {
      sum += beads[i];
    }
  }

  return groups <= M;
}

console.log(solution());
