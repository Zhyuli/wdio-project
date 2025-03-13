const { $ } = require("@wdio/globals");
const Page = require("./page");


class DashboardPage extends Page {
  get title() {
    return $("//div[@class='app_logo']");
  }
}

module.exports = new DashboardPage();
