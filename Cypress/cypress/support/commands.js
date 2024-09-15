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

Cypress.Commands.add("login", () => {
    // Your login logic here
    cy.request({method: 'POST', url: 'http://localhost:5002/api/login/login',body:{

            encoded: "wQ0IZ0LUCzAlxAd8klLyfMcA2CLcv54SJUpw9tuURXpYVsegCGWVGpqh/0i2ATRB6EpZL662bZg4sD9YKt6vafq2tXKTwLlMfQZxagbJCu87ZlvomUnebldvw6GDRIgis1Viw43yH7kMzonJyF5P/Q==",
            username:'mohammad.jafariyan7@gmail.com',
            password:'mohammad.jafariyan7@gmail.com',

        }}).then((response) =>{

        cy.log(response.statusMessage)
        
        expect(response.status).to.eq(200)

        cy.log(response.body.token)
        //cy.log(JSON.stringify(response))

        cy.setCookie('authToken', response.body.token);
        //  expect(response.body.name).to.eq("Angel")
    })
    
});

Cypress.Commands.add("getAuthToken", () => {
    // Your logic to obtain the authentication token, e.g., from a cookie
    const authToken = cy.getCookie('authToken');
    return authToken;
});