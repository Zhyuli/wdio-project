const { $ } = require("@wdio/globals");
const Page = require("./page");

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
  /**
   * define selectors using getter methods
   */
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
  
// //Clicks the submit button
//   async submit() {
//     await this.btnSubmit.click();
//   }

//   //Clears the specified input field
//   //@param {string} field - "username" or "password"
   
//   async clearField(field) {
//     if (field === "username") {
//       await this.inputUsername.clearValue();
//     } else if (field === "password") {
//       await this.inputPassword.clearValue();
//     } else {
//       throw new Error(`Invalid field: ${field}. Use "username" or "password".`);
//     }
//   }
// //Clears both username and password fields
//   async clearFields() {
//     await this.clearField("username");
//     await this.clearField("password");
//   }
}

module.exports = new LoginPage();
