import "cypress-iframe";

describe("testing invitation ", () => {
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
  it("go to invitations ", () => {
    cy.get("#inviId").click();
    cy.wait(1000);
    cy.url().should("eq", "http://localhost:3000/coach/dashboard/invitations");
  });

  it("go to add invitation ", () => {
    cy.wait(3000);
    cy.get(".ant-btn").click();
    cy.wait(500);
    cy.get(".ant-modal-footer > .ant-btn-primary").click();
    cy.wait(1000);
    cy.get("#form_in_modal_email").type("hicotechJoueur@gmail.com");
    cy.wait(500);
    cy.get("#form_in_modal_firstName").type("Salim");
    cy.wait(500);
    cy.get("#form_in_modal_lastName").type("Kazdaghli");
    cy.wait(500);
    cy.get(".ant-picker-input").click();
    cy.get(
      ".ant-picker-body > table > tbody > tr:nth-child(6) > td:nth-child(6)"
    ).click();
    cy.wait(500);
    cy.get(".ant-modal-footer > .ant-btn-primary").click();
    // cy.get('.ant-btn-default').click()
    cy.wait(500);
    // cy.get(".ant-space-item > .ant-avatar").click()
    cy.wait(500);
    // cy.get("#logoutId").click()
  });
});
