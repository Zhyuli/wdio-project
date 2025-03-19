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

    // log.info("Clearing input fields...");
    // await LoginPage.inputUsername.clearValue();
    // await LoginPage.inputPassword.clearValue();
    const selectAllKey = process.platform === "darwin" ? "Meta" : "Control";

    log.info("Clearing input fields...");
    await LoginPage.inputUsername.click();
    await browser.keys([selectAllKey, "a"]);
    await browser.keys("Backspace");

    log.info("Clearing password field...");
    await LoginPage.inputPassword.click();
    await browser.keys([selectAllKey, "a"]);
    await browser.keys("Backspace");


    await browser.waitUntil(
      async () => (await LoginPage.inputUsername.getValue()).trim() === "" &&
                 (await LoginPage.inputPassword.getValue()).trim() === "",
      {
        timeout: 5000,
        timeoutMsg: "Expected username and password fields to be empty, but they weren't",
      }
    );

    let usernameAfterClear = await LoginPage.inputUsername.getValue();
    let passwordAfterClear = await LoginPage.inputPassword.getValue();
    
    log.info(`Username field after clearing: "${usernameAfterClear}"`);
    log.info(`Password field after clearing: "${passwordAfterClear}"`);

    expect(usernameAfterClear).toBe("");
    expect(passwordAfterClear).toBe("");

    log.info("Clicking the login button...");
    await LoginPage.btnSubmit.click();

    log.info("Waiting for the error message...");
    await LoginPage.errMsg.waitForExist({ timeout: 5000 });

    // log.info("Verifying that the error message exists...");
    // await expect(LoginPage.errMsg).toBeExisting();
    log.info("Checking error message text...");
    const errorMsgText = await LoginPage.errMsg.getText();
    log.info(`Actual error message received: "${errorMsgText}"`);

    log.info("Checking error message text...");
    await expect(LoginPage.errMsg).toHaveText(
      "Epic sadface: Username is required"
    );
    log.info("Error message successfully validated!");
  });

  it("UC-2:Test Login form with credentials by passing Username", async () => {
    log.info("Entering valid username...");
    await LoginPage.inputUsername.setValue("standard_user");
    log.info("Entering invalid password...");
    await LoginPage.inputPassword.setValue("secret_sauce1");

    const selectAllKey = process.platform === "darwin" ? "Meta" : "Control";

    log.info("Clearing password field...");
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
    log.info(`Password field after clearing:", ${afterClear}`);
    expect(afterClear).toBe("");

    log.info("Clicking the login button...");
    await LoginPage.btnSubmit.waitForClickable({ timeout: 5000 });
    await LoginPage.btnSubmit.click();

    log.info("Waiting for the error message to appear...");
    await LoginPage.errMsg.waitForExist({ timeout: 5000 });
    await expect(LoginPage.errMsg).toHaveText(
      "Epic sadface: Password is required"
    );
    log.info("Error message successfully validated!");
  });
  acceptedUsernames.map((username) =>
    it(`UC-3: Test Login with accepted usernames: ${username}`, async () => {
      log.info(`Srarting login test for user: '${username}'`);

      await LoginPage.inputUsername.setValue(username);
      await LoginPage.inputPassword.setValue("secret_sauce");
      
      log.info("Clicking the login button...");
      await LoginPage.btnSubmit.click();
      
      log.info("Waiting for the dashboard to load...");
      await DashboardPage.title.waitForExist({ timeout: 5000 });

      const titleText = await DashboardPage.title.getText();
      log.info(`Verifying dashboard title: '${titleText}'`)
      expect(titleText).toBe("Swag Labs");

      console.log(`User: ${username} was successfully logged!`);

    })
  );
});
