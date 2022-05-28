describe("testing programme ", () => {
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
    cy.get("#programmeId").click();
    cy.wait(1000);
    cy.url().should("eq", "http://localhost:3000/coach/dashboard/programmes");
  });
  it("go to programmes ", () => {});
});
