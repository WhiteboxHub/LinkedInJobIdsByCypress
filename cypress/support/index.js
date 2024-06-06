// Import custom commands
// import './commands';
const fs = require('fs');

module.exports = (on, config) => {
  on('task', {
    writeToFile({ filePath, data }) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
      return null;
    }
  });
};
