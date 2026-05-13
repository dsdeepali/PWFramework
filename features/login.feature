@login
Feature: Login

  Scenario Outline: Login functionality
    Given I open login page
    When I login with "<username>" and "<password>"
    Then I should see the "<result>"

    Examples:
      | username | password      | result              |
      | Admin    | admin123      | dashboard           |
      | Admin    | wrongpassword | Invalid credentials |