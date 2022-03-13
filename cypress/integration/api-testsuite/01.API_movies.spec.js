/// <reference types='Cypress' />

beforeEach(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
});

describe("01. [API] TMDB - Movies", () => {
  describe("[01a] API TMDB - Get top rated movies", () => {
    it("[1a.1] Request to get all top rated movies", function () {
      cy.tmdb_getTopRatedMovies_API();
    });
  });

  describe("[01b] API TMDB - Submit movie rating", () => {
    it("[1b.1] Start a session and rate a movie", function () {
      const fx = require("../../fixtures/03_TMDB_input_data.json");
      cy.tmdb_generateAccessToken_API()
        .tmdb_login(fx.credentials)
        .tmdb_authorizeToken()
        .tmdb_createSession_API()
        .tmdb_rateMovie_API(fx.rating);
    });
  });
});
