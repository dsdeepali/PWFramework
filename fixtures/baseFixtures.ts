import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AddUserPage } from '../pages/AddUser';
import { env } from '../config.env';

type MyFixtures = {
  loginPage: LoginPage;
  addUserPage: AddUserPage;
};

export const test = base.extend<MyFixtures>({

  loginPage: async ({ page }, use) => {

    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(env.username!, env.password!);
    await use(loginPage);
  },

  addUserPage: async ({ page }, use) => {
    const addUserPage = new AddUserPage(page);
    await use(addUserPage);
  }

});

export { expect };