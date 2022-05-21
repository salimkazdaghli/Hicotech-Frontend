import "@testing-library/cypress/add-commands";

function selectDropdown(testId, optionText) {
  // open select
  cy.get(testId.toString()).click();

  return cy
    .get(".ant-select-dropdown :not(.ant-select-dropdown-hidden)")
    .find(".ant-select-item-option")
    .each((el) => {
      if (el.text() === optionText) {
        cy.wrap(el).click();
      }
    });
}
Cypress.Commands.add("selectDropdown", (testId, optionText) => {
  cy.get(testId).click();

  return cy
    .get(".ant-select-dropdown :not(.ant-select-dropdown-hidden)")
    .find(".ant-select-item-option")
    .each((el) => {
      if (el.text() === optionText) {
        cy.wrap(el).click();
      }
    });
});
