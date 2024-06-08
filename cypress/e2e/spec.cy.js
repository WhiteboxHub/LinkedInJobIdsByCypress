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
        const { keyword, location } = data; 
        cy.get(".jobs-search-global-typeahead__input")
          .click()
          .clear()
          .type(`${data.keyword} {Enter}`)
          .wait(6000);
        cy.get('.jobs-search-box__text-input').eq(3).click()
          .clear()
          .type(`${data.location} {Enter}`)
       .wait(10000);
       //cy.get('.artdeco-button.artdeco-button--2.artdeco-button--secondary').eq(1).click({ force: true }).wait(5000);
       cy.get('button.artdeco-pill.artdeco-pill--slate.artdeco-pill--2.artdeco-pill--choice[aria-label="Easy Apply filter."]').click({ force: true }).wait(5000);
          function goToNextPage() {
      
            cy.get('.jobs-search-results-list').scrollTo('bottom').wait(5000);
            cy.captureJobIds(data.keyword);
            cy.writeJobIdsToFile(data.keyword);
            cy.get('button[aria-label*="Page"]').then(($buttons) => {
              const currentPageButton = $buttons.filter('[aria-current="true"]');
              const currentPageNumber = parseInt(currentPageButton.attr('aria-label').split(' ')[1]);
              const nextPageButton = $buttons.filter(`[aria-label="Page ${currentPageNumber + 1}"]`);
  
              if (nextPageButton.length) {
                nextPageButton.click();
                cy.get('button[aria-current="true"]').should('have.attr', 'aria-label', `Page ${currentPageNumber + 1}`);
                goToNextPage();
              }else {
                // Write to file when pagination is completed
                cy.writeJobIdsToFile(data.keyword);
              }
            });
          }
        //cy.writeJobIdsToFile(data.keyword);
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
