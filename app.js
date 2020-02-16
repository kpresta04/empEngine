const inquirer = require("inquirer");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");

async function main() {
  async function getName() {
    let nameQuery = await inquirer.prompt({
      message: "What is your name?",
      name: "name"
    });
    // nameQuery = await nameQuery;
    return nameQuery.name;
  }
  const name = await getName();

  console.log(typeof name);
}
main();
