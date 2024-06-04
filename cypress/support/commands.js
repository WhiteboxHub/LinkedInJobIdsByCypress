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
// cypress/support/commands.js
// Add this line to ensure custom commands are loaded
import './commands';
// cypress/support/commands.js
// Custom command to login to LinkedIn
Cypress.Commands.add('loginLinkedIn', () => {
  const username = Cypress.env("linkedin_username");
  const password = Cypress.env("linkedin_password");

  cy.visit('https://www.linkedin.com/login');
  cy.get('#username').type(username);
  cy.get('#password').type(password);
  cy.get('button[type="submit"]').click();
});
const jobIds = new Set();

// Custom Cypress command to capture job IDs from elements with data-job-id attribute
Cypress.Commands.add('captureJobIds', () => {
  cy.get('[data-job-id]').each(($job) => {
    const jobId = $job.attr('data-job-id');
    if (jobId) {
      cy.log("Captured jobId:", jobId);
      jobIds.add(jobId);
    }
  }).then(() => {
    cy.task('appendToJSONFile', { filePath: 'results/jobIds.json', data: Array.from(jobIds) });
  });
});
