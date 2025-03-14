const { $ } = require("@wdio/globals");
const Page = require("./page");

class LoginPage extends Page {
  // define selectors using getter methods

  get inputUsername() {
    return $("//input[@id='user-name']");
  }
  get inputPassword() {
    return $("//input[@id='password']");
  }
  get btnSubmit() {
    return $("//input[@id='login-button']");
  }
  get errMsg() {
    return $("//h3[@data-test='error']");
  }

  //Logs in with the given username and password
  async login(username, password) {
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await this.btnSubmit.click();
  }

  //Opens the login page
  async open() {
    await super.open("");
  }
}

module.exports = new LoginPage();
