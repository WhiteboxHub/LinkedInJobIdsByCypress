







// Cypress.Commands.add("captureJobIdsAndPaginate", (jobids) => {
//     const paginateAndCapture = () => {
//         // Capture job IDs on the current page
//         captureJobIds();

//         // Scroll to the bottom to load more job listings
//         cy.get('.jobs-search-results-list').scrollIntoView();

//         // Wait for job listings to load
//         cy.wait(2000); // Adjust the wait time as needed

//         // Click through pagination
//         cy.get('.artdeco-pagination__pages--number').find('li').each(($li) => {
//             cy.wrap($li).click().wait(5000); // Click on the li element
//             cy.get('.jobs-search-results-list').scrollIntoView(); // Scroll the .jobs-search-results-list element into view
//             captureJobIds();
//         });
//     };

//     const captureJobIds = () => {
//         cy.get('[data-job-id]').each(($job) => {
//             const jobId = $job.attr('data-job-id');
//             if (jobId) {
//                 jobids.add(jobId);
//                 // Log the jobId
//                 cy.log("Captured jobId:", jobId);
//             }
//         });
//     };

//     // Start capturing and paginating
//     paginateAndCapture();
// });

// describe("LinkedIn Job Search Test", () => {
//     it("searches for jobs", () => {
//         const username = Cypress.env("linkedin_username");
//         const password = Cypress.env("linkedin_password");
//         const keyword = Cypress.env("keyword") || "software engineer";
//         let jobids = new Set();

//         cy.session('login', () => {
//             cy.visit('https://www.linkedin.com/login')
//             cy.get('#username').type(username);
//             cy.get('#password').type(password);
//             cy.get('button[type="submit"]').click().wait(10000);
//         });
//         cy.visit('https://www.linkedin.com');
//         cy.visit(`https://www.linkedin.com/jobs/search/?keywords=${keyword}`, { timeout: 60000 });
        
//         cy.get('.jobs-search-results-list').scrollIntoView().then(() => {
//             cy.captureJobIdsAndPaginate(jobids).then(() => {
//                 // After pagination is complete, log the unique job IDs
//                 cy.log("Unique job IDs:", Array.from(jobids).join(", "));
                
//                 // Write job IDs to a JSON file
//                 const data = Array.from(jobids);
//                 cy.task('writeToFile', { filePath: 'cypress/results/jobids.json', data }).then(() => {
//                     cy.log("Job IDs written to jobids.json file");
//                 }).catch((error) => {
//                     cy.log("Error writing job IDs to file:", error);
//                 });
//             });
//         });
//     });

//     Cypress.on('uncaught:exception', (err, runnable) => {
//         cy.log("Uncaught exception:", err);
//         return false;
//     });

//     Cypress.on('fail', (error, runnable) => {
//         cy.log("Error occurred:", error);
//         throw error;
//     });
// });















// Cypress.Commands.add("captureJobIdsAndPaginate", (jobids, startArray) => {
//     const visitPage = (start) => {
//         const keyword = Cypress.env("keyword") || "software engineer";
//         const url = `https://www.linkedin.com/jobs/search/?keywords=${keyword}&start=${start}`;

//         cy.visit(url, { timeout: 100000 }).then(() => {
//             cy.log(`Visited page with start=${start}`);
//             cy.get('.jobs-search-results-list', { timeout: 10000 }).scrollIntoView();
            
//             // Wait for pagination elements to become available
//             cy.get('.artdeco-pagination__pages--number', { timeout: 10000 });

//             captureJobIds().then(() => {
//                 if (startArray.length > 0) {
//                     const nextStart = startArray.shift();
//                     if (nextStart !== undefined) {
//                         visitPage(nextStart);
//                     } else {
//                         cy.log("All pages visited");

//                         // Write job IDs to a JSON file after all pages are visited
//                         const data = Array.from(jobids);
//                         const filePath = 'cypress/results/jobIds.json';
//                         cy.task('writeToFile', { filePath, data }).then(() => {
//                             cy.log("Job IDs written to jobids.json file");
//                         }).catch((error) => {
//                             cy.log("Error writing job IDs to file:", error);
//                         });
//                     }
//                 } else {
//                     cy.log("All pages visited");
//                 }
//             });
//         });
//     };

//     const captureJobIds = () => {
     
//         return cy.get('[data-job-id]').each(($job) => {
//             const jobId = $job.attr('data-job-id');
//             if (jobId) {
//                 jobids.add(jobId);
//                 cy.log(`Captured jobId: ${jobId}`);
//             }
//         }).then(() => {
//             cy.log(`Total job IDs captured so far: ${jobids.size}`);
//         });
//     };

//     // Start the pagination
//     const initialStart = startArray.shift();
//     if (initialStart !== undefined) {
//         visitPage(initialStart);
//     }
// });

