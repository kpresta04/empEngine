const inquirer = require("inquirer");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");

async function main() {
  async function getRole() {
    let roleQuery = await inquirer.prompt({
      type: "checkbox",
      message: "What is your title?",
      name: "role",
      choices: ["Engineer", "Manager", "Intern"]
    });
    return roleQuery.role.toString();
  }
  async function userQuery(message) {
    let uq = await inquirer.prompt({
      message: message,
      name: "result"
    });
    return uq.result;
  }

  async function getCardInfo() {
    if (role === "Engineer") {
      const github = await userQuery("What is your github username?");
      const eng = new Engineer(empName, id, email, github);
      console.log(eng);
    }
  }

  const empName = await userQuery("What is your name?");
  const role = await getRole();
  const email = await userQuery("What is your email?");
  const id = await userQuery("What is your company ID?");

  getCardInfo();
}
main();
