import { user, password } from '../fixtures/user.json'
import product from '../fixtures/product.json'

describe('Inventory page', () => {
    it('Inventory lists all 6 products with correct names and prices', () => {
        cy.login(user[0].username, password)
        cy.url().should('include', '/inventory.html')
        cy.get('.inventory_item')
        .should('have.length', 6)
        .and('be.visible')
        product.forEach((item) => {
            cy.contains('.inventory_item_name', item.name)
            .closest('.inventory_item')
            .should('have.length', 1)
            .within(() => {
                cy.get('.inventory_item_name').should('have.text', item.name);
                cy.get('.inventory_item_desc').should('have.text', item.description);
                cy.get('.inventory_item_price').should('have.text', `$${item.price}`)
            })
        })
    })
})