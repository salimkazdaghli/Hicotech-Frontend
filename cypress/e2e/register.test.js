describe("testing register", () => {
  it("visit landing page", () => {
    cy.visit("/register");
  });
  it("should display input validation error and remain in the same page", () => {
    cy.get(".ant-btn").click();
    cy.wait(3000);
  });
  it(" should display an error message when the provided email already exists in the database", () => {
    cy.get("#normal_register_firstName").type("Hassene");
    cy.wait(500);
    cy.get("#normal_register_lastName").type("Ayoub");
    cy.wait(500);
    cy.selectDropdown("#normal_register_sexe", "Homme");
    cy.wait(500);
    cy.get(".ant-picker-input").click();
    cy.get(
      ".ant-picker-body > table > tbody > tr:nth-child(2) > td:nth-child(1)"
    ).click();

    cy.get("#normal_register_email").type("hassene.ayoub@yahoo.fr");
    cy.wait(500);
    cy.selectDropdown("#normal_register_city", "Bizerte");
    cy.wait(500);
    cy.get("#normal_register_password").type("123456");
    cy.wait(500);
    cy.get("#normal_register_confirm").type("123456");
    cy.wait(500);
    cy.get(".ant-btn").click();
    cy.get(".ant-message-custom-content > :nth-child(2)")
      .contains(
        "Utilisateur existe déjà s’il vous plaît rediriger vers la page de connexion"
      )
      .should("exist");
  });
  it("should register a user successfully and redirect to home page", () => {
    cy.get("#normal_register_firstName").focus().clear().type("Hassene");
    cy.wait(500);
    cy.get("#normal_register_lastName").focus().clear().type("Ayoub");
    cy.wait(500);
    cy.selectDropdown("#normal_register_sexe", "Homme");
    cy.wait(500);
    cy.get(".ant-picker-input").click();
    cy.get(
      ".ant-picker-body > table > tbody > tr:nth-child(2) > td:nth-child(1)"
    ).click();

    cy.get("#normal_register_email").focus().clear().type("test@yahoo.fr");
    cy.wait(500);
    cy.selectDropdown("#normal_register_city", "Bizerte");
    cy.wait(500);
    cy.get("#normal_register_password").focus().clear().type("123456");
    cy.wait(500);
    cy.get("#normal_register_confirm").focus().clear().type("123456");
    cy.wait(500);
    cy.get(".ant-btn").click();
    cy.url().should("eq", "http://localhost:3000/coach/dashboard");
  });
});
