describe('i18n', () => {

  it('should have correct timezone', () => {
    // run using `npm run test:timezone` to use the correct timezone
    cy.visit("https://webbrowsertools.com/timezone/")
      .get("#timeZone")
      .should("have.text", "Antarctica/Troll");
  });

  it('should have correct locale', () => {
    cy.visit("https://webbrowsertools.com/timezone/")
      .get("#locale")
      .should("have.text", "fr-FR");
  });
});
