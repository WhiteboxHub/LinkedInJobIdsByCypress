// cypress.config.js

// Import the appendToJSONFile function from the tasks file
const fs = require('fs');

// Task to append data to a JSON file
const appendToJSONFile = ({ filePath, data }) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, fileData) => {
      if (err) {
        if (err.code === 'ENOENT') {
          // If file does not exist, create it with the initial data
          fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8', (err) => {
            if (err) reject(err);
            else resolve(null);
          });
        } else {
          reject(err);
        }
      } else {
        // If file exists, parse existing data and append new data
        const json = JSON.parse(fileData);
        const newData = json.concat(data); // Assuming data is an array
        fs.writeFile(filePath, JSON.stringify(newData, null, 2), 'utf8', (err) => {
          if (err) reject(err);
          else resolve(null);
        });
      }
    });
  });
};

module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      // Register the appendToJSONFile task
      on('task', {
        appendToJSONFile
      });
      return config;
    },
    pageLoadTimeout: 600000, // Increase the page load timeout to 300 seconds
    defaultCommandTimeout: 60000, // Increase the default command timeout to 30 seconds
  }
};
