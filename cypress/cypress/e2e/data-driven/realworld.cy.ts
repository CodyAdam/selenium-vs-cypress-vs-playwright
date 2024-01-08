const LOGIN_URL = "https://conduit-realworld-example-app.fly.dev/#/login";

type User = {
  email: string;
  password: string;
  username: string;
};

describe("Realworld Conduit Data Driven", () => {
  it("should be able to login with all users", () => {
    cy.fixture("users").each((user: User) => {
      cy.visit(LOGIN_URL);
      cy.get("input[type='email']").type(user.email);
      cy.get("input[type='password']").type(user.password);
      cy.get("button").click();
      // assert that we have the correct user logged in
      cy.get("nav").contains(user.username);
    });
  });
});

// logout after each test
afterEach(() => {
  // clear local storage
  cy.clearLocalStorage();
  // reload page
  cy.reload();
});
