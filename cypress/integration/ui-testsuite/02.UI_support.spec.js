/// <reference types="cypress" />

//In order for the tests to be complete, the user needs to enter letters from CAPTCHA field and press the Send button.

describe("02. [UI] Support form", () => {
  before(() => {
    cy.exec("npm cache clear --force");
  });
  beforeEach(() => {
    cy.bynder_start();
  });

  describe("Populate Support form", () => {
    it("[2a.1] Populate Support form with general question", () => {
      const fx = require("../../fixtures/02_Bynder_support_form.json");
      cy.bynder_navigate_to_support_form()
        .bynder_support_fill_out_user_information(fx.userInformation)
        .bynder_support_fill_out_content(
          fx.supportContent.labelGeneral,
          fx.supportContent.message
        );
    });

    it("[2a.2] Populate Support form with technical issue", () => {
      const fx = require("../../fixtures/02_Bynder_support_form.json");
      cy.bynder_navigate_to_support_form()
        .bynder_support_fill_out_user_information(fx.userInformation)
        .bynder_support_fill_out_content(
          fx.supportContent.labelTechnical,
          fx.supportContent.message
        );
    });
  });
});
