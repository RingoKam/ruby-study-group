const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

exports.ask = (question) => {
  return new Promise((resolve) => {
    readline.question(`${question}\n`, (answer) => {
      console.log("\n");
      resolve(answer);
    });
  });
};

exports.lineBreak = () => {
  console.log("==============================");
};
