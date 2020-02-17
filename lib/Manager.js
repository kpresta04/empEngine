const Employee = require("./Employee");

module.exports = class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
    this.image = "../assets/coffee.png";
    this.lastKey = `Office number: ${this.officeNumber}`;
  }
  getOfficeNumber() {
    return this.officeNumber;
  }

  getRole() {
    return "Manager";
  }
};
