describe("testing assigning challenges", () => {
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

  it("should display input validation error when on cancel session when form is empty", () => {
    cy.wait(1000);
    cy.findByTestId("annulerSeanceMenu").click();
    cy.wait(3000);
    cy.url().should(
      "eq",
      "http://localhost:3000/coach/dashboard/annulerSeance"
    );
    cy.get(":nth-child(1) > .ant-card").within(() => {
      cy.get(".ant-card-actions > li > :nth-child(1) > .ant-btn").click();
    });
    cy.get(".ant-btn-primary").click();
    cy.wait(1500);
    cy.get(".ant-form-item-explain-error").should("exist");
  });

  it("should cancel a session successfully", () => {
    cy.wait(2000);
    cy.findByTestId("cancelSessionTextArea")
      .clear()
      .type("Absence en raison de maladie");
    cy.wait(1000);

    cy.get(".ant-btn-primary").click();
    cy.get(".ant-message-custom-content > :nth-child(2)")
      .contains("La séance a été annulée avec succès")
      .should("exist");
  });

  it("visit mailtrap  page", () => {
    cy.visit("https://mailtrap.io/inboxes");
    cy.wait(500);
    cy.get("#user_email").type("hicotechisamm@gmail.com");
    cy.wait(500);
    cy.get(".login_next_button").click();
    cy.wait(500);
    cy.get("#user_password").type("12345678");
    cy.wait(500);
    cy.get(".login_password > :nth-child(3) > .button").click();
    cy.wait(1000);
    cy.get(".inbox_name").click();
    cy.wait(1000);
    cy.get(":nth-child(1) > .i18m0o91").click();
    cy.wait(1000);
  });
});
