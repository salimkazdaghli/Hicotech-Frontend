describe("testing the statistic's CRUD operations", () => {
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
    cy.get(
      ":nth-child(3) > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper"
    ).type("hassene.ayoub@yahoo.fr");
    cy.get(
      ":nth-child(4) > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper"
    ).type("123456");

    cy.get(".ant-btn").click();
    cy.url().should("eq", "http://localhost:3000/coach/dashboard");
    cy.wait(200);
  });
  it("should change subscription to basic", () => {
    cy.findByTestId("subscription-btn").click();
    cy.wait(1000);
    cy.get("#subscription > :nth-child(2)").click();
    cy.wait(500);
    cy.get(".ant-btn").click();
    cy.findByTestId("subscription-alert").should("exist");
  });
});
