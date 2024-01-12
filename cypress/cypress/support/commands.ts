// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('useCurrency', (currency) => {
    cy.session(currency, () => {
        cy.visit('https://electre.kereval.cloud/opencart/index.php')
        cy.contains('Currency').click()
        switch (currency) {
            case 'EUR':
                cy.contains('€').click()
                break
            case 'GBP':
                cy.contains('£').click()
                break
            case 'USD':
                cy.contains('$').click()
                break
        }
    })
})

declare namespace Cypress {
    interface Chainable {
        /**
         * Commande pour changer la devise dans opencart
         */
        useCurrency(currency: 'EUR'|'GBP'|'USD'): void
    }
}