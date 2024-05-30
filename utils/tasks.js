const fs = require('fs');

// Define the appendToJSONFile task
const appendToJSONFile = ({ filePath, data }) => {
    return new Promise((resolve, reject) => {
        fs.appendFile(filePath, JSON.stringify(data), (error) => {
            if (error) {
                reject(error); // Reject the promise if an error occurs
            } else {
                resolve(); // Resolve the promise if operation is successful
            }
        });
    });
};

// Export the appendToJSONFile task
module.exports = {
    appendToJSONFile
};
