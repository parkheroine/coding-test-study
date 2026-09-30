const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

class MinHeap {
  constructor() {
    this.store = [];
  }

  get size() {
    return this.store.length;
  }

  // [time, cost, node] 형태 -> time 기준 최소 힙
  push(value) {
    this.store.push(value);
    let i = this.store.length - 1;

    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.store[p][0] <= this.store[i][0]) break;
      [this.store[p], this.store[i]] = [this.store[i], this.store[p]];
      i = p;
    }
  }

  pop() {
    if (this.size === 1) return this.store.pop();
    if (this.size === 0) return null;
    const tmp = this.store[0];
    this.store[0] = this.store.pop();
    let i = 0;
    while (true) {
      const l = i * 2 + 1;
      const r = i * 2 + 2;
      let s = i;
      if (l < this.size && this.store[l][0] < this.store[s][0]) s = l;
      if (r < this.size && this.store[r][0] < this.store[s][0]) s = r;
      if (s === i) break;

      [this.store[s], this.store[i]] = [this.store[i], this.store[s]];
      i = s;
    }

    return tmp;
  }
}

function solution() {
  const N = Number(input[0]);
  const [T, M] = input[1].split(" ").map(Number);
  const L = Number(input[2]);

  const graph = Array.from({ length: N + 1 }, () => []);

  // dist[node][cost] = time (해당 cost로 node에 도달하는 최소 시간)
  const dist = Array.from({ length: N + 1 }, () => Array(M + 1).fill(Infinity));

  for (let i = 3; i < 3 + L; i++) {
    const [A, B, time, cost] = input[i].split(" ").map(Number);
    graph[A].push([B, time, cost]);
    graph[B].push([A, time, cost]);
  }

  const pq = new MinHeap();
  // [time, cost, node]
  pq.push([0, 0, 1]);
  dist[1][0] = 0;

  while (pq.size > 0) {
    const [curTime, curCost, cur] = pq.pop();

    if (dist[cur][curCost] < curTime) continue;

    for (const [next, time, cost] of graph[cur]) {
      const nextTime = curTime + time;
      const nextCost = curCost + cost;

      // 제한 조건 초과 시 스킵
      if (nextTime > T || nextCost > M) continue;

      if (dist[next][nextCost] > nextTime) {
        dist[next][nextCost] = nextTime;
        pq.push([nextTime, nextCost, next]);
      }
    }
  }

  // N번 건물에 도달할 수 있는 cost들 중 T 시간 이내인 '최소 비용' 찾기
  let minCost = Infinity;
  for (let c = 0; c <= M; c++) {
    if (dist[N][c] <= T) {
      minCost = Math.min(minCost, c);
      break; // c를 0부터 늘려가므로 처음 발견한 값이 최소 비용!
    }
  }

  return minCost === Infinity ? -1 : minCost;
}

console.log(solution());
