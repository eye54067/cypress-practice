describe('Login Page', () => {
    let user1, user2, user3, user4, user5, user6, password
    before('Fetch users data', () => {
        cy.fixture('data').then((data) => {
            user1  = data.user1
            user2 = data.user2
            user3 = data.user3
            user4 = data.user4
            user5 = data.user5
            user6 = data.user6
            password = data.password
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
        cy.get('#user-name').should('be.visible').type(user1.username)
        cy.get('#password').type(password)
        cy.get('#login-button').click()
        cy.contains('Products')
    })
    it('Login successfully with problem user', ()=> {
        cy.get('#user-name').should('be.visible').type(user3.username)
        cy.get('#password').type(password)
        cy.get('#login-button').click()
        cy.contains('Products')
    })
    it('Login successfully with performance glitch user', () => {
        cy.get('#user-name').should('be.visible').type(user4.username)
        cy.get('#password').type(password)
        cy.get('#login-button').click()
        cy.contains('Products')
    })
    it('Login successfully with error user', () => {
        cy.get('#user-name').should('be.visible').type(user5.username)
        cy.get('#password').type(password)
        cy.get('#login-button').click()
        cy.contains('Products')
    })
    it('Login successfully with visual user', () => {
        cy.get('#user-name').should('be.visible').type(user6.username)
        cy.get('#password').type(password)
        cy.get('#login-button').click()
        cy.contains('Products')
    })
    it('Login failed with logged out user', () => {
        cy.get('#user-name').should('be.visible').type(user2.username)
        cy.get('#password').type(password)
        cy.get('#login-button').click()
        cy.contains('Epic sadface: Sorry, this user has been locked out.')
    })
});