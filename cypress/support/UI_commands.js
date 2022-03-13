/// <reference types="cypress" />
"use strict";
/*****************************************************************************
 * Initialize Helper & Routing functions, Declare Environment Variables
 *****************************************************************************/
const selectors = require("../fixtures/selectors.json");

const base_url = Cypress.env("bynderUrl");
const tmdb_url = Cypress.env("tmdbUrl");

/******************************************************************************
 * BYNDER - LOGIN - Custom Commands
 *****************************************************************************/

Cypress.Commands.add("bynder_start", () => {
  // Clear session storage before visit
  const options = {
    onBeforeLoad: win => {
      win.sessionStorage.clear();
    }
  };

  // Clear cookies and session storage and visit home page.
  cy.clearCookies();
  cy.clearLocalStorage();

  // Navigate to Bynder url
  cy.visit(`${base_url}`, options);
});

Cypress.Commands.add("bynder_fill_out_credentials", credentials => {
  // Fill out username
  cy.get(selectors["inputEmail"]).type(credentials.userName);

  // Fill out password
  cy.get(selectors["inputPassword"]).type(credentials.password);

  // Click the 'Login' button
  cy.get(selectors["loginButton"])
    .should("contain", "Login")
    .click();
});

Cypress.Commands.add("bynder_check_route", (expectedRoute, fallback) => {
  // Check if navigating to specific url
  cy.url().should($url => {
    return $url.includes(expectedRoute) || $url.includes(fallback);
  });
});

Cypress.Commands.add("bynder_logout", () => {
  // Open profile dropdown
  cy.get(selectors["profileIcon"]).click();

  // Click the 'Logout' button
  cy.get(selectors["logOutButton"]).click();
});

/******************************************************************************
 * BYNDER - SUPPORT - Custom Commands
 *****************************************************************************/

Cypress.Commands.add("bynder_navigate_to_support_form", () => {
  // Navigate to support form
  cy.get(selectors["supportButton"])
    .should("contain", "Support")
    .click();
});

Cypress.Commands.add(
  "bynder_support_fill_out_user_information",
  userInformation => {
    // Fill out username
    cy.get(selectors["supportName"]).type(userInformation.name);

    // Fill out email
    cy.get(selectors["supportEmail"]).type(userInformation.email);
  }
);

Cypress.Commands.add("bynder_support_fill_out_content", (label, message) => {
  if (label.includes("General")) {
    // Select label - "I have a question (General)"
    cy.get(selectors["label"]).select("contentsupport");
  } else {
    // Select label - "I want to report a technical issue"
    cy.get(selectors["label"]).select("techsupport");
  }

  // Confirm the selected value
  cy.get(selectors["label"])
    .invoke("text")
    .should("contain", label);

  // Enter support request message.
  cy.get(selectors["supportMessage"]).type(message);
});

/******************************************************************************
 * TMDB - Custom Commands
 *****************************************************************************/

Cypress.Commands.add("tmdb_login", credentials => {
  // Navigate to TMDB login page
  cy.visit(`${tmdb_url}/login`);

  // Fill out username
  cy.get(selectors["tmdbUsername"]).type(credentials.username);

  // Fill out password
  cy.get(selectors["tmdbPassword"]).type(credentials.password);

  // Click 'Login' button
  cy.get(selectors["tmdbLoginButton"]).click();
});

Cypress.Commands.add("tmdb_authorizeToken", () => {
  cy.visit(`${Cypress.env("tmdbUrl")}/authenticate/${Cypress.env("token")}`);
  cy.get(selectors["approveButton"]).click();
});
