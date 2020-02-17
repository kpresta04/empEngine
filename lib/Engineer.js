const Employee = require("./Employee");

module.exports = class Engineer extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email);
    this.github = github;
    this.image = "../assets/laptop.png";
    this.lastKey = `<a href="https://github.com/${this.github}">Github</a>`;
  }
  getGithub() {
    return this.github;
  }
  getRole() {
    return "Engineer";
  }
};
