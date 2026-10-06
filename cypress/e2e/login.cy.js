describe('Login Page', () => {
    it('Verify login page', () => {
        cy.contains('Swag Labs')
        cy.get('#user-name').should('be.visible').and('be.empty')
        cy.get('#password').should('be.visible').and('be.empty')
    })
    it('Login successfully', () => {
        cy.get('#user-name').should('be.visible').type('standard_user')
        cy.get('#password').type('secret_sauce')
        cy.get('#login-button').click()
        cy.contains('Products')
    })
});