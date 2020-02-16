const inquirer = require("inquirer"),
  Intern = require("./lib/Intern"),
  Engineer = require("./lib/Engineer"),
  Manager = require("./lib/Manager"),
  fs = require("fs");

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

  async function makeObj() {
    if (role === "Engineer") {
      const github = await userQuery("What is your github username?");
      return new Engineer(empName, id, email, github);
    } else if (role === "Manager") {
      const officeNum = await userQuery("What is your office number?");
      return new Manager(empName, id, email, officeNum);
    } else {
      const schoolName = await userQuery("What is the name of your school?");
      return new Intern(empName, id, email, schoolName);
    }
  }

  const empName = await userQuery("What is your name?");
  const role = await getRole();
  const email = await userQuery("What is your email?");
  const id = await userQuery("What is your company ID?");

  let newObj = await makeObj();
  //   console.log(newObj);

  let lastKey;
  if (role === "Engineer") {
    lastKey = "Github: ";
  } else if (role === "Intern") {
    lastKey = "School: ";
  } else {
    lastKey = "Office number: ";
  }

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

  if (newObj.getRole === "Engineer") {
    newObjFunc = newObj.getGithub();
  }

  let cardHTML = `<div class="card my-1 mx-2" style="width: 18rem;">
  <div
    class="card-body"
    style="background-color: rgb(250, 234, 234);"
  >
    <div class="titleRow">
     <h2 class="card-title">
    ${newObj.name}
  </h2>
  <h2>${newObj.getRole()}</h2>
  </div>
  
  <p class="card-text my-2">
  ID: ${newObj.id}
</p>
<hr />
<p>Email: ${newObj.email}</p>
<hr />
<p>${lastKey}${lastVal}</p>
  </div>
  </div>`;

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
      }
      #headerRow {
        color: white;
        background-color: rgb(184, 52, 52);
        height: 8em;
      }
      #headerRow h1 {
        padding-top: 1em;
      }
      .col {
        display: flex;
        margin: 4em;
      }
      .titleRow {
        color: white;
        background-color: #3d7bff;
        padding: 1em;
      }
    </style>
  </head>
  <body>
    <div class="container-fluid text-center">
      <div class=" text-center" id="headerRow">
        <h1 class="text-center">My Team</h1>
      </div>
      <div class="row">
        <div class="col justify-content-center" id="cardCol">${cardHTML}
          

        
          
          <!-- card col ends -->
        </div>
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

  fs.writeFile("output.html", pageHTML, "utf8", err => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
  //   console.log(newObj);
  //   console.log(cardHTML);
}
main();
