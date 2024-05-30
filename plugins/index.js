// const fs = require('fs');
// const path = require('path');

// module.exports = (on, config) => {
//   on('task', {
//     writeToFile({ filePath, data }) {
//       const fullPath = path.join(__dirname, '..', '..', filePath);

//       // Ensure the directory exists
//       const dir = path.dirname(fullPath);
//       if (!fs.existsSync(dir)) {
//         fs.mkdirSync(dir, { recursive: true });
//       }

//       // Write the data to the file
//       fs.writeFileSync(fullPath, JSON.stringify(data, null, 2), 'utf8');
//       return null;
//     }
//   });
// };

const fs = require('fs');
const path = require('path');

module.exports = (on, config) => {
    on('task', {
        writeToFile({ filePath, data }) {
            return new Promise((resolve, reject) => {
                fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(null);
                });
            });
        }
    });
};
