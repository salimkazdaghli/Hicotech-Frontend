// const email = "hassene.ayoub@yahoo.fr";
// const password = "123456";
// Cypress.Commands.add("login", () => {
//   cy.session([email, password], () => {
//     cy.visit("/login");
//     cy.get(
//       ":nth-child(3) > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper"
//     ).type(email);
//     cy.get(
//       ":nth-child(4) > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper"
//     ).type(password);
//     cy.get(".ant-btn").click();
//     cy.url().should("eq", "http://localhost:3000/coach/dashboard");
//   });
// });
describe("testing the statistic's CRUD operations", () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });
  it("visit landing page", () => {
    cy.visit("/");
  });
  it("should login successfully and redirect to home page", () => {
    cy.get(
      ":nth-child(3) > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper"
    ).type("hassene.ayoub@yahoo.fr");
    cy.get(
      ":nth-child(4) > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper"
    ).type("123456");

    cy.get(".ant-btn").click();
    cy.url().should("eq", "http://localhost:3000/coach/dashboard");

    // cy.get(".ant-btn").click();
    // cy.url().should(
    //   "eq",
    //   "http://localhost:3000/coach/dashboard/mystatisitcs"
    // );
    cy.wait(200);
  });
  it("should show alert while the statistic form is empty", () => {
    cy.findByTestId("statistic-btn").click();
    cy.wait(200);
    cy.get(".ant-btn").click();
    cy.get(".ant-modal-footer > .ant-btn-primary").click();
    cy.wait(300);
    cy.get(
      ":nth-child(1) > .ant-col-12 > .ant-row > .ant-form-item-control > .ant-form-item-explain > .ant-form-item-explain-error"
    )
      .contains("entrer le nom du statistique!")
      .should("be.visible");
    cy.get(
      ".ant-col-10 > .ant-row > .ant-form-item-control > .ant-form-item-explain > .ant-form-item-explain-error"
    )
      .contains("entrer le type du statistique!")
      .should("be.visible");
    cy.get(
      ":nth-child(2) > :nth-child(1) > .ant-row > .ant-form-item-control > .ant-form-item-explain > .ant-form-item-explain-error"
    )
      .contains("entrer l'unité du statistique!")
      .should("be.visible");
    cy.get(
      ":nth-child(2) > :nth-child(2) > .ant-row > .ant-form-item-control > .ant-form-item-explain"
    )
      .contains("entrer le lien associé au statistique!")
      .should("be.visible");
    cy.get(
      ".ant-col-24 > .ant-row > .ant-form-item-control > .ant-form-item-explain"
    )
      .contains("entrer la description associé au statistique!")
      .should("be.visible");
    cy.wait(200);
  });
  it("should add a single statistic", () => {
    cy.get("#statisticName").type("footing");
    cy.selectDropdown(".ant-select-selection-item", "compteur");
    cy.get("#unit").type("km/h");
    cy.get("#lien").type("https://test.com");
    cy.get("#alerted > :nth-child(2)").click();
    cy.get("#max").should("exist");
    cy.get("#nbreFois").should("exist");
    cy.selectDropdown(
      ":nth-child(1) > .ant-row > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector",
      "maximiser"
    );
    cy.get(".ant-input-number-handler-up").click();
    cy.get(".ant-input-number-handler-up").click();
    cy.get("#description").type(
      "ceci est la description de la statistique footing! "
    );
    cy.get(".ant-modal-footer > .ant-btn-primary").click();
    cy.wait(300);
    cy.findByTestId("statistic-alert").should("exist");
  });
  it("Verify the statistic added element", () => {
    cy.get(".ant-table-container")
      .find("tbody > tr:first-child > td:first-child")
      .should("have.text", "footing");
    cy.get(".ant-table-container")
      .find("tbody > tr:first-child > td:nth-child(2)")
      .should("have.text", "compteur");
    cy.get(".ant-table-container")
      .find("tbody > tr:first-child > td:nth-child(3)")
      .should("have.text", "km/h");
    cy.get(".ant-table-container")
      .find("tbody > tr:first-child >td:nth-child(4)")
      .should(
        "have.text",
        "ceci est la description de la statistique footing! "
      );
    cy.get(".ant-table-container")
      .find("tbody > tr:first-child >td:nth-child(5)")
      .should("have.text", "oui");
    cy.get(".ant-table-container")
      .find("tbody > tr:first-child >td:nth-child(6)")
      .should("have.text", "maximiser");
    cy.get(".ant-table-container")
      .find("tbody > tr:first-child >td:nth-child(7)")
      .should("have.text", "3 fois");
    cy.wait(1500);
  });
  it("update a statistic element", () => {
    cy.get(
      "tbody > tr:first-child >td:nth-child(8) > .anticon-edit > svg"
    ).click();
    // cy.get(".ant-table-container")
    //   .find("tbody > tr:first-child > td:first-child")
    //   .should("have.text", "footing");
    // cy.get(".ant-table-container")
    //   .find(
    //     "tbody > tr:first-child > td:nth-child(2)>> .ant-form-item-control-input >."
    //   )
    //   .should("have.text", "compteur");
    cy.get(".ant-table-container")
      .find(
        "tr:nth-child(1) > td:nth-child(1) > div > div > div > div> #statisticName"
      )
      .clear()
      .type("footing modifier");
    cy.selectDropdown(
      "tr:nth-child(1) > td:nth-child(2) > div > div > div > div > div > div > span.ant-select-selection-item",
      "Timer"
    );
    cy.get(".ant-table-container")
      .find(
        "tbody > tr:nth-child(1) > td:nth-child(3) > div > div > div > div>#unit"
      )
      .clear()
      .type("Mile/h");
    cy.get(".ant-table-container")
      .find(
        "tbody > tr:nth-child(1) > td:nth-child(7) > div > div > div > div > div > div.ant-input-number-handler-wrap"
      )
      .click();
    cy.wait(200);
    cy.get(":nth-child(8) > div > .ant-btn > .anticon").click();
    cy.wait(500);
    cy.findByTestId("statistic-alert").should("exist");
  });
  it("should delete a single statistic", () => {
    cy.get(
      "tbody > tr:nth-child(1) > td:nth-child(8) > span.anticon.anticon-delete > svg"
    ).click();
    cy.wait(500);
    cy.get(
      ":nth-child(7) > .ant-modal-root > .ant-modal-wrap > .ant-modal > .ant-modal-content > .ant-modal-body"
    ).should("be.visible");
    cy.get(".ant-btn-dangerous > span").click();
    cy.wait(500);
  });
});
