describe('Checkout Page', () => {
    let user1
    let password
    before('Fetch users data', () => {
        cy.log('I run before every test in every spec file!')
        cy.visit('https://www.saucedemo.com/')
        cy.clearAllCookies()
        cy.clearAllLocalStorage()
        cy.clearAllSessionStorage()
        cy.fixture('data').then((data) => {
            user1 = data.user1
            password = data.password
        })  
    })
    describe('Checkout with standard user', {testIsolation: false},() => {
        before('Login successfully with standard user', () => { 
            cy.get('#user-name').should('be.visible').type(user1.username)
            cy.get('#password').type(password)
            cy.get('#login-button').click()
            cy.url().should('include', '/inventory')
            cy.contains('Product').should('be.visible')
        })
        after('Logout', () => {
            cy.get('#react-burger-menu-btn').should('be.visible').click()
            cy.get('#logout_sidebar_link').should('be.visible').click()
            cy.url().should('include', '/')
            cy.contains('Swag Labs').should('be.visible')
        })
        it('1: Add products to card', () => {
            cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
            cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
            cy.get('.shopping_cart_link').should('be.visible').click()
            cy.url().should('include', '/cart')
            cy.contains('Your Cart').should('be.visible')
            cy.contains('Sauce Labs Backpack').should('be.visible')
            cy.contains('Sauce Labs Bike Light').should('be.visible')
            cy.get('[data-test="inventory-item"]').should('have.length', 2)
        })
        it('2: Complete Checkout Steps', () => {
            cy.get('#checkout').should('be.visible').click()
            cy.url().should('include', '/checkout-step-one')
            cy.contains('Checkout: Your Information').should('be.visible')
            cy.get('#first-name').should('be.visible').type('Test')
            cy.get('#last-name').should('be.visible').type('Test')
            cy.get('#postal-code').should('be.visible').type('11111')
            cy.get('#continue').should('be.visible').click()
            cy.contains('Checkout: Overview').should('be.visible')
            cy.url().should('include', '/checkout-step-two')
            cy.get('[data-test="finish"]').should('be.visible').click()
            cy.url().should('include', '/checkout-complete')
            cy.contains('Checkout: Complete!').should('be.visible')
            cy.contains('Thank you for your order!').should('be.visible')
        })
    })

})