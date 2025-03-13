const { expect } = require("@wdio/globals");
const LoginPage = require("../pageobjects/login.page");
// const SecurePage = require('../pageobjects/secure.page')

describe("Login Form Validation", () => {
  beforeEach(async () => {
    await LoginPage.open();
  });

  afterEach(async () => {
    await browser.reloadSession();
  });

  it("should show error when trying to login with empty credentials", async () => {
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

  it("should show error when trying to login with empty password", async () => {
    // UI-2
    await LoginPage.inputUsername.setValue("standard_user");
    await LoginPage.inputPassword.setValue("secret_sauce1");

    // const beforeClear = await LoginPage.inputPassword.getValue();
    // console.log("value before cleaning:", beforeClear);
    // expect(beforeClear).toBe("secret_sauce1");

    const selectAllKey = process.platform === "darwin" ? "Meta" : "Control"

    await LoginPage.inputPassword.click();
   await browser.keys([selectAllKey, 'a']);
    await browser.keys('Backspace');

    await browser.waitUntil(
      async () => (await LoginPage.inputPassword.getValue()).trim() === "",
      {
        timeout: 5000,
        timeoutMsg: "Expected password field to be empty, but it wasn't",
      }
    );

    let afterClear = await LoginPage.inputPassword.getValue();
    console.log("value after cleaning:", afterClear);
    expect(afterClear).toBe("");

    await LoginPage.btnSubmit.waitForClickable({ timeout: 5000 });
    await LoginPage.btnSubmit.click();

    await LoginPage.errMsg.waitForExist({ timeout: 5000 });
    await expect(LoginPage.errMsg).toHaveText(
      "Epic sadface: Password is required"
    );
  });
});
