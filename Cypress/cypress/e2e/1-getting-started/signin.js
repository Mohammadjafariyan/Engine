/// <reference types="cypress" />

describe('Sign In', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5002/')
  })

  it('sign in ', () => {
   
   
    cy.request({method: 'GET', url: 'http://localhost:5002/api/login/login'}).then((response) =>{

      expect(response.status).to.eq(200)
      
      cy.log(response)

      expect(response.body.name).to.eq("Angel")
    })
  })
  })

