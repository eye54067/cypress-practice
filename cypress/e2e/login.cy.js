import {user, password} from '../fixtures/user.json'

describe('Login page: which test users can login successfully', () => {
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
describe('Login page: Login form validation', () => {
    it('Valid username and valid password', () => {
        cy.visit('https://www.saucedemo.com/')
        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('secret_sauce')
        cy.get('#login-button').click()
        cy.url().should('include', '/inventory.html')
    })
    it('Valid username and invalid password', () => {
        cy.visit('https://www.saucedemo.com/')
        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('test')
        cy.get('#login-button').click()
        cy.contains('Epic sadface: Username and password do not match any user in this service').should('be.visible')
    })
    it('Invalid username and valid password', () => {
        cy.visit('https://www.saucedemo.com/')
        cy.get('#user-name').type('test')
        cy.get('#password').type('secret_sauce')
        cy.get('#login-button').click()
        cy.contains('Epic sadface: Username and password do not match any user in this service').should('be.visible')
    })
    it('Invalid username and invalid password', () => {
        cy.visit('https://www.saucedemo.com/')
        cy.get('#user-name').type('test')
        cy.get('#password').type('test')
        cy.get('#login-button').click()
        cy.contains('Epic sadface: Username and password do not match any user in this service').should('be.visible')
    })
    it('Valid username and empty password', () => {
        cy.visit('https://www.saucedemo.com/')
        cy.get('#user-name').type('standard_user')
        cy.get('#password').should('be.empty')
        cy.get('#login-button').click()
        cy.contains('Epic sadface: Password is required').should('be.visible')
    })
    it('Empty username and valid password', () => {
        cy.visit('https://www.saucedemo.com/')
        cy.get('#user-name').should('be.empty')
        cy.get('#password').type('secret_sauce')
        cy.get('#login-button').click()
        cy.contains('Epic sadface: Username is required').should('be.visible')
    })
    it('Empty username and empty password', () => {
        cy.visit('https://www.saucedemo.com/')  
        cy.get('#user-name').should('be.empty')
        cy.get('#password').should('be.empty')
        cy.get('#login-button').click()
        cy.contains('Epic sadface: Username is required').should('be.visible')
    })
    it('Password field is masked', () => {
        cy.visit('https://www.saucedemo.com/')
        cy.get('#user-name').should('have.attr', 'type', 'text')
        cy.get('#password').should('have.attr', 'type', 'password')
        
    })
})