const fs = require('fs');
const path = require('path');

// Ensure directory exists
const ensureDirectoryExistence = (filePath) => {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  fs.mkdirSync(dirname, { recursive: true });
};

// Define the appendToJSONFile task
const appendToJSONFile = ({ filePath, data }) => {
  return new Promise((resolve, reject) => {
    const absolutePath = path.resolve(__dirname, '..', filePath);
    ensureDirectoryExistence(absolutePath);

    fs.readFile(absolutePath, 'utf8', (err, fileData) => {
      if (err) {
        if (err.code === 'ENOENT') {
          fs.writeFile(absolutePath, JSON.stringify(data, null, 2), 'utf8', (err) => {
            if (err) reject(err);
            else resolve(null);
          });
        } else {
          reject(err);
        }
      } else {
        const existingData = JSON.parse(fileData);
        const allData = Array.from(new Set(existingData.concat(data)));
        fs.writeFile(absolutePath, JSON.stringify(allData, null, 2), 'utf8', (err) => {
          if (err) reject(err);
          else resolve(null);
        });
      }
    });
  });
};

// Export the appendToJSONFile task
module.exports = {
  appendToJSONFile
};



