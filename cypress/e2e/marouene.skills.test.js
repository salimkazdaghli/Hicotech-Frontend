describe("testing the skill's CRUD operations", () => {
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

    cy.wait(200);
  });
  it("should show alert while the skill form is empty", () => {
    cy.findByTestId("skill-btn").click();
    cy.wait(200);
    cy.get(".ant-btn").click();
    cy.get(".ant-modal-footer > .ant-btn-primary").click();
    cy.wait(300);
    cy.get(
      ":nth-child(1) > .ant-col-12 > .ant-row > .ant-form-item-control > .ant-form-item-explain > .ant-form-item-explain-error"
    )
      .contains("entrer le nom du compétence!")
      .should("be.visible");
    cy.get(
      ":nth-child(2) > .ant-col-12 > .ant-row > .ant-form-item-control > .ant-form-item-explain > .ant-form-item-explain-error"
    )
      .contains("entrer le lien associé au compétence!")
      .should("be.visible");
    cy.get(
      ".ant-col-24 > .ant-row > .ant-form-item-control > .ant-form-item-explain"
    )
      .contains("entrer la description associé au compétence!")
      .should("be.visible");
    cy.wait(200);
  });
  it("should add a single skill", () => {
    cy.get("#skillName").type("jump");
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
      "ceci est la description de la compétence jump! "
    );
    cy.get(".ant-modal-footer > .ant-btn-primary").click();
    cy.wait(300);
    cy.findByTestId("skill-alert").should("exist");
  });
  it("Verify the skill added element", () => {
    cy.get(".ant-table-container")
      .find("tbody > tr:first-child > td:first-child")
      .should("have.text", "jump");
    cy.get(".ant-table-container")
      .find("tbody > tr:first-child > td:nth-child(2)")
      .should("have.text", "https://test.com");
    cy.get(".ant-table-container")
      .find("tbody > tr:first-child >td:nth-child(3)")
      .should("have.text", "ceci est la description de la compétence jump! ");
    cy.get(".ant-table-container")
      .find("tbody > tr:first-child >td:nth-child(4)")
      .should("have.text", "oui");
    cy.get(".ant-table-container")
      .find("tbody > tr:first-child >td:nth-child(5)")
      .should("have.text", "maximiser");
    cy.get(".ant-table-container")
      .find("tbody > tr:first-child >td:nth-child(6)")
      .should("have.text", "3 fois");
    cy.wait(1500);
  });
  it("update a skill element", () => {
    cy.get(
      "tbody > tr:first-child >td:nth-child(7) > .anticon-edit > svg"
    ).click();
    cy.get(".ant-table-container")
      .find(
        "tbody > tr:nth-child(1) > td:nth-child(1) > div > div > div > div > #skillName"
      )
      .clear()
      .type("jump modifier");
    cy.get(".ant-table-container")
      .find(
        "tbody > tr:nth-child(1) > td:nth-child(2) > div > div > div > div > #lien"
      )
      .clear()
      .type("https://test2.com");
    cy.get(".ant-table-container")
      .find(
        "tbody > tr:nth-child(1) > td:nth-child(3) > div > div > div > div > #description"
      )
      .clear()
      .type("ceci est la version modifier de la description");
    cy.selectDropdown(
      "tbody > tr:nth-child(1) > td:nth-child(4) > div > div > div > div > div > div > span.ant-select-selection-item",
      "oui"
    );
    cy.selectDropdown(
      "tbody > tr:nth-child(1) > td:nth-child(5) > div > div > div > div > div > div > span.ant-select-selection-item",
      "maximiser"
    );
    cy.wait(200);
    cy.get(".ant-table-container")
      .find(
        "tbody > tr:nth-child(1) > td:nth-child(7) > div > button > span > svg"
      )
      .click();
    cy.wait(500);
    cy.findByTestId("skill-alert").should("exist");
  });
  it("should delete a single statistic", () => {
    cy.get(
      "tbody > tr:nth-child(1) > td:nth-child(7) > span.anticon.anticon-delete > svg"
    ).click();
    cy.wait(500);
    cy.get(":nth-child(7) > .ant-modal-root > .ant-modal-wrap").should(
      "be.visible"
    );
    cy.get(".ant-btn-dangerous > span").click();
    cy.wait(500);
  });
});
