"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

//플루이드 워셜
function solution() {
  const [N, M, T] = input[0].split(" ").map(Number);

  // 1. 거리 배열 초기화 (무한대로 채우기)
  const dist = Array.from({ length: N + 1 }, () => Array(N + 1).fill(Infinity));

  // 자기 자신으로 가는 비용은 0
  for (let i = 1; i <= N; i++) dist[i][i] = 0;

  // 2. 간선 정보 입력
  for (let i = 1; i <= M; i++) {
    const [u, v, h] = input[i].split(" ").map(Number);
    // 동일한 경로에 여러 간선이 있을 수 있으므로 최솟값 유지
    dist[u][v] = Math.min(dist[u][v], h);
  }

  // 3. 플로이드-워셜 (Min-Max Path 변형)
  // k: 거쳐가는 노드 (가장 중요! 가장 바깥쪽 for문)
  for (let k = 1; k <= N; k++) {
    for (let i = 1; i <= N; i++) {
      for (let j = 1; j <= N; j++) {
        // i -> k 경로의 최대 허들과 k -> j 경로의 최대 허들 중 큰 값이 '경로의 값'
        // 그 값들 중 최소가 되는 경로를 선택함
        const currentMaxHurdle = Math.max(dist[i][k], dist[k][j]);

        if (dist[i][j] > currentMaxHurdle) {
          dist[i][j] = currentMaxHurdle;
        }
      }
    }
  }

  // 4. 질문(Query) 처리
  const results = [];
  for (let i = M + 1; i < M + 1 + T; i++) {
    const [start, end] = input[i].split(" ").map(Number);
    const answer = dist[start][end];
    results.push(answer === Infinity ? -1 : answer);
  }

  console.log(results.join("\n"));
}

//다익스트라
class MinHeap {
  constructor() {
    this.store = [];
  }
  get size() {
    return this.store.length;
  }

  push(value) {
    this.store.push(value);
    let i = this.store.length - 1;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.store[p][1] < this.store[i][1]) break;
      [this.store[p], this.store[i]] = [this.store[i], this.store[p]];
      i = p;
    }
  }

  pop() {
    if (this.size === 1) return this.store.pop();
    if (this.size === 0) return null;
    const top = this.store[0];
    this.store[0] = this.store.pop();
    let i = 0;
    while (true) {
      const l = i * 2 + 1;
      const r = i * 2 + 2;
      let s = i;
      if (l < this.size && this.store[l][1] < this.store[s][1]) s = l;
      if (r < this.size && this.store[r][1] < this.store[s][1]) s = r;
      if (s === i) break;
      [this.store[s], this.store[i]] = [this.store[i], this.store[s]];
      i = s;
    }
    return top;
  }
}

function solution() {
  const [N, M, T] = input[0].split(" ").map(Number);
  const graph = Array.from({ length: N + 1 }, () => []);

  for (let i = 1; i <= M; i++) {
    const [u, v, h] = input[i].split(" ").map(Number);
    graph[u].push([v, h]); // 만약 양방향이라면 graph[v].push([u, h]) 추가
  }

  // 모든 시작점에 대해 미리 구해두기 (N번 다익스트라)
  const allPairsDist = Array.from({ length: N + 1 }, () =>
    Array(N + 1).fill(Infinity),
  );

  for (let startNode = 1; startNode <= N; startNode++) {
    const pq = new MinHeap();
    pq.push([startNode, 0]);
    allPairsDist[startNode][startNode] = 0;

    while (pq.size) {
      const [cur, h] = pq.pop();
      if (h > allPairsDist[startNode][cur]) continue;

      for (const [next, nh] of graph[cur]) {
        const nextMax = Math.max(h, nh);
        if (allPairsDist[startNode][next] > nextMax) {
          allPairsDist[startNode][next] = nextMax;
          pq.push([next, nextMax]);
        }
      }
    }
  }

  // 질문은 O(1)로 처리
  const results = [];
  let queryStart = M + 1;
  for (let i = queryStart; i < queryStart + T; i++) {
    const [S, E] = input[i].split(" ").map(Number);
    const res = allPairsDist[S][E];
    results.push(res === Infinity ? -1 : res);
  }

  return results.join("\n");
}

console.log(solution());
