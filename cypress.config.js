const { appendToJSONFile } = require('./utils/tasks');

module.exports = {
    e2e: {
        setupNodeEvents(on, config) {
            on('task', {
                appendToJSONFile
            });
            return config;
        },
        pageLoadTimeout: 600000,
        defaultCommandTimeout: 60000,
    }
};
