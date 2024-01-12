const login = () => {
    cy.visit('https://electre.kereval.cloud/opencart/index.php')
    cy.contains('My Account').click()
    cy.contains('Login').click()
    cy.get('#input-email').type('t@e.st')
    cy.get('#input-password').type('test')
    cy.get('button[type="submit"]').click()
    cy.wait(500)
}

const logout = () => {
    cy.contains('My Account').click()
    cy.contains('Logout').click()
}

describe('setup-teardown', () => {
    before(() => {
        login()
        // retour à la page d'accueil
        cy.get('.img-fluid').click()
        cy.get('h4').contains('iPhone').click()
        cy.contains('Add to Cart').click()
        logout()
    })

    beforeEach(() => {
        login()
    })

    it('Check Cart', () => {
        cy.contains('Shopping Cart').click()
        cy.get('button:contains(Estimate Shipping & Taxes)').should('be.visible')
    })

    it('Check Checkout', () => {
        cy.contains('Checkout').click()
        cy.get('#input-shipping-method').should('be.visible')
    })
    
    afterEach(() => {
        logout()
    })

    after(() => {
        login()
        cy.contains('Shopping Cart').click()
        // suppression de l'iPhone du panier
        cy.get('.input-group > .btn-danger').click()
        logout()
    })
})
