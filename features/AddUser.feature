@adduser
Feature: User Management

  Background:
    Given I am logged in as "Admin" with "admin123"

  Scenario Outline: Add a new user
    When I am on the user management page
    And  I add a new user with role "<userRole>"
    And  I provide employee name
    And  I set status to "<status>"
    And  I enter username
    And  I enter password "<password>"
    And  I confirm password "<confirmPassword>"
    And  I save the user
    Then the username should be created successfully


  Examples:
    | userRole | status      | password         | confirmPassword     |
    | Admin    | Enabled     | Password@123     | Password@123        |