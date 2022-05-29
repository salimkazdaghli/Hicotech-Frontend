describe("testing assigning challenges", () => {
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
    cy.wait(2000);
    cy.findByTestId("emailInput").clear().type("hassene.ayoub@yahoo.fr");
    cy.findByTestId("PasswordInput").clear().type("123456");

    cy.get(".ant-btn").click();
    cy.url().should("eq", "http://localhost:3000/coach/dashboard");
  });
  it("should display input validation error when the assign challenge form is empty", () => {
    cy.findByTestId("assignChallengeMenu").click();
    cy.wait(2000);
    cy.get(".ant-btn").click({ force: true });
    cy.wait(1000);
    cy.get(".ant-modal-footer > .ant-btn-primary").click({ force: true });
    cy.get(
      ":nth-child(1) > .ant-col-24 > .ant-form-item-explain > .ant-form-item-explain-error"
    ).should("exist");
    cy.get(
      ":nth-child(2) > .ant-col-24 > .ant-form-item-explain > .ant-form-item-explain-error"
    ).should("exist");
    cy.get(
      ":nth-child(3) > .ant-col-24 > .ant-form-item-explain > .ant-form-item-explain-error"
    ).should("exist");
  });

  it("should assign a challenge successfully", () => {
    cy.wait(2000);

    cy.get("#playersDropdown").click();
    cy.wait(500);
    cy.multipleSelect("#playersDropdown", [
      "Marouene Ayoub",
      "kazdaghli salim",
    ]);
    cy.wait(1500);
    cy.selectDropdown("#ChallengeDropdown", "20 pushups");
    cy.wait(1500);
    cy.get(".ant-picker-input").click();
    cy.get(
      ".ant-picker-body > table > tbody > tr:nth-child(5) > td:nth-child(5)"
    )
      .click()
      .type("{enter}");
    cy.get(".ant-modal-footer > .ant-btn-primary").click();
    cy.get(".ant-message-custom-content > :nth-child(2)")
      .contains("Le défi a été envoyé")
      .should("exist");
  });
  it("the first table row must correspond to the previously assigned challenge", () => {
    cy.findByTestId("assignChallengeMenu").click();
    cy.wait(2000);
    cy.url().should(
      "eq",
      "http://localhost:3000/coach/dashboard/manageChallenge"
    );
    cy.get(".ant-table-tbody").within(() => {
      cy.get("tr:nth-child(1)").should("exist");
      cy.get("td:nth-child(1) > p").contains("20 pushups").should("exist");
      cy.get("td:nth-child(5) > ul")
        .should("exist")
        .within(() => {
          cy.get("li:nth-child(1)").should("exist").contains("Marouene Ayoub");
          cy.get("li:nth-child(2)").should("exist").contains("kazdaghli salim");
        });
      cy.get("td:nth-child(6) > p").contains("Aucun").should("exist");
    });
  });
  it("should logout", () => {
    cy.wait(2000);
    cy.get(".ant-avatar")
      .trigger("mouseover")
      .then(() => {
        cy.wait(1000);
        cy.findByTestId("logoutBtnCoach").click();
      });
  });

  it("should login as a client and mark previously assigned challenge as done", () => {
    cy.wait(2000);
    cy.findByTestId("emailInput").clear().type("marouene.ayoub@test1.fr");
    cy.findByTestId("PasswordInput").clear().type("123456");

    cy.get(".ant-btn").click();
    cy.url().should("eq", "http://localhost:3000/joueur/dashboard");
    cy.wait(1000);
    cy.findByTestId("MyChallengesMenu").click();
    cy.wait(2000);
    cy.get(":nth-child(1) > .ant-card").should("exist");
    cy.get(
      ":nth-child(1) > .ant-card > .ant-card-head > .ant-card-head-wrapper > .ant-card-head-title > .ant-card-meta > .ant-card-meta-detail > .ant-card-meta-title > .ant-row > :nth-child(1)"
    ).contains("Hassene Ayoub");
    cy.get(
      ":nth-child(1) > .ant-card > .ant-card-body > :nth-child(1) > span"
    ).contains("20 pushups");
    cy.get(
      ":nth-child(1) > .ant-card > .ant-card-actions > li > :nth-child(1) > #MarkDoneBtn"
    ).click();
    cy.get(".ant-message-custom-content > :nth-child(2)")
      .contains("Marqué comme fait avec succès")
      .should("exist");
    cy.wait(2000);
  });
  it("should logout", () => {
    cy.wait(1000);
    cy.get(".ant-space-item > .ant-avatar")
      .trigger("mouseover")
      .then(() => {
        cy.wait(1000);
        cy.findByTestId("logoutBtnPlayer").click();
      });
  });
  it("should coach signin back and check if the user has completed the challenge", () => {
    cy.wait(2000);
    cy.findByTestId("emailInput").clear().type("hassene.ayoub@yahoo.fr");
    cy.findByTestId("PasswordInput").clear().type("123456");

    cy.get(".ant-btn").click();
    cy.url().should("eq", "http://localhost:3000/coach/dashboard");
    cy.findByTestId("assignChallengeMenu").click();
    cy.wait(2000);
    cy.get(".ant-table-tbody").within(() => {
      cy.get("tr:nth-child(1)").should("exist");
      cy.get("td:nth-child(1) > p").contains("20 pushups").should("exist");
      cy.get("td:nth-child(5) > ul")
        .should("exist")
        .within(() => {
          cy.get("li:nth-child(1)").should("exist").contains("Marouene Ayoub");
          cy.get("li:nth-child(2)").should("exist").contains("kazdaghli salim");
        });
      cy.get("td:nth-child(6) > ul > li")
        .contains("Marouene Ayoub")
        .should("exist");
    });
    cy.wait(2000);
  });
});
