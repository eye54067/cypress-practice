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
                cy.get('.inventory_item_name').should('have.text', item.name)
                cy.get('.inventory_item_desc').should('have.text', item.description)
                cy.get('.inventory_item_price').should('have.text', `$${item.price}`)
            })
        })
    })
    it('Default sort is Name (A to Z)', () => {
        let refItem = []
        cy.login(user[0].username, password)
        cy.url().should('include', '/inventory.html')
        cy.get('.product_sort_container').should('have.value', 'az')
        cy.get('.active_option').should('have.text', 'Name (A to Z)')
        cy.get('.inventory_item').each(($item, index) => {
            cy.wrap($item).find('.inventory_item_name').each(($i, index) => {
                refItem.push($i.text())
            }) 
        }) //refItem = bac sorted = abc
        const sortedItem = [...refItem].sort((a, b) => a.localeCompare(b));
        expect(sortedItem).to.deep.equal(refItem);
    })
    it('Sort Name (A to Z)', () => {
        let refItem = []
        cy.login(user[0].username, password)
        cy.url().should('include', '/inventory.html')
        cy.get('.product_sort_container').select('Name (Z to A)')
        cy.get('.active_option').should('have.text', 'Name (Z to A)')
        cy.get('.product_sort_container').should('have.value', 'za')
        cy.get('.product_sort_container').select('Name (A to Z)')
        cy.get('.active_option').should('have.text', 'Name (A to Z)')
        cy.get('.product_sort_container').should('have.value', 'az')
        cy.get('.inventory_item').each(($item, index) => {
            cy.wrap($item).find('.inventory_item_name').each(($i, index) => {
                refItem.push($i.text())
            })
        }).then(() => {
            const sortedItem = [...refItem].sort((a, b) => a.localeCompare(b))
            console.log(refItem)
            console.log(sortedItem)
            expect(refItem).to.deep.equal(sortedItem)
        })
    })
    it('Sort Name (Z to A)', () => {
        let refItem = []
        cy.login(user[0].username, password)
        cy.url().should('include', '/inventory.html')
        cy.get('.product_sort_container').select('Name (Z to A)')
        cy.get('.active_option').should('have.text', 'Name (Z to A)')
        cy.get('.inventory_item').each(($item, index) => {
            cy.wrap($item).find('.inventory_item_name').each(($i, index) => {
                refItem.push($i.text())

            })
        }).then(() => {
            const sortedItem = [...refItem].sort((a, b) => b.localeCompare(a))
            console.log(refItem)
            console.log(sortedItem)
            expect(refItem).to.deep.equal(sortedItem)
        })
    })
})