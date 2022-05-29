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
    cy.get("#eventId").click();
    cy.wait(1000);
    cy.url().should("eq", "http://localhost:3000/coach/dashboard/events");
    cy.wait(1000);
  });
  it.skip("Add event", () => {
    cy.get("#AddBtn").click();
    cy.get("#form_in_modal_title").clear().type("title ttest event");
    cy.get("#form_in_modal_description").clear().type("description test event");
    cy.get("#form_in_modal_dateEvent").click();
    cy.get("#form_in_modal_dateEvent").clear().type("2022/06/12");
    cy.get("#form_in_modal_dateEvent").type("{enter}");
    cy.get(".ant-select-selector").click();
    cy.wait(2000);
    cy.findByTestId("option-Tous").click();
    cy.get(".ant-modal-footer > .ant-btn-primary").click();
  });
  it.skip("Edit event", () => {
    cy.get(
      ":nth-child(3) > .ant-card > .ant-card-actions > :nth-child(2) > :nth-child(1) > .anticon"
    ).click();
    cy.wait(2000);
    cy.get("#form_in_modal_title").clear().type("update event");
    cy.get(".ant-modal-footer > .ant-btn-primary").click();
  });
  it("Details event", () => {
    cy.get(
      ":nth-child(3) > .ant-card > .ant-card-actions > :nth-child(3) > :nth-child(1) > .anticon"
    ).click();
    cy.wait(2000);
    cy.get(".ant-modal-footer > .ant-btn-primary").click();
  });
  it.skip("Delete event", () => {
    cy.get(
      ":nth-child(3) > .ant-card > .ant-card-actions > :nth-child(1) > :nth-child(1) > .anticon"
    ).click();
    cy.wait(2000);
  });

  it("Empty event to add ", () => {
    cy.get("#AddBtn").click();
    cy.get(".ant-modal-footer > .ant-btn-primary").click();
    cy.wait(500);
    cy.get(".ant-modal-close-x").click();
  });
});
