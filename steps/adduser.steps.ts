import { Given, When } from '@cucumber/cucumber';
import { AddUserPage } from '../pages/AddUser';
import { LoginPage } from '../pages/LoginPage';
import { CustomWorld } from '../support/world';
import { env } from '../config.env';

Given('I am logged in as {string} with {string}', 
  async function (username: string, password: string) {
  await this.page.goto(env.baseUrl);
  const loginPage = new LoginPage(this.page);
  await loginPage.login(username, password);
});

Given('I am on the user management page', async function () {
  this.addUserPage = new AddUserPage(this.page);
  await this.addUserPage.navigateToAddUser();
});

When('I add a new user with role {string}', async function (role: string) {
  await this.addUserPage.setUserRole(role);
});

When('I provide employee name', async function () {
  await this.addUserPage.enterEmployeeName();
});

When('I set status to {string}', async function (status: string) {
  await this.addUserPage.selectStatus(status);
});

When('I enter username', async function () {
  await this.addUserPage.enterUsername();
});

When('I enter password {string}', async function (password) {
  await this.addUserPage.enterPassword(password);
});

When('I confirm password {string}', async function (confirmPassword) {
  await this.addUserPage.confirmPassword(confirmPassword);
});

When('I save the user', async function () {
  await this.addUserPage.clickSave();
});

When('the username should be created successfully', async function () {
  await this.addUserPage.verifyUserCreated(this.username);
});