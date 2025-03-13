 Task Description
Objective

Automate login form testing for https://www.saucedemo.com/ using WebdriverIO with Chrome. Ensure logging, parallel execution, and parameterized testing.

Test Cases

UC-1: Login with Empty Credentials

Enter any username and password.
Clear both fields.
Click "Login".
Validate error: "Username is required".

UC-2: Login with Only Username

Enter any username.
Enter password, then clear it.
Click "Login".
Validate error: "Password is required".

UC-3: Login with Accepted Credentials

Use valid usernames from the Accepted Username List.
Enter password: "secret_sauce".
Click "Login".
Verify dashboard title: "Swag Labs".

Requirements

Test Automation Tool: WebdriverIO
Browser: Chrome
Locators: XPath
Pattern: Page Object Model (POM)
Assertions: WebdriverIO Expect Assertions
Logging: Enable log tracking
Parallel Execution: Run tests concurrently
Data Provider: Parameterize tests with multiple usernames
Additional Notes

Tests run only in Chrome.
Logs must capture key test actions.
README.md should include this task description.