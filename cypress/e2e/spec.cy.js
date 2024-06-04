
// describe("LinkedIn Job Search Test", () => {
//   beforeEach(() => {
//     cy.session('login', () => {
//       cy.loginLinkedIn();
//     });
//     cy.visit('https://www.linkedin.com/jobs');
//   });

//   it("Searches for jobs by keyword and location", () => {
//     cy.fixture('test-data.json').then((searchData) => {
//       searchData.forEach(data => {
//         // const url = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(data.keyword)}&location=${encodeURIComponent(data.location)}&origin=JOB_SEARCH_PAGE_LOCATION_AUTOCOMPLETE`;
//         // cy.visit(url);
//         cy.get(".search-global-typeahead__collapsed-search-button-text").click().wait(3000)
//         .type(`${data.keyword} {Enter}`);
//         cy.wait(3000);
//         cy.get('.jobs-search-box__text-input.jobs-search-box__text-input--with-clear').click().clear()
//         .type(data.location, { delay: 100 });
//         cy.get('.jobs-search-results-list').scrollTo('bottom').wait(5000);

//         // Pagination logic
//         cy.get('button[aria-current="true"]').then(($button) => {
//           const ariaLabel = $button.attr('aria-label');
//           const currentPageNumber = parseInt(ariaLabel.split(' ')[1]);
//           const nextPageNumber = currentPageNumber + 1;

//           function navigateToNextPage() {
//             cy.get('.jobs-search-results-list').scrollTo('bottom').wait(5000);
//             cy.get(`[aria-label="Page ${nextPageNumber}"]`).click();
//             cy.get('button[aria-current="true"]').should('have.attr', 'aria-label', `Page ${nextPageNumber}`);
//           }

//           // Pagination loop
//           cy.get('button[aria-current="true"]').should('have.attr', 'aria-label', `Page ${nextPageNumber}`).then(($button) => {
//             if ($button.length === 1) {
//               navigateToNextPage();
//             }
//           });
//         });
//       });
//     });
//   });
// });

// Cypress.on('uncaught:exception', (err, runnable) => {
//   if (err.message.includes('Could not find module email-confirmation/utils/email-confirmation-helpers imported from feed/routes/index')) {
//     return false;
//   }
//   cy.log("Uncaught exception:", err);
//   return false;
// });




// describe("LinkedIn Job Search Test", () => {
//   beforeEach(() => {
//     cy.session('login', () => {
//       cy.loginLinkedIn();
//     });
//     cy.visit('https://www.linkedin.com/jobs');
//   });

//   it("Searches for jobs by keyword and location", () => {
//     cy.fixture('test-data.json').then((searchData) => {
//       searchData.forEach(data => {
        // cy.get(".jobs-search-global-typeahead__input").click().wait(3000)
        //   .type(`${data.keyword} {Enter}`);
        // cy.wait(3000);
        // // cy.get('.jobs-search-box__text-input jobs-search-box__ghost-text-input').click().clear()
        //   // .type(data.location, { delay: 100 });
        // cy.get('.jobs-search-results-list').scrollTo('bottom').wait(5000);

//         function goToNextPage() {
//           cy.get('.jobs-search-results-list').scrollTo('bottom').wait(5000);
//           cy.get('button[aria-label*="Page"]').then(($buttons) => {
//             const currentPageButton = $buttons.filter('[aria-current="true"]');
//             const currentPageNumber = parseInt(currentPageButton.attr('aria-label').split(' ')[1]);
//             const nextPageButton = $buttons.filter(`[aria-label="Page ${currentPageNumber + 1}"]`);
//             cy.captureJobIds()
//             if (nextPageButton.length) {
//               nextPageButton.click();
//               cy.get('button[aria-current="true"]').should('have.attr', 'aria-label', `Page ${currentPageNumber + 1}`);
//               goToNextPage();
//             }
//           });
//         }

//         // Start pagination
//         goToNextPage();
//       });
//     });
//   });
// });

// Cypress.on('uncaught:exception', (err, runnable) => {
//   if (err.message.includes('Could not find module email-confirmation/utils/email-confirmation-helpers imported from feed/routes/index')) {
//     return false;
//   }
//   cy.log("Uncaught exception:", err);
//   return false;
// });




describe("LinkedIn Job Search Test", () => {
  beforeEach(() => {
    cy.session('login', () => {
      cy.loginLinkedIn();
    });
    cy.visit('https://www.linkedin.com/jobs');
  });

  it("Searches for jobs by keyword and location", () => {
    cy.fixture('test-data.json').then((searchData) => {
      searchData.forEach(data => {
        cy.get(".jobs-search-global-typeahead__input").click().wait(3000)
        .type(`${data.keyword} {Enter}`);
      cy.wait(3000);
      // cy.get('.jobs-search-box__text-input jobs-search-box__ghost-text-input').click().clear()
        // .type(data.location, { delay: 100 });
      cy.get('.jobs-search-results-list').scrollTo('bottom').wait(5000);
        // cy.get(".search-global-typeahead__collapsed-search-button-text").click().wait(3000)
        //   .type(`${data.keyword} {Enter}`);
        // cy.wait(3000);
        // cy.get('.jobs-search-box__text-input.jobs-search-box__text-input--with-clear').click().clear()
        //   .type(data.location, { delay: 100 });
        // cy.get('.jobs-search-results-list').scrollTo('bottom').wait(5000);

        function goToNextPage() {
          cy.captureJobIds();
          cy.get('.jobs-search-results-list').scrollTo('bottom').wait(5000);
          cy.get('button[aria-label*="Page"]').then(($buttons) => {
            const currentPageButton = $buttons.filter('[aria-current="true"]');
            const currentPageNumber = parseInt(currentPageButton.attr('aria-label').split(' ')[1]);
            const nextPageButton = $buttons.filter(`[aria-label="Page ${currentPageNumber + 1}"]`);

            if (nextPageButton.length) {
              nextPageButton.click();
              cy.get('button[aria-current="true"]').should('have.attr', 'aria-label', `Page ${currentPageNumber + 1}`);
              goToNextPage();
            }
          });
        }

        // Start pagination
        goToNextPage();
      });
    });
  });
});

Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('Could not find module email-confirmation/utils/email-confirmation-helpers imported from feed/routes/index')) {
    return false;
  }
  cy.log("Uncaught exception:", err);
  return false;
});
