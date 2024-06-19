module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      // Task to write data to a JSON file
      on('task', {
        writeToFile({ filename, data }) {
          const fixturesFolder = Cypress.config('fixturesFolder') || 'cypress/fixtures'; // Default to 'cypress/fixtures' if not configured
          const directory = path.join(__dirname, '..', fixturesFolder);
          const filePath = path.join(directory, filename);
          fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
          return null;
        }
      });
    },
  },
};
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: process.env.TEST_FILES || "cypress/e2e/**/*.cy.js",
    "experimentalMemoryManagement": true
  },
});
module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // baseUrl: 'https://www.linkedin.com',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    pageLoadTimeout: 120000, // Increase page load timeout to 2 minutes
    experimentalMemoryManagement: true, // Enable experimental memory management
    numTestsKeptInMemory: 5, // Lower the number of tests kept in memory
  },
};
