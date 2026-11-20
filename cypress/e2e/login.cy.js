import {user, password} from '../fixtures/user.json'

describe('Login with all test users', () => {
    user.forEach((user) => {
        it(`Login with ${user.username}`, () => {
            cy.login(user.username, password)
            cy.url().should('include', '/inventory.html')
        })      
    })
});
describe('Login page: Login form validation', () => {
    it('Valid username and valid password', () => {
        cy.login('standard_user', 'secret_sauce');
        cy.url().should('include', '/inventory.html')
    })
    it('Valid username and invalid password', () => {
        cy.login('standard_user', 'test')
        cy.contains('Epic sadface: Username and password do not match any user in this service').should('be.visible')
    })
    it('Invalid username and valid password', () => {
        cy.login('test', 'secret_sauce')
        cy.contains('Epic sadface: Username and password do not match any user in this service').should('be.visible')
    })
    it('Invalid username and invalid password', () => {
        cy.login('test', 'test');
        cy.contains('Epic sadface: Username and password do not match any user in this service').should('be.visible')
    })
    it('Valid username and empty password', () => {
        cy.login('standard_user', null)
        cy.contains('Epic sadface: Password is required').should('be.visible')
    })
    it('Empty username and valid password', () => {
        cy.login(null, 'secret_sauce')
        cy.contains('Epic sadface: Username is required').should('be.visible')
    })
    it('Empty username and empty password', () => {
        cy.login(null, null)
        cy.contains('Epic sadface: Username is required').should('be.visible')
    })
    it('Password field is masked', () => {
        cy.visit('/')
        cy.get('#user-name').should('have.attr', 'type', 'text')
        cy.get('#password').should('have.attr', 'type', 'password')
        
    })
})