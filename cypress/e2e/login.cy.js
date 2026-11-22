import {user, password} from '../fixtures/user.json'

describe('Login page: test login with all test users', () => {
    user.forEach((user) => {
        it(`Login with ${user.username}`, () => {
            cy.login(user.username, password)
            cy.url().should('include', '/inventory.html')
            cy.get('.inventory_item_name').should('have.length', 6)
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
    it('Username is case sensitive', () => {
        cy.visit('/')
        cy.get('#user-name').type('Standard_User')
        cy.get('#password').type('secret_sauce')
        cy.get('#login-button').click()
        cy.contains('Epic sadface: Username and password do not match any user in this service').should('be.visible')
    })
    it('Password is case sensitive', () => {
        cy.visit('/')
        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('Secret_Sauce')
        cy.get('#login-button').click()
        cy.contains('Epic sadface: Username and password do not match any user in this service').should('be.visible')
    })
    it('Leading spaces in username', () => {
        cy.visit('/')
        cy.get('#user-name').type(' standard_user')
        cy.get('#password').type('secret_sauce')
        cy.get('#login-button').click()
        cy.contains('Epic sadface: Username and password do not match any user in this service').should('be.visible')
    })
    it('Trailing spaces in username', () => {
        cy.visit('/')
        cy.get('#user-name').type('standard_user ')
        cy.get('#password').type('secret_sauce')
        cy.get('#login-button').click()
        cy.contains('Epic sadface: Username and password do not match any user in this service').should('be.visible')
    })
    it('Error state highlights both fields & Error banner can be dismissed', () => {
        cy.login(null, null)
        cy.get('.input_error.form_input.error').should('have.length', 2)
        cy.get('.error-message-container.error')
        .and('contain.text', 'Epic sadface: Username is required')
        .and('have.descendants', '.error-button')
        .should('be.visible')
        cy.get('.error-button').click()
        cy.get('.error-message-container.error').should('not.exist')
    })
})
describe.only('Login page: Authentication & session', () => {
    it('Login with Enter key', () => {
        cy.visit('/')
        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('secret_sauce')
        cy.get('#password').type('{enter}')
        cy.url().should('include', '/inventory.html')
    })
    it('Inventory URL blocked without login', () => {
        cy.visit('/inventory.html', { failOnStatusCode: false })
        cy.url().should('eq', 'https://www.saucedemo.com/')
        cy.get('.error-message-container.error')
        .and('contain.text', `Epic sadface: You can only access '/inventory.html' when you are logged in.`)
        .should('be.visible')
    })
    it('Cart URL blocked without login', () => {
        cy.visit('/cart.html', { failOnStatusCode: false })
        cy.url().should('eq', 'https://www.saucedemo.com/')
        cy.get('.error-message-container.error')
        .and('contain.text', `Epic sadface: You can only access '/cart.html' when you are logged in.`)
        .should('be.visible')
    })
    it('Checkout URL blocked without login', () => {
        cy.visit('/checkout-step-one.html', { failOnStatusCode: false })
        cy.url().should('eq', 'https://www.saucedemo.com/')
        cy.get('.error-message-container.error')
        .and('contain.text', `Epic sadface: You can only access '/checkout-step-one.html' when you are logged in.`)
        .should('be.visible')
    })
    it('Session survives page refresh', () => {
        cy.login('standard_user', 'secret_sauce')
        cy.get('.inventory_item_name').should('have.length', 6)
        cy.reload()
        cy.url().should('include', '/inventory.html')
    })
    it('Logout via burger menu & Back button after logout does not restore session', () => {
        cy.login('standard_user', 'secret_sauce')
        cy.url().should('include', '/inventory.html')
        cy.get('#react-burger-menu-btn').click()
        cy.get('#logout_sidebar_link').should('be.visible').click()
        cy.url().should('eq', 'https://www.saucedemo.com/')
        cy.go('back')
        cy.url().should('eq', 'https://www.saucedemo.com/')
        cy.get('.error-message-container.error')
        .and('contain.text', `Epic sadface: You can only access '/inventory.html' when you are logged in.`)
        .should('be.visible')
    })

})