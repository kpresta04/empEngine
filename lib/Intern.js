const Employee = require("./Employee");

module.exports = class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email);
    this.school = school;
    this.image = "../assets/student.png";
    this.lastKey = `School: ${this.school}`;
  }
  getSchool() {
    return this.school;
  }
  getRole() {
    return "Intern";
  }
};
