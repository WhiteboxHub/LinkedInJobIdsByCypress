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
    cy.readFile(`cypress/results/${Cypress.env("jsonFileName")}`).then(
      (data) => {
        jobIds = data;
      }
    );
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
      cy.get("body").then(($body) => {
        if ($body.find(".artdeco-inline-feedback__message").length > 0) {
          cy.log("Feedback message found, skipping to the next job ID");
        } else {
          cy.get(".jobs-apply-button--top-card").first().click().wait(5000);

          // Start the Easy Apply process
          cy.get(".jobs-apply-button--top-card").first().click();
          cy.wait(5000);

          cy.get("body").then(($body) => {
            if ($body.find(".artdeco-text-input--input").length > 0) {
              cy.get(".artdeco-text-input--input")
                .first()
                .click()
                .clear()
                .type("9876543210")
                .wait(5000);
            } else {
              cy.get(".artdeco-text-input--input").eq(2).click().wait(5000);
            }
          });

          cy.get(".artdeco-button--primary").first().scrollIntoView().click();
          cy.wait(3000);
          cy.get(".artdeco-button--primary").first().click();

          cy.wait(3000);
          // Handling input fields
          cy.get("body").then(($body) => {
            if ($body.find(".artdeco-text-input--input").length > 0) {
              cy.get(".artdeco-text-input--input").each(($input) => {
                cy.wrap($input).clear().type("4");
              });
              cy.wait(3000);
            }

            // Check if radio buttons exist
            if (
              $body.find("label[data-test-text-selectable-option__label]")
                .length > 0
            ) {
              // Iterate over each radio button label
              cy.get("label[data-test-text-selectable-option__label]").each(
                ($label) => {
                  const labelText = $label.text().toLowerCase();
                  const forValue = $label.attr("for");
                  const escapedForValue = CSS.escape(forValue); // Escape special characters in ID

                  cy.log(`Label Text: ${labelText}`);
                  cy.log(`For Value: ${forValue}`);
                  cy.log(`Escaped For Value: ${escapedForValue}`);

                  // Handle radio button click based on label text
                  if (labelText.includes("disability")) {
                    cy.get(`#${escapedForValue}[value="no"]`, {
                      timeout: 10000,
                    }).then(($el) => {
                      if ($el.length > 0 && $el.is(":visible")) {
                        cy.wrap($el).click({ force: true });
                        cy.log(`Clicked on #${escapedForValue}[value="no"]`);
                      } else {
                        cy.log(
                          `#${escapedForValue}[value="no"] is not visible or does not exist`
                        );
                      }
                    });
                  } else {
                    cy.get(`#${escapedForValue}[value="yes"]`, {
                      timeout: 10000,
                    }).then(($el) => {
                      if ($el.length > 0 && $el.is(":visible")) {
                        cy.wrap($el).click({ force: true });
                        cy.log(`Clicked on #${escapedForValue}[value="yes"]`);
                      } else {
                        cy.log(
                          `#${escapedForValue}[value="yes"] is not visible or does not exist`
                        );
                      }
                    });
                  }
                }
              );
            } else {
              cy.log("No radio buttons found");
              // Handle the case where no radio buttons are found
            }

            if (
              $body.find("select[data-test-text-entity-list-form-select]")
                .length > 0
            ) {
              cy.get("select[data-test-text-entity-list-form-select]").each(
                ($select) => {
                  const isDisabilityQuestion = $select
                    .text()
                    .toLowerCase()
                    .includes("disability");
                  if (isDisabilityQuestion) {
                    cy.wrap($select).select("No"); // Select "No" for disability question
                  } else {
                    cy.wrap($select).select("Yes"); // Select "Yes" for non-disability question
                  }
                }
              );
            }
          });

          cy.get("body").then(($body) => {
            if (
              $body.find('button:contains("Review"), button:contains("Next")')
                .length > 0
            ) {
              cy.get('button:contains("Review"), button:contains("Next")').each(
                ($button) => {
                  // Perform any actions you need on each button here
                  cy.wrap($button).click(); // Example action: click each button
                }
              );
            } else {
              cy.get(".jobs-easy-apply-modal__content").scrollTo("bottom");
              cy.wait(5000);
              cy.contains("Submit").click();
              cy.wait(5000);
              cy.get(".artdeco-modal__dismiss").click();
              cy.wait(4000);
              cy.get(".job-card-container__action").first().click();
            }
          });

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
            });
        }
      });
    });
  });
});
