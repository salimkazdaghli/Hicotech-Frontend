describe("testing programme ", () => {
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
  it("go to programmes ", () => {
    cy.get("#programmeId").click();
    cy.wait(1000);
    cy.url().should("eq", "http://localhost:3000/coach/dashboard/programmes");
  });

  it("go to add programme ", () => {
    cy.wait(3000);
    cy.get(".ant-btn").click();
    cy.wait(500);
    cy.get("#form_in_modal_title").type("test programme");
    cy.wait(500);
    cy.get("#form_in_modal_description").type("test programme description");
    cy.wait(500);
    cy.get("#form_in_modal_videoLink").type(
      "https://www.youtube.com/embed/DRkZKnTlCYU"
    );
    cy.wait(500);
    cy.get(".ant-modal-footer > .ant-btn-primary").click();
  });

  it("go to show  programme ", () => {
    cy.wait(3000);
    cy.get(
      ":nth-child(1) > .ant-card > .ant-card-actions > :nth-child(3) > :nth-child(1) > .anticon"
    ).click();
    cy.wait(3000);
    cy.url().should("eq", "http://localhost:3000/coach/dashboard/programmes");
    cy.wait(500);
    cy.get(".ant-btn-default").click();
  });

  it("go to put programme ", () => {
    cy.wait(3000);
    cy.get(
      ":nth-child(1) > .ant-card > .ant-card-actions > :nth-child(2) > :nth-child(1) > .anticon"
    ).click();
    cy.wait(500);
    cy.get("#form_in_modal_title").clear();
    cy.get("#form_in_modal_title").type("programme");
    cy.wait(500);
    cy.get("#form_in_modal_description").clear();
    cy.get("#form_in_modal_description").type("programme seance foot");
    cy.wait(500);
    cy.get(".ant-modal-footer > .ant-btn-primary").click();
    cy.wait(1000);
  });
  it("go to show  programme ", () => {
    cy.wait(3000);
    cy.get(
      ":nth-child(1) > .ant-card > .ant-card-actions > :nth-child(3) > :nth-child(1) > .anticon"
    ).click();
    cy.wait(3000);
    cy.url().should("eq", "http://localhost:3000/coach/dashboard/programmes");
    cy.wait(500);
    cy.get(".ant-btn-default").click();
  });
  it("go to delete  programme ", () => {
    cy.wait(3000);
    cy.get(
      ":nth-child(1) > .ant-card > .ant-card-actions > :nth-child(1) > :nth-child(1) > .anticon"
    ).click();
    cy.wait(3000);
    cy.url().should("eq", "http://localhost:3000/coach/dashboard/programmes");
  });
});
