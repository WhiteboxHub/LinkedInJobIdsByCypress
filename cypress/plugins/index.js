// cypress/plugins/index.js

const fs = require('fs');
const path = require('path');

module.exports = (on, config) => {
  on('task', {
    writeToFile({ keyword, jobIds }) {
      const dir = path.join(__dirname, '..', '..', 'jsonFiles');
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }

      const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format
      const fileName = `${keyword}_${currentDate}.json`;
      const filePath = path.join(dir, fileName);
      const content = {
        keyword: keyword,
        date: currentDate,
        jobIds: Array.from(jobIds)
      };

      try {
        fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
        return { success: true }; // Return success status
      } catch (error) {
        return { success: false, error: error.message }; // Return error status
      }
    }
  });
};
