describe("test event ", () => {
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
    cy.wait(1000);
  });

  it("Add defi", () => {
    cy.get("#AddBtn").click();

    cy.get("#form_in_modal_defiName").clear().type("title test defi");

    cy.get("#form_in_modal_defiObjectif").clear().type("description test defi");
    cy.get("#form_in_modal_defiLien")
      .clear()
      .type("http://localhost:3000/__/#/tests/integration/oumaimaDefi.test.js");

    cy.get(".ant-modal-footer > .ant-btn-primary > span").click();
  });
});
