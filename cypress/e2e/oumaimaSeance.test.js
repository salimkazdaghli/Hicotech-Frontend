describe("test event ", () => {
  it("visit the first page", () => {
    cy.visit("/");
  });
  it("get all seances", () => {
    cy.get(
      ":nth-child(3) > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper"
    ).type("salimkazdaghli@gmail.com");
    cy.get(
      ":nth-child(4) > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper"
    ).type("12345678");
    cy.wait(500);
    cy.get(".ant-btn").click();
    cy.url().should("eq", "http://localhost:3000/coach/dashboard");
    cy.get("#seanceId").click();
    cy.wait(1000);
    cy.url().should("eq", "http://localhost:3000/coach/dashboard/seances");
    cy.wait(1000);
  });

  it("filter seances par joueur", () => {
    cy.get(":nth-child(2) > .ant-select > .ant-select-selector").click();
    cy.wait(2000);
    // cy.get('select').select('joueur@gmail.com').should('have.value', 'joueur@gmail.com')
  });

  it("filter seances par programme", () => {
    cy.get("#rc_select_1").click();
    cy.wait(1000);
    // cy.get('select').select('joueur@gmail.com').should('have.value', 'joueur@gmail.com')
  });

  it.skip("Add seance", () => {
    cy.findByTestId("btnAdd").click();
    cy.wait(1000);
    cy.get("#form_seanceName").clear().type("test seance");
    cy.get("#form_player").click();
    cy.get(".ant-modal-footer > .ant-btn-primary").click();
  });

  it("pagine seance", () => {
    cy.get(".ant-pagination-item-2 > a").click();
    cy.wait(1500);
  });

  it("pagine seance", () => {
    cy.get(".ant-pagination-item-1 > a").click();
    cy.wait(1000);
  });
});
