describe("test event joueur", () => {
  it("visit the first page", () => {
    cy.visit("/");
  });
  it("get all event", () => {
    cy.get(
      ":nth-child(3) > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper"
    ).type("karim.test@gmail.com");
    cy.get(
      ":nth-child(4) > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper"
    ).type("123456");
    cy.wait(500);
    cy.get(".ant-btn").click();
    cy.url().should("eq", "http://localhost:3000/joueur/dashboard");
    cy.get("#eventId").click();
    cy.wait(1000);
    cy.url().should("eq", "http://localhost:3000/joueur/dashboard/mesevents");
    cy.wait(1000);
  });

  it("get details event", () => {
    cy.get(
      ":nth-child(1) > .ant-card > .ant-card-actions > :nth-child(1) > :nth-child(1) > .anticon"
    ).click();
    cy.wait(1000);
    cy.get(".ant-modal-close-x").click();
  });

  it("participate to event", () => {
    cy.get(
      ":nth-child(2) > .ant-card > .ant-card-actions > :nth-child(2) > :nth-child(1) > .anticon"
    ).click();
    cy.wait(1000);
  });

  it("not interr to event", () => {
    cy.get(":nth-child(3) > :nth-child(1) > .anticon").click();
    cy.wait(1000);
  });
});
