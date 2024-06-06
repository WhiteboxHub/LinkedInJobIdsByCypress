// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
const path = require('path');

Cypress.Commands.add('loginLinkedIn', () => {
  const username = Cypress.env("linkedin_username");
  const password = Cypress.env("linkedin_password");

  cy.visit('https://www.linkedin.com/login');
  cy.get('#username').type(username);
  cy.get('#password').type(password);
  cy.get('button[type="submit"]').click();
});

const jobIds = {};
Cypress.Commands.add('captureJobIds', (keyword) => {
  cy.get('[data-job-id]').each(($job) => {
    const jobId = $job.attr('data-job-id');
    if (jobId) {
      cy.log("Captured jobId:", jobId);
      if (!Cypress.env('jobIds')) {
        Cypress.env('jobIds', {});
      }
      const jobIds = Cypress.env('jobIds');
      if (!jobIds[keyword]) {
        jobIds[keyword] = new Set();
      }
      jobIds[keyword].add(jobId);
    }
  });
});
// cypress/support/commands.js
Cypress.Commands.add('writeJobIdsToFile', (keyword) => {
  // Generate the filename dynamically using the keyword and the current date
  const currentDate = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format
  const fileName = `${keyword}_${currentDate}.json`;

  // Get the job IDs from the environment variable
  const jobIds = Cypress.env('jobIds');
  
  // Check if jobIds exist for the keyword
  if (jobIds && jobIds[keyword]) {
    // Write the job IDs to the file
    cy.writeFile(`cypress/fixtures/${fileName}`, Array.from(jobIds[keyword]), { timeout: 100000 }); // Increase timeout to 10 seconds

  } else {
    // Handle the case when jobIds don't exist for the keyword
    throw new Error(`No job IDs found for keyword: ${keyword}`);
  }
});
