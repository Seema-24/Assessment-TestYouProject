const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Automation-TestYou',
    embeddedScreenshots: true,
    reportDir: 'reports',
    videos: false
  },
  env: {
    signupUrl: 'https://www.testyou.in/SignUp.aspx'
  },
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    baseUrl : 'https://www.testyou.in/Login.aspx'
  },
});
