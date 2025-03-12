const { expect } = require("@wdio/globals");
const LoginPage = require("../pageobjects/login.page");
// const SecurePage = require('../pageobjects/secure.page')

describe("Login Form Validation", () => {
  it("should show error when trying to login with empty credentials", async () => {
    await LoginPage.open();
// UI-1
    await LoginPage.inputUsername.setValue("user1");
    await LoginPage.inputPassword.setValue("pass1");

    await LoginPage.inputUsername.clearValue();
    await LoginPage.inputPassword.clearValue();

    await LoginPage.btnSubmit.click();

    await LoginPage.errMsg.waitForExist({ timeout: 5000 });
    await expect(LoginPage.errMsg).toBeExisting();
    await expect(LoginPage.errMsg).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });
});