// describe("LinkedIn Job Search Test", () => {
//     it("searches for jobs", () => {
//         const username = Cypress.env("linkedin_username");
//         const password = Cypress.env("linkedin_password");
//         const startArray = Array.from({ length: 40 }, (_, i) => i * 25); // Generate an array of start values from 0 to 975

//         let jobids = new Set();

//         cy.session('login', () => {
//             cy.visit('https://www.linkedin.com/login');
//             cy.get('#username').type(username);
//             cy.get('#password').type(password);
//             cy.get('button[type="submit"]').click().wait(10000);
//         });

//         cy.captureJobIdsAndPaginate(jobids, startArray).then(() => {
//             // After pagination is complete, log the unique job IDs
//             cy.log("Unique job IDs:", Array.from(jobids).join(", "));
//         });
//     });

//     Cypress.on('uncaught:exception', (err, runnable) => {
//         cy.log("Uncaught exception:", err);
// //         return false;
// //     });

// //     Cypress.on('fail', (error, runnable) => {
// //         cy.log("Error occurred:", error);
// //         throw error;
// //     });
// // });







// // Custom Cypress command to capture job IDs and paginate through job search results
// Cypress.Commands.add("captureJobIdsAndPaginate", (jobids) => {
//     // Function to capture job IDs from the current page
//     const captureJobIds = () => {
//         cy.get('[data-job-id]').each(($job) => {
//             const jobId = $job.attr('data-job-id');
//             if (jobId) {
//                 jobids.add(jobId);
//                 cy.log("Captured jobId:", jobId);
//             }
//         });
//     };

//     // Function to paginate through search results recursively
//     const captureLoop = (start = 0) => {
//         const url = `https://www.linkedin.com/jobs/search/?keywords=${keyword}&start=${start}`;

//         cy.visit(url, { timeout: 300000 }).then(() => {
//             cy.log(`Visited page with start=${start}`);
//             cy.get('.jobs-search-results-list', { timeout: 30000 }).scrollIntoView();
            
//             captureJobIds();

//             // Check if there are more pages to visit
//             cy.get('.artdeco-pagination__pages--number', { timeout: 30000 }).then($pagination => {
//                 const lastPageNum = parseInt($pagination.last().text(), 10);
//                 if (start < (lastPageNum - 1) * 25) { // Adjust as per the pagination logic
//                     captureLoop(start + 25);
//                 } else {
//                     cy.log("All pages visited");
//                 }
//             });
//         });
//     };

//     captureLoop();
// });


// describe("LinkedIn Job Search Test", () => {
//     it("searches for jobs and captures job IDs", () => {
//         const username = Cypress.env("linkedin_username");
//         const password = Cypress.env("linkedin_password");
//         const keyword = Cypress.env("keyword") || "software engineer";
        
//         let jobids = new Set();

//         // Log in before performing job search
//         cy.session('login', () => {
//             cy.visit('https://www.linkedin.com/login');
//             cy.get('#username').type(username);
//             cy.get('#password').type(password);
//             cy.get('button[type="submit"]').click();
//             // Ensure the page has fully loaded before proceeding
//             cy.url().should('include', '/feed');
//         });

//         // Navigate to job search page and capture job IDs
//         cy.visit(`https://www.linkedin.com/jobs/search/?keywords=${keyword}`, { timeout: 300000 });
        
//         // Ensure the job search results list is visible
//         cy.get('.jobs-search-results-list', { timeout: 30000 }).should('be.visible');

//         // Capture job IDs and paginate
//         cy.captureJobIdsAndPaginate(jobids).then(() => {
//             const data = Array.from(jobids);
//             cy.log("Final captured jobIds:", data); // Log captured job IDs before writing to file
//             cy.task('writeToFile', { filePath: 'cypress/results/jobids.json', data }).then(() => {
//                 cy.log("Job IDs have been written to the JSON file.");
//             });
//         });
//     });

//     // Cypress error handling
//     Cypress.on('uncaught:exception', (err, runnable) => {
//         cy.log("Uncaught exception:", err);
//         return false;
//     });

//     Cypress.on('fail', (error, runnable) => {
//         cy.log("Error occurred:", error);
//         throw error;
//     });
// });





















// Cypress.Commands.add("captureJobIdsAndPaginate", (startArray) => {
//     const jobids = new Set();
    
//     const visitPage = (start) => {
//         const keyword = Cypress.env("keyword") || "software engineer";
//         const url = `https://www.linkedin.com/jobs/search/?keywords=${keyword}&start=${start}`;

//         cy.visit(url, { timeout: 100000 }).then(() => {
//             cy.log(`Visited page with start=${start}`);
//             cy.get('.jobs-search-results-list', { timeout: 10000 }).scrollIntoView();

//             // Wait for pagination elements to become available
//             cy.get('.artdeco-pagination__pages--number', { timeout: 10000 }).then(() => {
//                 captureJobIds(start);
//                 if (startArray.length > 0) {
//                     const nextStart = startArray.shift();
//                     if (nextStart !== undefined) {
//                         visitPage(nextStart); // Visit the next page
//                     }
//                 }
//             });
//         });
//     };

