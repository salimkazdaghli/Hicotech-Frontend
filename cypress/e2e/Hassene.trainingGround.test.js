describe("testing crud training ground", () => {
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

  it("should display input validation error on on when providingempty form", () => {
    cy.wait(1000);
    cy.findByTestId("trainingGroundMenu").click();
    cy.wait(1000);
    cy.url().should(
      "eq",
      "http://localhost:3000/coach/dashboard/gerer/lieuEntrainement"
    );
    cy.findByTestId("AddTrainingGroundId").click();
    cy.get(".ant-modal-footer > .ant-btn-primary").click();
    cy.wait(1500);
    cy.get(".ant-form-item-explain-error").should("exist");
    cy.get(
      ":nth-child(1) > .ant-col-24 > .ant-form-item-explain > .ant-form-item-explain-error"
    ).should("exist");
    cy.get(
      ":nth-child(2) > .ant-col-24 > .ant-form-item-explain > .ant-form-item-explain-error"
    ).should("exist");
  });

  it("should add a training ground", () => {
    cy.wait(2000);
    cy.findByTestId("AddTrainingGroundId");
    cy.selectDropdown("#Ajouter_lieu_entainement_city", "Bizerte");
    cy.get("#Ajouter_lieu_entainement_address").type("lieu d'entrainement");
    cy.get(".ant-modal-footer > .ant-btn-primary").click();
    cy.get(".ant-message-custom-content > :nth-child(2)")
      .contains("Le lieu d'entainement a été ajouté avec succès.")
      .should("exist");
  });

  it("should update training ground( first row )", () => {
    cy.wait(2000);
    cy.get("table > tbody > tr:nth-child(1) > td:nth-child(4)").within(() => {
      cy.findByTestId("updateTrainingGroundBtn").click();
    });
    cy.selectDropdown(
      "tbody > tr:nth-child(1) > td:nth-child(1) > div > div > div > div > div > div > span.ant-select-selection-item",
      "Ariana"
    );
    cy.get("  table > tbody > tr:nth-child(1) > td:nth-child(4)").within(() => {
      cy.findByTestId("validateTrainingGroundUpdate").click();
    });
    cy.wait(1000);
    cy.get(".ant-message-custom-content > :nth-child(2)")
      .contains("l’emplacement a été mis à jour avec succès")
      .should("exist");
  });
  it("should delete training ground( first row )", () => {
    cy.wait(2000);
    cy.get("table > tbody > tr:nth-child(1) > td:nth-child(4)").within(() => {
      cy.findByTestId("deleteTrainingGroundBtn").click();
    });
    cy.get(".ant-modal-confirm-btns > .ant-btn-dangerous").click();
    cy.wait(1000);
    cy.get(".ant-message-custom-content > :nth-child(2)")
      .contains("Lieu supprimé avec succès !")
      .should("exist");
  });
});
