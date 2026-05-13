import { expect, test} from '../fixtures/baseFixtures';
import { LoginPage } from '../pages/LoginPage';

test('verify valid login', async ({ page, loginPage }) => {

  await expect(page.getByRole('heading', {
    name: 'Dashboard'
  })).toBeVisible();

});

test('verify invalid login', async ({ page, baseURL }) => {

  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login('Admin', 'wrongpassword');
  await loginPage.verifyErrorMessage();

});