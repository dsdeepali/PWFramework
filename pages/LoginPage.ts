import { Page } from '@playwright/test';
import { test, expect } from '../fixtures/baseFixtures';
import { env } from '../config.env';

export class LoginPage {

  constructor(public page: Page) {}

 async open() {
 await this.page.goto(env.baseUrl);
 }

 async login(username: string | undefined, password: string | undefined) {
 await this.page.getByPlaceholder('Username').fill(username || '');
 await this.page.getByPlaceholder('Password').fill(password || '');
 await this.page.getByRole('button', { name: 'Login' }).click();
}

 async verifyErrorMessage() {
 const error = this.page.locator('.oxd-alert-content-text');
 await expect(error).toContainText('Invalid');
  }
}
