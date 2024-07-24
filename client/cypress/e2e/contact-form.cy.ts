describe("Contact Form", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should submit the contact form", () => {
    // Fill out the form
    cy.getByData("first-name").type("John");
    cy.getByData("last-name").type("Doe");
    cy.getByData("email").type("john.doe@example.com");
    cy.getByData("query-type-0").check();
    cy.getByData("message").type("Hello, World!");
    cy.getByData("consent").check();

    // Submit the form
    cy.intercept("POST", "/api/contact-us").as("submitForm");
    cy.getByData("contact-form").submit();

    // Assert pending state
    cy.getByData("submit-button").contains(/submitting/i);
    cy.getByData("toast").should("not.exist");

    // Assert success state
    cy.wait("@submitForm").its("response.statusCode").should("eq", 200);
    cy.getByData("toast");
  });
});
