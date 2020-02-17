const inquirer = require("inquirer"),
  Intern = require("./lib/Intern"),
  Engineer = require("./lib/Engineer"),
  Manager = require("./lib/Manager"),
  fs = require("fs");

async function main() {
  async function inqValidator(input) {
    if (input === "") {
      return "Invalid input";
    }
    return true;
  }
  async function userQuery(message) {
    let uq = await inquirer.prompt({
      message: message,
      name: "result",
      type: "input",
      validate: inqValidator
    });

    return uq.result;
  }
  let teamCount = await userQuery(
    "How many team members would you like to create?"
  );
  let cardHTMLArray = [];

  for (let i = 0; i < teamCount; i++) {
    async function getRole() {
      let roleQuery = await inquirer.prompt({
        type: "checkbox",
        message: "Enter team member's title",
        name: "role",
        choices: ["Engineer", "Manager", "Intern"]
      });
      return roleQuery.role.toString();
    }

    async function makeObj() {
      if (role === "Engineer") {
        const github = await userQuery("What is their github username?");
        return new Engineer(empName, id, email, github);
      } else if (role === "Manager") {
        const officeNum = await userQuery("What is their office number?");
        return new Manager(empName, id, email, officeNum);
      } else {
        const schoolName = await userQuery("What is the name of their school?");
        return new Intern(empName, id, email, schoolName);
      }
    }

    const empName = await userQuery("What is team member's name?");
    const role = await getRole();
    const email = await userQuery("What is team member's email?");
    const id = await userQuery("What is team member's company ID?");

    let newObj = await makeObj();
    console.log("=====================================");
    function getLastVal() {
      if (newObj.getRole() === "Engineer") {
        return newObj.getGithub();
      } else if (newObj.getRole() === "Intern") {
        return newObj.getSchool();
      } else {
        return newObj.getOfficeNumber();
      }
    }
    let lastVal = getLastVal();

    let lastKey;
    if (role === "Engineer") {
      lastKey = `<a href="https://github.com/${lastVal}">Github</a>`;
    } else if (role === "Intern") {
      lastKey = `School: ${lastVal}`;
    } else {
      lastKey = `Office number: ${lastVal}`;
    }

    let cardHTML = `
    <div class="col justify-content-center">
    <div class="card my-1 mx-auto shadow-lg p-1 rounded" style="width: 80%; max-width: 40em;">
  <div
    class="card-body"
    style="background-color: rgb(250, 234, 234);"
  >
    <div class="titleRow">
     <h1 class="card-title">
    ${newObj.name}
  </h1>
  <div>
  
  <img class="mr-1" style="vertical-align:initial;" src=${newObj.image} >

  <h1 style="display: inline">${newObj.getRole()}</h1>
  </div>
  
  </div>
  
  <p class="card-text my-2">
  ID: ${newObj.id}
</p>
<hr />
<p>Email: <a href="mailto:${newObj.email}">${newObj.email}</a>
</p>
<hr />
<p>${lastKey}</p>
  </div>
  </div>
  </div>`;

    cardHTMLArray.push(cardHTML);
  }

  let pageHTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />

    <!-- Bootstrap CSS -->
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
      integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
      crossorigin="anonymous"
    />

    <title>My Team</title>
    <style>
      body,
      html {
        height: 100%;
        width: 100%;
        position: fixed;
        overflow-y: scroll;
      }
      #headerRow {
        color: white;
        background-color: rgb(122, 7, 7);
        height: 12em;
      }
      #headerRow h1 {
        padding-top: 1em;
        font-size: 4em;

      }
      .col {
        display: flex;
        margin-top: 4em;
      }
      .titleRow {
        color: white;
        background-color: #3d7bff;
        padding: 1em;
      }
      .container-fluid {
        padding-left: 0;
        padding-right: 0;
      }
      p {
        font-size: 1.75em;
      }
    </style>
  </head>
  <body>
    <div class="container-fluid text-center">
      <div class=" text-center" id="headerRow">
        <h1 class="text-center">My Team</h1>
      </div>
      <div class="row">
        ${cardHTMLArray.join("")}
          

        
          
          <!-- card col ends -->
       
      </div>
    </div>
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script
      src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
      integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
      integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
      integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
      crossorigin="anonymous"
    ></script>
  </body>
</html>
`;

  fs.writeFile("./output/output.html", pageHTML, "utf8", err => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
}
main();
