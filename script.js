console.time("1-trillion-loop");

let x = 0n; // Use BigInt to avoid integer overflow
for (let i = 0n; i < 1_000_000_000_000n; i++) {
  x += 1n;
}

console.timeEnd("1-trillion-loop");
