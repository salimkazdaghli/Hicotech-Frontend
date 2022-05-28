describe("testing auth", () => {
  it("visit landing page", () => {
    cy.visit("/");
  });
  it("should display input validation error and remain in the same page", () => {
    cy.get(
      ":nth-child(3) > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper"
    ).type("hassene.ayoubyahoo.fr");
    cy.get(
      ":nth-child(3) > .ant-col > .ant-form-item-explain > .ant-form-item-explain-error"
    ).should("exist");

    cy.get(
      ":nth-child(4) > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper"
    ).type("12345");
    cy.get(
      ":nth-child(4) > .ant-col > .ant-form-item-explain > .ant-form-item-explain-error"
    ).should("exist");
    cy.wait(500);
    cy.get(".ant-btn").click();
    cy.url().should("eq", "http://localhost:3000/login");
  });
  it("should display error when wrong credentials are passed", () => {
    cy.get(
      ":nth-child(3) > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper"
    ).clear();
    cy.get(
      ":nth-child(3) > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper"
    ).type("hassene.ayoub@yahoo.fr");
    cy.get(
      ":nth-child(4) > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper"
    ).clear();

    cy.get(
      ":nth-child(4) > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper"
    ).type("123456");

    cy.get(".ant-btn").click();
    cy.url().should("eq", "http://localhost:3000/login");
    cy.get(".ant-message-custom-content > :nth-child(2)")
      .contains("Les informations de connexion fournies sont invalides")
      .should("exist");
    cy.wait(2000);
  });
  it("should login successfully and redirect to home page", () => {
    cy.wait(1000);
    cy.get(
      ":nth-child(3) > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper"
    )
      .clear()
      .type("hassene.ayoub@yahoo.fr");
    cy.get(
      ":nth-child(4) > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper"
    )
      .clear()
      .type("123456");

    cy.get(".ant-btn").click();
    cy.url().should("eq", "http://localhost:3000/coach/dashboard");
  });
});
