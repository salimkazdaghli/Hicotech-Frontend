describe("testing register", () => {
  it("visit landing page", () => {
    cy.visit("/register");
  });
  it("should display input validation error and remain in the same page", () => {
    cy.get("#normal_register_firstName").type("Hassene");
    cy.wait(500);
    cy.get("#normal_register_lastName").type("Ayoub");
    cy.wait(500);
    cy.selectDropdown("#normal_register_sexe", "Homme");
    cy.wait(500);

    cy.get("#normal_register_dateOfBirth").type("01/01/2022 code{enter}");

    cy.get("#normal_register_email").type("hassene.ayoub@yahoo.fr");
    cy.wait(500);
    cy.selectDropdown("#normal_register_city", "Bizerte");
    cy.wait(500);
    cy.get("#normal_register_password").type("123456");
    cy.wait(500);
    cy.get("#normal_register_confirm").type("123456");
    cy.wait(500);
    cy.get(".ant-btn").click();
  });
});
