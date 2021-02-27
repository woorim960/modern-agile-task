const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", () => {
  const T = Number(input.shift());
  for (let i = 0; i < T; i++) {
    const [N, M] = input[0].split(" ").map(Number);
    const arr = input[1].split(" ").map(Number);
    input = input.slice(T - 1);
  }
});
