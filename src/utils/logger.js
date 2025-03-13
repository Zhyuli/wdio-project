const log4js = require("log4js");

// Logging settings
log4js.configure({
  appenders: {
    file: { type: "file", filename: "logs/test.log" },  // Log-file
    console: { type: "console" } 
  },
  categories: {
    default: { appenders: ["file", "console"], level: "info" }  // Level of logging
  }
});

// Export the logger for use in the tests
const logger = log4js.getLogger();
module.exports = logger;
