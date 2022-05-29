describe("testing session feedBack", () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });
  it("visit landing page", () => {
    cy.visit("/");
  });
  it("should login successfully and redirect to home page", () => {
    cy.wait(2000);
    cy.findByTestId("emailInput").clear().type("hassene.ayoub@yahoo.fr");
    cy.findByTestId("PasswordInput").clear().type("123456");

    cy.get(".ant-btn").click();
    cy.url().should("eq", "http://localhost:3000/coach/dashboard");
  });

  it("should display input validation error when giving feedback on a session with empty", () => {
    cy.wait(1000);
    cy.findByTestId("feedbackSessionMenu").click();
    cy.wait(1000);
    cy.url().should(
      "eq",
      "http://localhost:3000/coach/dashboard/FeedbackSeance"
    );
    cy.get(":nth-child(1) > .ant-card").within(() => {
      cy.get(".ant-card-actions > li > :nth-child(1) > .ant-btn").click();
    });
    cy.get(".ant-btn-primary").click();
    cy.wait(1500);
    cy.get(".ant-form-item-explain-error").should("exist");
  });

  it("should make feedback on a session", () => {
    cy.wait(2000);

    cy.findByTestId("FeedBackDescription")
      .clear()
      .type(
        "This session was fantastic,the rhythm was fast and the players were highly motivated to complete the session objectives."
      );
    cy.wait(1000);

    cy.get(".ant-btn-primary").click();
    cy.get(".ant-message-custom-content > :nth-child(2)")
      .contains("Votre feedback a été enregistré avec succès")
      .should("exist");
  });
});
