/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress
/// <reference types="cypress" />

describe('Sign In', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5002/')

      cy.login();

  })

  it('sign in ', () => {

      cy.getAuthToken().then((authToken) => {
          // Make authenticated requests to secure API using the obtained token
          cy.request({
              method: 'GET',
              url: '/api/profile/Get',
              headers: {
                  Authorization: `Bearer ${authToken}`,
              },
          }).then((response) => {
              // Your assertions for the secure API response
              expect(response.status).to.eq(200);
              expect(response.body.Status).to.eq(0);
              
              cy.log(JSON.stringify(response.body))
              // ... other assertions
          });
      });
    
  })
 
 
  it('clock in ', () => {

      cy.getAuthToken().then((authToken) => {
          // Make authenticated requests to secure API using the obtained token
          cy.request({
              method: 'POST',
              url: '/api/Clock/clockIn',
              headers: {
                  Authorization: `Bearer ${authToken}`,
              },
              body:{
                      "datetime": "Jan 30, 2024 5:22:50 PM",
                      "location": [
                          {
                              "accuracy": 1799.999,
                              "latitude": 37.9495288,
                              "longitude": 46.056932,
                              "speed": 0.0,
                              "time": 1706622645725
                          } 
                      ],
                      "Punch": {
                          "point": {
                              "coordinates": [
                                  46.0582977,
                                  37.9492356
                              ],
                              "type": "Point"
                          }
                      },
                      "success": false

              }
          }).then((response) => {
              // Your assertions for the secure API response
              expect(response.status).to.eq(200);
              
              cy.log(JSON.stringify(response.body))
              // ... other assertions
          });
      });
    
  })
    
    
  it('my clock list ', () => {

    cy.getAuthToken().then((authToken) => {
        // Make authenticated requests to secure API using the obtained token
        cy.request({
            method: 'GET',
            url: '/api/Clock/Get',
            headers: {
                Authorization: `Bearer ${authToken}`,
            }
        }).then((response) => {
            // Your assertions for the secure API response
            expect(response.status).to.eq(200);
            expect(response.body.Status).to.eq(0);
            
            cy.log(JSON.stringify(response.body))
            // ... other assertions
        });
    });
  
})



  
})


