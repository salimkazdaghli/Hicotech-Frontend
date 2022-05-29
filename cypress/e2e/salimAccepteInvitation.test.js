describe("testing invitation ", () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it("visit mail  page", () => {
    cy.visit("https://mailtrap.io/inboxes");
    cy.wait(500);
    cy.get("#user_email").type("hicotechisamm@gmail.com");
    cy.wait(500);
    cy.get(".login_next_button").click();
    cy.wait(500);
    cy.get("#user_password").type("12345678");
    cy.wait(500);
    cy.get(".login_password > :nth-child(3) > .button").click();
    cy.wait(1000);
    cy.get(".inbox_name").click();
    cy.wait(1000);
    cy.get(":nth-child(1) > .i18m0o91").click();
    cy.wait(1000);
  });
  it("visit invitation page", () => {
    cy.visit("http://127.0.0.1:3000/invitation/629392d2e89bbb94ce13fc53");
    cy.wait(500);
    cy.get(".ant-btn-primary").click();
  });
  it("should register a user successfully and redirect to home page", () => {
    cy.selectDropdown("#normal_register_sexe", "Homme");
    cy.wait(500);
    cy.get(".ant-picker-input").click();
    cy.get(
      ".ant-picker-body > table > tbody > tr:nth-child(2) > td:nth-child(1)"
    ).click();
    cy.selectDropdown("#normal_register_city", "Bizerte");
    cy.wait(500);
    cy.get("#normal_register_password").focus().clear().type("123456");
    cy.wait(500);
    cy.get("#normal_register_confirm").focus().clear().type("123456");
    cy.wait(500);
    cy.get(".ant-btn").click();
    cy.url().should("eq", "http://localhost:3000/joueur/dashboard/");
  });
});
