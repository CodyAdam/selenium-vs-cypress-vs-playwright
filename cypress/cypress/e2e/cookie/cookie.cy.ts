
describe('cookie-session', () => {

    beforeEach(() => {
        cy.useCurrency('GBP')
        cy.visit('https://electre.kereval.cloud/opencart/index.php')
    })
    
    it('Check currency', () => {
        cy.contains('£').should('be.visible')
    })

    it('Check currency other', () => {
        cy.contains('£').should('be.visible')
    })

})

describe('cookie-direct', () => {

    it('Change currency', () => {
        cy.visit('https://electre.kereval.cloud/opencart/index.php')
        cy.getCookie('currency').should('have.property', 'value', 'EUR')
        cy.contains('£').should('not.be.visible')
        cy.clearCookies()
        cy.setCookie('currency', 'GBP')
        cy.reload()
        cy.contains('£').should('be.visible')
    })
})
