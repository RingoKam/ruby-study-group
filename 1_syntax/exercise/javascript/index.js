const fs = require("fs");
const { ask, lineBreak } = require("./helper/console");

const msgList = [];

const title = fs.readFileSync("./helper/ascii.txt", {
  encoding: "utf8",
  flag: "r",
});

console.log(title);
console.log("WELCOME FRIENDS! \n");

(async function () {
  let isContinue = true;

  while (isContinue) {
    const name = await ask("Who are you?");
    const todo = await ask("Whats your msg?");
    msgList.push({ name, todo });
    const answer = (
      await ask("Do you want to leave another msg? (Y/N)?")
    ).toLowerCase();
    isContinue = answer === "y" || answer === "yes";
  }

  msgList.forEach((guest, i) => {
    lineBreak();
    console.log(`${guest.name}:`);
    console.log(`> ${guest.todo}`);
    lineBreak();
  });

  console.log("\nBYE BYE FRIENDS\n");
  process.exit(1);
})();
