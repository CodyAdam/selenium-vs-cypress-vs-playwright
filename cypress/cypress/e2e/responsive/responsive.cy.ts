describe('responsive', () => {

  it('should have the correct viewport size', () => {
    cy.viewport(210, 220)
    cy.visit("https://whatismyviewport.com")
      .get('#w')
      .should('have.text', '210')
      .get('#h')
      .should('have.text', '220');
  });

});
