Feature: Footer Social Links
  As a user I want to verify that social links exist and redirect correctly

  Scenario: Verify Twitter link exists and redirects correctly
    Given I am logged in as standard user
    When I scroll to the footer
    Then the Twitter link should be displayed with the correct href
    And clicking the Twitter link should open the correct URL in a new tab

  Scenario: Verify Facebook link exists and redirects correctly
    Given I am logged in as standard user
    When I scroll to the footer
    Then the Facebook link should be displayed with the correct href
    And clicking the Facebook link should open the correct URL in a new tab

  Scenario: Verify LinkedIn link exists and redirects correctly
    Given I am logged in as standard user
    When I scroll to the footer
    Then the LinkedIn link should be displayed with the correct href
    And clicking the LinkedIn link should open the correct URL in a new tab
