import "@testing-library/cypress/add-commands";
import moment from "moment";

Cypress.Commands.add("selectDropdown", (testId, optionText) => {
  cy.get(testId).click({ force: true });

  return cy
    .get(".ant-select-dropdown :not(.ant-select-dropdown-hidden)")
    .find(".ant-select-item-option")
    .each((el) => {
      if (el.text() === optionText) {
        cy.wrap(el).click({ force: true });
      }
    });
});
Cypress.Commands.add("multipleSelect", (testId, optionText) => {
  cy.get(testId).click({ force: true });

  return cy
    .get(".ant-select-dropdown :not(.ant-select-dropdown-hidden)")
    .find(".ant-select-item-option")
    .each((el) => {
      if (optionText.includes(el.text())) {
        cy.wrap(el).click({ force: true });
      }
    });
});

Cypress.Commands.add("multiSelect", (selector, text) => {
  cy.get(".ant-select-selector > .ant-select-selection-overflow").click();
  cy.get(".ant-select-selection-search input").clear();
  cy.get(".ant-select-selection-search input")
    .invoke("attr", "id")
    .then((selElm) => {
      const dropDownSelector = `#${selElm}_list`;
      cy.get(`.ant-select${selector} .ant-select-selection-search input`).type(
        `${text}`
      );
      cy.get(dropDownSelector)
        .next()
        .find(".ant-select-item-option-content")
        .click({ force: true });
    });
});
const LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add("saveLocalStorage", () => {
  Object.keys(localStorage).forEach((key) => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add("restoreLocalStorage", () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});
Cypress.Commands.add("deadlineDate", () =>
  moment().format("YYYY-MM-DD hh:mm:ss")
);