//     const captureJobIds = (start) => {
//         cy.get('[data-job-id]').each(($job) => {
//             const jobId = $job.attr('data-job-id');
//             if (jobId) {
//                 jobids.add(jobId);
//                 cy.log(`Captured jobId: ${jobId}`);
//             }
//         }).then(() => {
//             cy.log(`Total job IDs captured on page with start=${start}: ${Array.from(jobids).join(", ")}`);
//             const data = Array.from(jobids);
//             const filePath = 'cypress/results/jobIds.json';
//             cy.task('appendToJSONFile', { filePath, data }).then(() => {
//                 cy.log("Job IDs appended to jobIds.json file");
//             }).catch((error) => {
//                 cy.log("Error appending job IDs to file:", error);
//             });
//         });
//     };

//     // Ensure startArray is an array
//     if (Array.isArray(startArray)) {
//         // Start the pagination
//         const initialStart = startArray.shift();
//         if (initialStart !== undefined) {
//             visitPage(initialStart);
//         }
//     } else {
//         cy.log("Error: startArray is not an array");
//     }
// });

// describe("LinkedIn Job Search Test", () => {
//     it("searches for jobs", () => {
//         const username = Cypress.env("linkedin_username");
//         const password = Cypress.env("linkedin_password");
//         const startArray = Array.from({ length: 40 }, (_, i) => i * 25); // Generate an array of start values from 0 to 975

//         cy.session('login', () => {
//             cy.visit('https://www.linkedin.com/login');
//             cy.get('#username').type(username);
//             cy.get('#password').type(password);
//             cy.get('button[type="submit"]').click();
//             cy.url().should('include', '/feed'); // Ensure login was successful
//         });

    
//             cy.captureJobIdsAndPaginate(startArray);
        
//     });

//     Cypress.on('uncaught:exception', (err, runnable) => {
//         cy.log("Uncaught exception:", err);
//         return false;
//     });

//     Cypress.on('fail', (error, runnable) => {
//         cy.log("Error occurred:", error);
//         throw error;
//     });
// });





























/// <reference types="cypress" />

const keyword = Cypress.env("keyword") || "software engineer";

describe("LinkedIn Job Search Test", () => {
  Cypress.Commands.add("login", () => {
    const username = Cypress.env("linkedin_username");
    const password = Cypress.env("linkedin_password");

    cy.visit('https://www.linkedin.com/login');
    cy.get('#username').type(username);
    cy.get('#password').type(password);
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/feed');
  });

  Cypress.Commands.add("captureJobIdsAndPaginate", (jobids, keyword) => {
    const captureJobIds = () => {
      cy.get('[data-job-id]').each(($job) => {
        const jobId = $job.attr('data-job-id');
        if (jobId) {
          jobids.add(jobId);
          cy.log("Captured jobId:", jobId);
        }
      }).then(() => {
        cy.log("Captured jobIds on this page:", Array.from(jobids));
      });
    };

    const visitPage = (start, retryCount = 3) => {
      const url = `https://www.linkedin.com/jobs/search/?keywords=${keyword}&start=${start}`;

      cy.visit(url, { timeout: 200000 }).then(() => {
        cy.log(`Visiting URL: ${url}`);
        cy.get('body').should('be.visible');

        cy.get('body').then(($body) => {
          if ($body.find('.jobs-search-results-list').length > 0) {
            cy.log('Found .jobs-search-results-list element');
            cy.get('.jobs-search-results-list').scrollTo('bottom').wait(5000);
            captureJobIds();
            cy.log(`Visited page with start=${start}`);

            if (start < 1000) {
              visitPage(start + 25);
            } else {
              cy.log("All pages visited");
            }
          } else {
            if (retryCount > 0) {
              cy.log(`.jobs-search-results-list element not found on the page. Retrying... (${retryCount} retries left)`);
              cy.wait(10000); // Wait before retrying
              visitPage(start, retryCount - 1);
            } else {
              cy.log(`Failed to load URL: ${url} after multiple attempts.`);
            }
          }
        });
      });
    };

    visitPage(0);
  });

  before(() => {
    cy.session('login', () => {
      cy.login();
    });
  });

  it("searches for jobs and captures job IDs", () => {
    let jobids = new Set();

    cy.captureJobIdsAndPaginate(jobids, keyword).then(() => {
      const data = Array.from(jobids);
      cy.log("Final captured jobIds:", data);
      cy.task('appendToJSONFile', { filePath: '/Users/innovapathinc/Desktop/LinkedInJobIdsByCypress/cypress/results/jobIds.json', data })
        .then(() => {
          cy.log("Job IDs have been written to the JSON file.");
        });
    });
  });

  Cypress.on('uncaught:exception', (err, runnable) => {
    cy.log("Uncaught exception:", err);
    return false;
  });

  Cypress.on('fail', (error, runnable) => {
    cy.log("Error occurred:", error);
    throw error;
  });
});
