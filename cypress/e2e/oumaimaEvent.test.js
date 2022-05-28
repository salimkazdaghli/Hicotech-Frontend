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
    cy.get("#eventId").click();
    cy.wait(1000);
    cy.url().should("eq", "http://localhost:3000/coach/dashboard/events");
    cy.wait(1000);
  });
  it("Add event", () => {
    cy.get("#AddBtn").click();
    cy.get("#form_in_modal_title").clear().type("title test event");
    cy.get("#form_in_modal_description").clear().type("description test event");

    // cy.get('#form_in_modal_dateEvent').click()
    // cy.get('.ant-picker-input').clear().type("2022/05/12")

    cy.get(".ant-select-selector").click();
    cy.wait(1000);
    cy.findByTestId("option-Tous").click();
    cy.get(".ant-modal-footer > .ant-btn-primary").click();
    cy.get(".ant-modal-close-x").click();
  });
  it("Edit event", () => {
    cy.get(
      ":nth-child(1) > .ant-card > .ant-card-actions > :nth-child(2) > :nth-child(1) > .anticon"
    ).click();
    cy.wait(2000);
    cy.get("#form_in_modal_title").clear().type("update event");
    cy.get(".ant-modal-close-x").click();
  });

  it("Details event", () => {
    cy.get(
      ":nth-child(1) > .ant-card > .ant-card-actions > :nth-child(3) > :nth-child(1) > .anticon"
    ).click();
    cy.wait(2000);
    cy.get(
      ":nth-child(6) > .ant-modal-root > .ant-modal-wrap > .ant-modal > .ant-modal-content > .ant-modal-close > .ant-modal-close-x"
    ).click();
  });
  //    it("Delete event", () => {
  //     cy.get('.ant-card-actions > :nth-child(1) > :nth-child(1) > .anticon')
  //     .click()
  //     cy.wait(2000)
  //     });
});
