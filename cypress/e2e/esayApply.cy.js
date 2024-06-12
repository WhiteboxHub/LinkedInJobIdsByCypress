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
      cy.get('body').then(($body) => {
        if ($body.find('.artdeco-inline-feedback__message').length > 0) {
          cy.log('Feedback message found, skipping to the next job ID');
        } else {
      cy.get(".jobs-apply-button--top-card").first().click().wait(5000);

      // Start the Easy Apply process
    cy.get("body").then(($body) => {
      if ($body.find(".artdeco-text-input--input").length > 0) {
        cy.get(".artdeco-text-input--input").first().click().wait(5000);
      } else {
        cy.get(".artdeco-text-input--input").eq(2).click().wait(5000);
      }
    });

    cy.get(".artdeco-button--primary").first().scrollIntoView().click();
    cy.wait(6000);
    cy.get(".artdeco-button--primary").first().click();


    // Check if dropdown exists and handle it
cy.get('[data-test-text-selectable-option="0"] > .t-14').then(dropdown => {
  if (dropdown.length === 1) {
    dropdown.click(); // Click on dropdown option
    cy.get('select[data-test-text-entity-list-form-select]').each(selectElement => {
      cy.wrap(selectElement).then($select => {
        const isDisabilityQuestion = $select.text().includes("disability");
        if (isDisabilityQuestion) {
          cy.wrap($select).select("No"); // Select "No" for disability question
        } else {
          cy.wrap($select).select("Yes"); // Select "Yes" for non-disability question
        }
      });
    });
  }
});

// Input field
cy.get('.artdeco-text-input--input').then($inputFields => {
  if ($inputFields.length === 1) {
    cy.wrap($inputFields).clear().type('4');
  }
});

// Check if radio button exists and handle it
cy.get('input[type="radio"]').then($radioButtons => {
  if ($radioButtons.length === 1) {
    cy.wrap($radioButtons).check({ force: true }); // Force check the radio button
  }
});


    cy.wait(20000);

    cy.get('button:contains("Review"), button:contains("Next")')
      .first()
      .click()
      .then(() => {
        cy.get(".jobs-easy-apply-modal__content").scrollTo("bottom");
        cy.wait(5000);
        cy.contains("Submit").click();
        cy.wait(5000);
        cy.get(".artdeco-modal__dismiss").click();
        cy.wait(4000);
        cy.get(".job-card-container__action").first().click();
      });;
    }
    });
  });
});
});
