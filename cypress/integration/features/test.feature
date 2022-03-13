Feature: Authentication Functionality

    Scenario: Successful login
        Given I am on login page
        And I provide valid username
        And I provide valid password
        When I click on "Login" button
        Then verify dashboard is shown

    Scenario: Successful logout
        Given I am on dashboard page
        And I click on the profile dropdown menu
        When When I click on "Log out" button
        Then verify dashboard is shown

    Scenario: Unsuccessful login with invalid username
        Given I am on login page
        And I provide invalid username
        And I provide invalid password
        When I click on "Login" button
        Then verify error message is shown


Feature: Support Form

    Scenario: Fill out Support form with general question
        Given I am on login page
        And I click on "Support" button
        And I fill out user information
        And I select the option to ask a question (General)
        And I write a message in the Message box
        And I enter the text from CAPTCHA field
        And I click on "Send" button
        Then verify message that the request has been sent is shown

    Scenario: Fill out Support form with a report for technical issue
        Given I am on login page
        And I click on "Support" button
        And I fill out user information
        And I select the option to report a techhnical issue
        And I write a message in the Message box
        And I enter the text from CAPTCHA field
        And I click on "Send" button
        Then verify message that the request has been sent is shown


Feature: API functionality

    Scenario: Request top rated movies
        Given I have vaild api key
        When I send a request to the API
        Then verify list of top rated movies is received

    Scenario: Rate a movie
        Given I have valid api key
        And I get valid token
        And I authorize the token
        And I get a valid session invalid
        When I submit movie rating to the API
        Then verify success message
