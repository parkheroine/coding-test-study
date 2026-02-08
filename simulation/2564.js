"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));
const [W, H] = input[0];
const [dD, pD] = input[input.length - 1];

function solution() {
  const getDistance = ([dT, pT]) => {
    if (dD === dT) {
      return Math.abs(pD - pT);
    }
    if ((dD === 1 && dT === 2) || (dD === 2 && dT === 1)) {
      //남-북
      return H + Math.min(pD + pT, 2 * W - (pD + pT));
    }
    if ((dD === 3 && dT === 4) || (dD === 4 && dT === 3)) {
      //동-서
      return W + Math.min(pD + pT, 2 * H - (pD + pT));
    }
    if ((dD === 2 && dT === 3) || (dD === 3 && dT === 2)) {
      //남서
      const pSouth = dD === 2 ? pD : pT;
      const pWest = dD === 3 ? pD : pT;
      return pSouth + H - pWest;
    }
    if ((dD === 1 && dT === 4) || (dD === 4 && dT === 1)) {
      //북동
      const pNorth = dD === 1 ? pD : pT;
      const pEast = dD === 4 ? pD : pT;
      return W - pNorth + pEast;
    }
    if ((dD === 2 && dT === 4) || (dD === 4 && dT === 2)) {
      //남동
      const pSouth = dD === 2 ? pD : pT;
      const pEast = dD === 4 ? pD : pT;
      return W - pSouth + H - pEast;
    }
    if ((dD === 1 && dT === 3) || (dD === 3 && dT === 1)) {
      //북서
      const pNorth = dD === 1 ? pD : pT;
      const pWest = dD === 3 ? pD : pT;
      return pNorth + pWest;
    }
  };

  let result = 0;
  for (let i = 2; i < input.length - 1; i++) {
    result += getDistance(input[i]);
  }
  return result;
}

console.log(solution());
