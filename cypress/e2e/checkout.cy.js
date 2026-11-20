import {user, password} from '../fixtures/user.json'
import product from '../fixtures/product.json'
describe('Checkout with all 6 products for every test user', () => {
    user.forEach((user) => {
        it(`Checkout as ${user.username}`, function() {
            cy.login(user.username, password)
            cy.get('[data-test="error"], #inventory_container').then((element) => {
                if (element.is('[data-test="error"]')) {
                    cy.log(`Login failed for ${user.username}`)
                    this.skip()
                }
            })
            //Validate inventory page
            cy.url().should('include', '/inventory.html')
            cy.get('.inventory_item_name').should('have.length', 6)
            // Add all products to cart and proceed to checkout
            cy.get('#add-to-cart-sauce-labs-backpack').click()
            cy.get('#add-to-cart-sauce-labs-bike-light').click()
            cy.get('#add-to-cart-sauce-labs-bolt-t-shirt').click()
            cy.get('#add-to-cart-sauce-labs-fleece-jacket').click()
            cy.get('#add-to-cart-sauce-labs-onesie').click()
            cy.get('[id="add-to-cart-test.allthethings()-t-shirt-(red)"]').click()
            cy.get('.shopping_cart_link').click()
            // Validate cart page
            cy.url().should('include', '/cart.html')
            cy.get('.cart_item').should('have.length', 6)
            cy.get('#checkout').click()
            // Fill in the checkout information form
            cy.get('#first-name').should('be.empty')
            cy.get('#last-name').should('be.empty')
            cy.get('#postal-code').should('be.empty')
            cy.get('#first-name').type('Test')
            cy.get('#last-name').type('Test')
            cy.get('#postal-code').type('11111')
            cy.get('#continue').click()
            // Validate overview page
            cy.url().should('include', '/checkout-step-two')
            cy.contains('Checkout: Overview').should('be.visible')
            cy.get('.inventory_item_name').should('have.length', 6)
            product.forEach((item) => {
                cy.contains('.cart_item', item.name)
                .find('.inventory_item_price')
                .should('contain.text', item.price.toFixed(2))
            })
            let itemTotal = 0
            product.forEach((item) => {
                itemTotal += item.price
            })
            const tax = Number(itemTotal * 0.08)
            const total = (itemTotal + tax).toFixed(2)
            cy.get('.summary_subtotal_label').should('contain.text', `Item total: $${itemTotal.toFixed(2)}`)
            cy.get('.summary_tax_label').should('contain.text', 'Tax: $' + tax.toFixed(2))
            cy.get('.summary_total_label').should('contain.text', 'Total: $' + total)
            cy.get('#finish').click()
            // Validate checkout complete page
            cy.url().should('include', '/checkout-complete')
            cy.contains('Checkout: Complete!').should('be.visible')
            cy.contains('Thank you for your order!').should('be.visible')
            // Logout and clear cookies, local storage, and session storage
            cy.get('#react-burger-menu-btn').click()
            cy.get('#logout_sidebar_link').click()
            cy.clearAllCookies()
            cy.clearAllLocalStorage()
            cy.clearAllSessionStorage()
        })
    })
})
describe('Checkout step 1: Validate mandatory field for your information form', () => {
    user.forEach((user) => {
        it(`Verify error message after checkout with missing first name for ${user.username}`, function() {
            cy.login(user.username, password)
            cy.get('[data-test="error"], #inventory_container').then((element) => {
                if (element.is('[data-test="error"]')) {
                    cy.log(`Login failed for ${user.username}`)
                    this.skip()
                }
            })
            cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
            cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
            cy.get('.shopping_cart_link').click()
            cy.get('#checkout').click()
            cy.get('#first-name').should('be.empty')
            cy.get('#last-name').should('be.empty')
            cy.get('#postal-code').should('be.empty')
            cy.get('#last-name').type('Test')
            cy.get('#postal-code').type('11111')
            cy.get('#continue').click()
            cy.get('[data-test="error"]').should('be.visible')
            cy.contains('Error: First Name is required').should('be.visible')
        })   
    })
    user.forEach((user) => {
        it(`Verify error message after checkout with missing last name for ${user.username}`, function() {
            cy.login(user.username, password)
            cy.get('[data-test="error"], #inventory_container').then((element) => {
                if (element.is('[data-test="error"]')) {
                    cy.log(`Login failed for ${user.username}`)
                    this.skip()
                }
            })
            cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
            cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
            cy.get('.shopping_cart_link').click()
            cy.get('#checkout').click()
            cy.get('#first-name').should('be.empty')
            cy.get('#last-name').should('be.empty')
            cy.get('#postal-code').should('be.empty')
            cy.get('#first-name').type('Test')
            cy.get('#postal-code').type('11111')
            cy.get('#continue').click()
            cy.get('[data-test="error"]').should('be.visible')
            cy.contains('Error: Last Name is required').should('be.visible')
        })   
    })
    user.forEach((user) => {
        it(`Verify error message after checkout with missing postal code for ${user.username}`, function() {
            cy.login(user.username, password)
            cy.get('[data-test="error"], #inventory_container').then((element) => {
                if (element.is('[data-test="error"]')) {
                    cy.log(`Login failed for ${user.username}`)
                    this.skip()
                }
            })
            cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
            cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
            cy.get('.shopping_cart_link').click()
            cy.get('#checkout').click()
            cy.get('#first-name').should('be.empty')
            cy.get('#last-name').should('be.empty')
            cy.get('#postal-code').should('be.empty')
            cy.get('#first-name').type('Test')
            cy.get('#last-name').type('Test')
            cy.get('#continue').click()
            cy.get('[data-test="error"]').should('be.visible')
            cy.contains('Error: Postal Code is required').should('be.visible')
        })   
    })
    user.forEach((user) => {
        it(`Verify error message after checkout with missing first name and last name for ${user.username}`, function() {
            cy.login(user.username, password)
            cy.get('[data-test="error"], #inventory_container').then((element) => {
                if (element.is('[data-test="error"]')) {
                    cy.log(`Login failed for ${user.username}`)
                    this.skip()
                }
            })
            cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
            cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
            cy.get('.shopping_cart_link').click()
            cy.get('#checkout').click()
            cy.get('#first-name').should('be.empty')
            cy.get('#last-name').should('be.empty')
            cy.get('#postal-code').should('be.empty')
            cy.get('#postal-code').type('11111')
            cy.get('#continue').click()
            cy.get('[data-test="error"]').should('be.visible')
            cy.contains('Error: First Name is required').should('be.visible')
        })   
    })
    user.forEach((user) => {
        it(`Verify error message after checkout with missing last name and postal code for ${user.username}`, function() {
            cy.login(user.username, password)
            cy.get('[data-test="error"], #inventory_container').then((element) => {
                if (element.is('[data-test="error"]')) {
                    cy.log(`Login failed for ${user.username}`)
                    this.skip()
                }
            })
            cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
            cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
            cy.get('.shopping_cart_link').click()
            cy.get('#checkout').click()
            cy.get('#first-name').should('be.empty')
            cy.get('#last-name').should('be.empty')
            cy.get('#postal-code').should('be.empty')
            cy.get('#first-name').type('Test')
            cy.get('#continue').click()
            cy.get('[data-test="error"]').should('be.visible')
            cy.contains('Error: Last Name is required').should('be.visible')
        })   
    })
    user.forEach((user) => {
        it(`Verify error message after checkout with missing first name and postal code for ${user.username}`, function() {
            cy.login(user.username, password)
            cy.get('[data-test="error"], #inventory_container').then((element) => {
                if (element.is('[data-test="error"]')) {
                    cy.log(`Login failed for ${user.username}`)
                    this.skip()
                }
            })
            cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
            cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
            cy.get('.shopping_cart_link').click()
            cy.get('#checkout').click()
            cy.get('#first-name').should('be.empty')
            cy.get('#last-name').should('be.empty')
            cy.get('#postal-code').should('be.empty')
            cy.get('#last-name').type('Test')
            cy.get('#continue').click()
            cy.get('[data-test="error"]').should('be.visible')
            cy.contains('Error: First Name is required').should('be.visible')
        })   
    })
    user.forEach((user) => {
        it(`Verify error message after checkout with missing all mandatoy fields for ${user.username}`, function() {
            cy.login(user.username, password)
            cy.get('[data-test="error"], #inventory_container').then((element) => {
                if (element.is('[data-test="error"]')) {
                    cy.log(`Login failed for ${user.username}`)
                    this.skip()
                }
            })
            cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
            cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
            cy.get('.shopping_cart_link').click()
            cy.get('#checkout').click()
            cy.get('#first-name').should('be.empty')
            cy.get('#last-name').should('be.empty')
            cy.get('#postal-code').should('be.empty')
            cy.get('#continue').click()
            cy.get('[data-test="error"]').should('be.visible')
            cy.contains('Error: First Name is required').should('be.visible')
        })   
    })    
})