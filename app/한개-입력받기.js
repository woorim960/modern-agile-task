const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", () => {
  const [N] = input[0].split(" ").map(Number);

  let s = "";
  if (N % 2 === 0) {
    // 짝수
    const rest = N / 2;
    for (let i = 0; i < rest; i++) {
      s += "1";
    }
  } else {
    // 홀수
    s += "7";
    if (N >= 3) {
      const rest = (N - 3) / 2;

      for (let i = 0; i < rest; i++) {
        s += "1";
      }
    }
  }

  console.log(s);
});
