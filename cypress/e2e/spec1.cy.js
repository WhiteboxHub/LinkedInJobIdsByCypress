describe("LinkedIn Job Application Form", () => {
    let jobIds; // Declare jobIds variable to store the loaded job IDs
  
    before(() => {
      // Log in to LinkedIn
      cy.visit("https://www.linkedin.com/login");
      cy.get("#username").type(Cypress.env("linkedin_username"));
      cy.get("#password").type(Cypress.env("linkedin_password") + "{Enter}");
  
      // Wait for login to complete
      cy.wait(10000);
  
      // Load the JSON file
      cy.readFile(`cypress/results/${Cypress.env("jsonFileName")}`).then((data) => {
        jobIds = data;
    });
      
    });
  
    it("applies for a job using Easy Apply", () => {
      // Wait for the home page to load
      cy.wait(3000);
  
      // Iterate through each job ID
      jobIds.forEach((jobId) => {
        // Log each job ID to the console
        cy.log(`Processing Job ID: ${jobId}`);
  
        // Visit the LinkedIn job URL for each job ID
        cy.visit(`https://www.linkedin.com/jobs/view/${jobId}`);
  
        // Wait for the job page to load
        cy.wait(3000);
  
      
    
        // Start the Easy Apply process
        cy.get(".jobs-apply-button--top-card").first().click().wait(5000);
  
        // Fill out the application form
        cy.get("body").then(($body) => {
          if ($body.find(".artdeco-text-input--input").length > 0) {
            cy.get(".artdeco-text-input--input").first().click().wait(5000);
          } else {
            cy.get(".artdeco-text-input--input").eq(2).click().wait(5000);
          }
        });
  
        // Scroll to the bottom and click "Next"
        cy.get(".artdeco-button--primary").first().scrollIntoView().click().wait(6000);
        cy.get(".artdeco-button--primary").first().click().wait(5000);
  
        // Fill out additional fields
        // Check if the question about disability is present
cy.get('[data-test-form-builder-radio-button-form-component="true"]').should('be.visible').then(($element) => {
    const questionText = $element.text();
    if (questionText.includes('disability')) {
        // Click "No" if the question is about disability
        cy.get('[data-test-form-builder-radio-button-form-component="true"][id*="no"]').click();
    } else {
        // Click "Yes" if the question is not about disability
        cy.get('[data-test-form-builder-radio-button-form-component="true"][id*="yes"]').click();
    }
  });
  
  cy.get('select[data-test-text-entity-list-form-select]').then(selectElement => {
    const isDisabilityQuestion = selectElement.text().includes("disability");
  
    if (isDisabilityQuestion) {
        cy.wrap(selectElement).select("No"); // Select "No" for disability question
    } else {
        cy.wrap(selectElement).select("Yes"); // Select "Yes" for non-disability question
    }
  });
  
  cy.get(".artdeco-text-input--input").each(($input) => {
    cy.wrap($input).clear().type("4");
  });
        // Click on "Review" or "Next"
        cy.get('button:contains("Review"), button:contains("Next")').first().click().then(() => {
          cy.get(".jobs-easy-apply-modal__content").scrollTo("bottom").wait(5000);
          cy.contains("Submit").click().wait(5000);
          cy.get(".artdeco-modal__dismiss").click().wait(4000);
          cy.get(".job-card-container__action").first().click();
        });
      });
    });
});
