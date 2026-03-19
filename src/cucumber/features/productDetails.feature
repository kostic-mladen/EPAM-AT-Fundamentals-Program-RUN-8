Feature: UC-1: Product Details Verification
  As a user I want to verify that product details match data in the inventory page

  Scenario Outline: Verify product details and add to cart
    Given I am logged in as standard user
    When I navigate to the details page for "<product>"
    Then the price on the details page should match the inventory page
    And the description on the details page should match the inventory page
    And I add the product to the cart from the details page
    Then the cart count should be 1

    Examples:
      | product                  |
      | Sauce Labs Fleece Jacket |
