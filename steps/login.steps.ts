import { Given, When,Then } from '@cucumber/cucumber';
import { LoginPage } from '../pages/LoginPage';
import { env } from '../config.env';
import { expect } from '@playwright/test';
import { CommonPage } from '../pages/CommonPage';

Given('I open login page', async function () {
  await this.page.goto(env.baseUrl);
});

When('I login with {string} and {string}', async function (username, password) {
  const loginPage = new LoginPage(this.page);
  await loginPage.login(username, password);
  this.authState = 'loggedIn';
});

Then('I should see the {string}', async function (result) {

  if (result === 'dashboard') {
    await expect(this.page).toHaveURL(/dashboard/);
  } else {
    const invalidLogin = new LoginPage(this.page);
    await invalidLogin.verifyErrorMessage();
  }

});