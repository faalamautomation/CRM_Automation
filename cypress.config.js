const { defineConfig } = require("cypress");

module.exports = defineConfig({
  "env":
  {
    "url":"https://www.pipedrive.com",
    "email":"fahad.alamgirrsi@gmail.com",
    "password":"Mountain#5goat"
  },

  reporter:'mochawesome',
  
  reporterOptions: {
    reportDir: 'cypress/results',
    overwrite: true,
    html: true,
    json: false,
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
