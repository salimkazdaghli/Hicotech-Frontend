describe("test event ", () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });
  it("visit the first page", () => {
    cy.visit("/");
  });
  it("get all event", () => {
    cy.get(
      ":nth-child(3) > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper"
    ).type("salimkazdaghli@gmail.com");
    cy.get(
      ":nth-child(4) > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper"
    ).type("12345678");
    cy.wait(500);
    cy.get(".ant-btn").click();
    cy.url().should("eq", "http://localhost:3000/coach/dashboard");
    cy.get("#defiId").click();
    cy.wait(1000);
    cy.url().should("eq", "http://localhost:3000/coach/dashboard/defis");
  });

  it("Add defi", () => {
    cy.get("#AddBtn").click();
    cy.get("#form_in_modal_defiName").clear().type("title test defi");
    cy.get("#form_in_modal_defiObjectif").clear().type("description test defi");
    cy.get("#form_in_modal_defiLien")
      .clear()
      .type("http://localhost:3000/__/#/tests/integration/oumaimaDefi.test.js");
    cy.get("#form_in_modal_dateExpiration").click();
    cy.get("#form_in_modal_dateExpiration").clear().type("2022/07/12");
    cy.get("#form_in_modal_dateExpiration").type("{enter}");
    cy.wait(1000);
    cy.get(".ant-modal-footer > .ant-btn-primary").click();
  });

  it("Modifier defi", () => {
    cy.get(
      ":nth-child(3) > .ant-card > .ant-card-actions > :nth-child(2) > :nth-child(1) > .anticon"
    ).click();
    cy.get("#form_in_modal_defiName").clear().type("update ...");
    cy.get(".ant-modal-footer > .ant-btn-primary").click();
  });
  it("Supprimer defi", () => {
    cy.get(
      ":nth-child(5) > .ant-card > .ant-card-actions > :nth-child(1) > :nth-child(1) > .anticon"
    ).click();
    cy.wait(2000);
  });

  it("Voir video defi", () => {
    cy.get(":nth-child(1) > .ant-card > .ant-card-cover > a > img").click();
    cy.wait(2000);
    cy.visit("http://localhost:3000/coach/dashboard/defis");
  });

  it("Empty defi to add ", () => {
    cy.get("#AddBtn").click();
    cy.wait(2000);
    cy.get(".ant-modal-footer > .ant-btn-primary").click();
    cy.wait(3000);
    cy.get(".ant-modal-close-x").click();
  });
});
