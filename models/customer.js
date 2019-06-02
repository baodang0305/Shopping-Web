const bcrypt = require('bcrypt');

module.exports = function CustomerModel() {
  this.Username = ""
  this.Password = ""
  this.Name = ""
  this.Address = ""
  this.Phonenumber = 0
  this.Email = ""
  this.signup = function (username, password) {
    this.Password = bcrypt.hashSync(password, bcrypt.getSaltSync(10), null);
    this.Username = username
  }
  this.login = function (username, password) {
    if (this.Username == username) {
      return bcrypt.compareSync(password, this.Password);
    }
    return false
  }
  this.addInfo = function (username, password, name, address, phoneNumber, email) {
    this.Username = username
    this.Password = password
    this.Name = name
    this.Address = address
    this.Phonenumber = phoneNumber
    this.Email = email
  }
}
