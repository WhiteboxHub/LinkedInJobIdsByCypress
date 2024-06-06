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
