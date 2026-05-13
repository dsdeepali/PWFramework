import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AddUserPage } from '../pages/AddUser';
import { env } from '../config.env';

test('verify add user flow', async ({ page }) => {

  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login(env.username!, env.password!);
  await page.getByRole('link', { name: 'Admin' }).click();
  await expect(page).toHaveURL(/viewSystemUsers/);

  const addUserPage = new AddUserPage(page);
  await page.getByRole('button', { name: 'Add' }).click();
  await addUserPage.setUserRole('Admin');
  await addUserPage.enterEmployeeName();
  await addUserPage.selectStatus('Enabled');
  await addUserPage.enterUsername();
  await addUserPage.enterPassword(env.testPassword);
  await addUserPage.confirmPassword(env.confirmPassword);
  await addUserPage.clickSave();
  await addUserPage.verifyUserCreated();
});