describe("testing update Seance ", () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });
  it("visit landing page", () => {
    cy.visit("/");
  });
  it("should display input validation error and remain in the same page", () => {
    cy.get(
      ":nth-child(3) > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper"
    ).type("salimkazdaghli@gmail.com");
    cy.get(
      ":nth-child(4) > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper"
    ).type("12345678");
    cy.wait(500);
    cy.get(".ant-btn").click();
    cy.url().should("eq", "http://localhost:3000/coach/dashboard");
  });
  it("Should redirect to the  seances page ", () => {
    cy.get("#seancesId").click();
    cy.wait(1000);
    cy.get(
      "[data-row-key='6252586fbbd180bfda9ca998'] > :nth-child(5) > .ant-space > .ant-space-item > .anticon > svg"
    ).click();
    cy.wait(1000);
    cy.get("#form_seanceName").clear().type("test update");
    cy.wait(500);
    cy.get(
      ":nth-child(8) > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-btn"
    ).click();
    cy.wait(1000);
    cy.get("#form_seanceName").clear().type("Course");
    cy.wait(500);
    cy.get(
      ":nth-child(8) > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-btn"
    ).click();
  });
});
