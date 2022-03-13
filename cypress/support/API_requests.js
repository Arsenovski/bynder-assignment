/// <reference types="cypress" />
"use strict";
/*****************************************************************************
 * Initialize Helper & Routing functions, Declare Environment Variables
 *****************************************************************************/
let token;
let session_id;

const apikey = Cypress.env('apiKey');
const api_url = Cypress.env('apiUrl');

/*****************************************************************************
 * API REQUESTS: 1. THE MOVIE DB - GET TOP RATED MOVIES
 *****************************************************************************/

// Get Top Rated Movies API
Cypress.Commands.add(
  "tmdb_getTopRatedMovies_API",
  () => {
    cy.request({
      url: api_url + "/movie/top_rated",
      method: "GET",
      qs: {
        api_key: apikey
      },
    }).then((response) => {
      switch (response.status) {
          case 400: 
            expect(response.status, "Get Top Rated Movies API response status").to.equal(400);
            cy.log("Requested resource not found.");
            break;
          case 401:
            expect(response.status, "Get Top Rated Movies API response status").to.equal(401);
            cy.log("Unauthorized request.");
            break;
          default:
            expect(response.status, "Get Top Rated Movies API response status").to.equal(200);   
            expect(response.body.results, "List of top movies").to.be.a('array');
            cy.wrap(response.body.results[0])
            .its('original_title')
            .should('not.be.empty')
            .and('equal', 'The Shawshank Redemption');     
      }  
    });
  }
);

/*****************************************************************************
 * API REQUESTS: 2. THE MOVIE DB - AUTHENTICATE AND AUTHORIZE
 *****************************************************************************/

// Generate Access Token API
Cypress.Commands.add(
    "tmdb_generateAccessToken_API",
    () => {      
      cy.request({
        url: api_url + "/authentication/token/new",
        method: "GET",
        qs: {
            api_key: apikey
        }
      }).then((response) => {
        if(response.body.success){
            Cypress.env('token', response.body.request_token);
        } else {
            cy.log(response.body.status_message);    
        }
      });
    }
  );

 // Create Session API
Cypress.Commands.add(
    "tmdb_createSession_API",
    () => {      
      cy.request({
        url: api_url + "/authentication/session/new",
        method: "POST",
        qs: {
            api_key: apikey,
        },
        body: {
            "request_token": Cypress.env('token')
        }
      }).then((response) => {
        if(response.body.success){
            session_id = response.body.session_id;
        } else {
            cy.log(response.body.status_message);    
        }
      });
    }
  ); 

/*****************************************************************************
 * API REQUESTS: 2. THE MOVIE DB - RATE A MOVIE
 *****************************************************************************/

// Rate Movie API
Cypress.Commands.add(
    "tmdb_rateMovie_API",
    rating => {      
      cy.request({
        url: api_url + `/movie/${rating.movieId}/rating`,
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        qs: {
            api_key: apikey,
            session_id: session_id
        },
        body: {
            "value": rating.value
        }
      }).then((response) => {
        console.log(response);
      });
    }
  );
