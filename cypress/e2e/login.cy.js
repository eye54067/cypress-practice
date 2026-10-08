describe('Login Page', () => {
    let user
    before('Fetch users data', () => {
        cy.fixture('data').then((data) => {
            user  = data.users
        })
    })
    beforeEach('Open Sauce Demo Website', () => {
        cy.log('I run before every test in every spec file!')
        cy.visit('https://www.saucedemo.com/')
    })
    it('Verify login page', () => {
        cy.contains('Swag Labs')
        cy.get('#user-name').should('be.visible').and('be.empty')
        cy.get('#password').should('be.visible').and('be.empty')
    })
    it('Login successfully with standard user', () => {
        cy.get('#user-name').should('be.visible').type(user.username1)
        cy.get('#password').type(user.password)
        cy.get('#login-button').click()
        cy.contains('Products')
    })
    it('Login successfully with problem user', ()=> {
        cy.get('#user-name').should('be.visible').type(user.username3)
        cy.get('#password').type(user.password)
        cy.get('#login-button').click()
        cy.contains('Products')
    })
    it('Login successfully with performance glitch user', () => {
        cy.get('#user-name').should('be.visible').type(user.username4)
        cy.get('#password').type(user.password)
        cy.get('#login-button').click()
        cy.contains('Products')
    })
    it('Login successfully with error user', () => {
        cy.get('#user-name').should('be.visible').type(user.username5)
        cy.get('#password').type(user.password)
        cy.get('#login-button').click()
        cy.contains('Products')
    })
    it('Login successfully with visual user', () => {
        cy.get('#user-name').should('be.visible').type(user.username6)
        cy.get('#password').type(user.password)
        cy.get('#login-button').click()
        cy.contains('Products')
    })
    it('Login failed with logged out user', () => {
        cy.get('#user-name').should('be.visible').type(user.username2)
        cy.get('#password').type(user.password)
        cy.get('#login-button').click()
        cy.contains('Epic sadface: Sorry, this user has been locked out.')
    })
});