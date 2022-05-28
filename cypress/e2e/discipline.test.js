describe("testing discipline", () => {
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
    cy.wait(1000);
    cy.get(
      ":nth-child(3) > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper"
    ).type("test@yahoo.fr");
    cy.get(
      ":nth-child(4) > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper"
    )
      .clear()
      .type("123456");

    cy.get(".ant-btn").click();
    cy.url().should(
      "eq",
      "http://localhost:3000/coach/dashboard/select/discipline"
    );
    cy.wait(2000);
  });
  it("should display error message when no discipline is selected", () => {
    cy.get(".ant-btn").click();
    cy.get(".ant-form-item-explain-error").should("exist");
  });
  it("should select error message when no discipline is selected", () => {
    cy.get(".ant-btn").click();
    cy.get(".ant-form-item-explain-error").should("exist");
  });
});
