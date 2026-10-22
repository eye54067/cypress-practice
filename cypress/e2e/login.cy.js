import {user, password} from '../fixtures/user.json'

describe('Login page: which test user can login successfully', () => {
    user.forEach((user) => {
        it(`Login with ${user.username}`, () => {
            cy.visit('https://www.saucedemo.com/')
            cy.get('#user-name').type(user.username)
            cy.get('#password').type(password)
            cy.get('#login-button').click()
            cy.url().should('include', '/inventory.html')
        })
    })
});