/// <reference types="cypress" />

describe("01. [UI] Bynder Authentication", () => {
  before(() => {
    cy.exec("npm cache clear --force");
  });
  beforeEach(() => {
    cy.bynder_start();
  });

  describe("[01a] UI Bynder - Authentication - login and logout", () => {
    it("[1a.1] Successful login and logout", function() {
      const fx = require("../../fixtures/01_Bynder_login_form.json");
      cy.bynder_fill_out_credentials(fx.validCredentials)
        .bynder_check_route(fx.routes.dashboard)
        .bynder_logout()
        .bynder_check_route(fx.routes.login);
    });

    it("[1a.2] Unsuccessful login - invalid credentials", function() {
      const fx = require("../../fixtures/01_Bynder_login_form.json");
      cy.bynder_fill_out_credentials(fx.invalidCredentials)
        .bynder_check_route(fx.routes.login, fx.routes.verify);
    });
  });
});
