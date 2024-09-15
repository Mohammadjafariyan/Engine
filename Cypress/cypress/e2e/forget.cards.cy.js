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

it('my forget card list list ', () => {

    cy.getAuthToken().then((authToken) => {
        // Make authenticated requests to secure API using the obtained token

        cy.log('authToken:' + authToken.value);
        cy.log( authToken.value);
        cy.request({
            method: 'GET',
            url: '/api/ForgetCards/get?from&to&userId&onlyNotAccepted=true',
            headers: {
                Authorization: `Bearer ${authToken.value}`,
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
it('get users', () => {

    cy.getAuthToken().then((authToken) => {
        // Make authenticated requests to secure API using the obtained token

        cy.log('authToken:' + authToken.value);
        cy.log( authToken.value);
        cy.request({
            method: 'GET',
            url: '/api/Users/get',
            headers: {
                Authorization: `Bearer ${authToken.value}`,
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
it('get users with filter', () => {

    cy.getAuthToken().then((authToken) => {
        // Make authenticated requests to secure API using the obtained token

        cy.log('authToken:' + authToken.value);
        cy.log( authToken.value);
        cy.request({
            method: 'GET',
            url: '/api/ForgetCards/get?from=1401/11/15&to=1402/11/15&userId=undefined&onlyNotAccepted=true',
            headers: {
                Authorization: `Bearer ${authToken.value}`,
            }
        }).then((response) => {
            // Your assertions for the secure API response
            expect(response.status).to.eq(200);
            expect(response.body.Status).to.eq(0);
           // expect(response.body.result).to.be.an('array').that.has.length.greaterThan(0);
            expect(response.body.result).to.be.an('array');
            
            cy.log(JSON.stringify(response.body))
            // ... other assertions
        });
    });
  
})

  
})


