Feature: UC-2: Footer & Social Links
  As a user I want to verify that social links exist and redirect correctly

  Background:
    Given I am logged in as standard user
    When I scroll to the footer

  Scenario: Verify Twitter link exists and redirects to Twitter's profile page
    Then the Twitter link should be displayed with the Twitter href
    And clicking the Twitter link should open the Twitter/X URL in a new tab

  Scenario: Verify Facebook link exists and redirects to Facebook's profile page
    Then the Facebook link should be displayed with the Facebook href
    And clicking the Facebook link should open the Facebook URL in a new tab

  Scenario: Verify LinkedIn link exists and redirects to LinkedIn's profile page
    Then the LinkedIn link should be displayed with the LinkedIn href
    And clicking the LinkedIn link should open the LinkedIn URL in a new tab
