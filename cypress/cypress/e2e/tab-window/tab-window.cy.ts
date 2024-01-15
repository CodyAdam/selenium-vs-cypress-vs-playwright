describe('tab-window', () => {
    
    it('Open new tab', () => {
        cy.visit('https://the-internet.herokuapp.com/windows')
        cy.contains('Click Here').invoke('attr', 'target', '_self').click()
        cy.contains('New Window').should('be.visible')
        cy.go('back')
        cy.contains('Click Here').should('be.visible')
    })

})
