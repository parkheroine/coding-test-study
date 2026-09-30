//지형이동

function solution(land, height) {
  const N = land.length;
  const TOTAL_NODES = N * N;

  // 1. 유니온 파인드 템플릿 (1차원 배열로 관리)
  const parent = Array.from({ length: TOTAL_NODES }, (_, i) => i);

  function find(node) {
    if (parent[node] === node) return node;
    return (parent[node] = find(parent[node]));
  }

  function union(a, b) {
    const rootA = find(a);
    const rootB = find(b);
    if (rootA !== rootB) {
      parent[rootB] = rootA;
      return true;
    }
    return false;
  }

  // 2. 모든 인접한 칸 사이의 간선(Edge) 수집
  const edges = [];
  const dy = [0, 1]; // 오른쪽, 아래쪽만 확인해도 모든 인접 간선 커버 가능!
  const dx = [1, 0];

  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const u = r * N + c; // 2차원 좌표를 1차원 노드 번호로 변환

      for (let d = 0; d < 2; d++) {
        const nr = r + dy[d];
        const nc = c + dx[d];

        if (nr < N && nc < N) {
          const v = nr * N + nc;
          const diff = Math.abs(land[r][c] - land[nr][nc]);

          // height 이하 이동은 비용 0, 초과 이동은 diff가 비용!
          const cost = diff <= height ? 0 : diff;
          edges.push([cost, u, v]);
        }
      }
    }
  }

  // 3. 간선을 비용 오름차순으로 정렬 (크루스칼 핵심!)
  edges.sort((a, b) => a[0] - b[0]);

  // 4. 크루스칼 알고리즘 수행
  let totalCost = 0;
  for (const [cost, u, v] of edges) {
    if (union(u, v)) {
      totalCost += cost;
    }
  }

  return totalCost;
}
