//섬 연결하기
function solution(n, costs) {
  costs.sort((a, b) => a[2] - b[2]); //cost 오름차순
  const parent = Array.from({ length: n }, (_, i) => i);

  function find(node) {
    if (parent[node] === node) return node;
    return (parent[node] = find(parent[node]));
  }

  function union(a, b) {
    const rootA = find(a);
    const rootB = find(b);
    if (rootA !== rootB) {
      //부모 다름 사이클X
      parent[rootB] = rootA;
      return true;
    }
    return false;
  }

  let answer = 0;

  for (const [from, to, cost] of costs) {
    if (union(from, to)) {
      answer += cost;
    }
  }

  return answer;
}
