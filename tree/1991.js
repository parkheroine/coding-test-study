"use strict";

const fs = require("fs");
const { text } = require("stream/consumers");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

function solution() {
  const N = Number(input[0]);
  const tree = {};

  for (let i = 0; i < N; i++) {
    const [root, l, r] = input[i + 1].split(" ");
    tree[root] = [l, r];
  }

  const preResult = [];
  function preorder(node) {
    if (node === ".") return;
    const [l, r] = tree[node];

    preResult.push(node);
    preorder(l);
    preorder(r);
  }

  const inResult = [];
  function inorder(node) {
    if (node === ".") return;
    const [l, r] = tree[node];

    inorder(l);
    inResult.push(node);
    inorder(r);
  }

  const postResult = [];
  function postorder(node) {
    if (node === ".") return;
    const [l, r] = tree[node];

    postorder(l);
    postorder(r);
    postResult.push(node);
  }

  preorder("A");
  inorder("A");
  postorder("A");

  const result = [preResult.join(""), inResult.join(""), postResult.join("")];
  return result.join("\n");
}

console.log(solution());
