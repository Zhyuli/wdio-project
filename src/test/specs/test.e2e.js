const { expect } = require("@wdio/globals");
const LoginPage = require("../pageobjects/login.page");
const DashboardPage = require('../pageobjects/dashboard.page');
const { acceptedUsernames } = require("../data/usersData");
const log = require("../../utils/logger");

describe("Login Form Validation", () => {
  beforeEach(async () => {
    log.info("Opening the login page...");
    await LoginPage.open();
  });

  afterEach(async () => {
    log.info("Resetting session after test execution...");
    await browser.reloadSession();
  });

  it("UC-1: Test Login form with empty credentials", async () => {
    log.info("Entering invalid credentials...");
    await LoginPage.inputUsername.setValue("user1");
    await LoginPage.inputPassword.setValue("pass1");

    log.info("Clearing input fields...");
    await LoginPage.inputUsername.clearValue();
    await LoginPage.inputPassword.clearValue();

    log.info("Clicking the login button...");
    await LoginPage.btnSubmit.click();

    log.info("Waiting for the error message...");
    await LoginPage.errMsg.waitForExist({ timeout: 5000 });
    log.info("Verifying that the error message exists...");
    await expect(LoginPage.errMsg).toBeExisting();
    log.info("Checking error message text...");
    await expect(LoginPage.errMsg).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );
    log.info("Error message successfully validated!");
  });

  it("UC-2:Test Login form with credentials by passing Username", async () => {
    await LoginPage.inputUsername.setValue("standard_user");
    await LoginPage.inputPassword.setValue("secret_sauce1");

    const selectAllKey = process.platform === "darwin" ? "Meta" : "Control";

    await LoginPage.inputPassword.click();
    await browser.keys([selectAllKey, "a"]);
    await browser.keys("Backspace");

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
  acceptedUsernames.map((username) =>
    it(`UC-3: Test Login with accepted usernames: ${username}`, async () => {
      console.log(`sratring test for user: ${username}`);

      await LoginPage.inputUsername.setValue(username);
      await LoginPage.inputPassword.setValue("secret_sauce");

      await LoginPage.btnSubmit.click();

      await DashboardPage.title.waitForExist({ timeout: 5000 });

      const titleText = await DashboardPage.title.getText();
      expect(titleText).toBe("Swag Labs");

      console.log(`User: ${username} was successfully logged!`);

    })
  );
});
