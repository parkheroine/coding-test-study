const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const nums = input[1].split(" ").map((v) => +v);
const targetNums = input[3].split(" ").map((v) => +v);
nums.sort((a, b) => a - b);

function solutionWithBinarySearch() {
  const result = [];

  const binarySearch = (target) => {
    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
      const midIndex = Math.floor((right + left) / 2);
      const mid = nums[midIndex];
      if (mid === target) return 1;
      else if (mid < target) {
        left = midIndex + 1;
      } else {
        right = midIndex - 1;
      }
    }
    return 0;
  };

  for (const target of targetNums) {
    result.push(binarySearch(target));
  }
  return result.join("\n");
}

function solutionWithSet() {
  const set = new Set(nums);
  const result = [];

  for (const target of targetNums) {
    result.push(set.has(target) ? 1 : 0);
  }
  return result.join("\n");
}

console.log(solutionWithSet());
