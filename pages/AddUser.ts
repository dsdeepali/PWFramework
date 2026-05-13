import { Page, expect } from '@playwright/test';

export class AddUserPage {
  constructor(private page: Page) {}

  async navigateToAddUser() {
    await this.page.getByRole('link', { name: 'Admin' }).click();
    await expect(this.page).toHaveURL(/viewSystemUsers/);
    await this.page.getByRole('button', { name: 'Add' }).click();
    await expect(this.page).toHaveURL(/saveSystemUser/);
  }

async setUserRole(role: string) {
  const dropdown = this.page.locator('.oxd-select-text').first();
  await dropdown.click({ force: true });
  const option = this.page.getByRole('option', { name: role });
  await option.waitFor({ state: 'visible' });
  await option.click();
}

async enterEmployeeName() {
  const input = this.page.locator('input[placeholder="Type for hints..."]');
  const options = this.page.locator('.oxd-autocomplete-option');
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const randomLetter = letters[Math.floor(Math.random() * letters.length)];

  await input.fill(randomLetter);
  await expect(options.first()).not.toContainText('Searching');
  await options.first().click();
  await expect(input).not.toHaveValue(randomLetter);
}

  async selectStatus(status: string) {
    await this.page.locator('.oxd-select-text').nth(1).click();
    await this.page.getByRole('option', { name: status }).click();
  }

  async enterUsername() {
  const username = `user_${Date.now()}`;
  const usernameInput = this.page.locator('input.oxd-input.oxd-input--active').nth(0);
  await usernameInput.click();
  await usernameInput.fill(username);
  }

  async enterPassword(password: string) {
    const inputs = this.page.locator('input[type="password"]');
    await inputs.first().fill(password);
  }

  async confirmPassword(password: string) {
    const inputs = this.page.locator('input[type="password"]');
    await inputs.last().fill(password);
  }

  async clickSave() {
    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  async verifyUserCreated() {
    const toast = this.page.locator('.oxd-toast-content');
    await expect(toast).toBeVisible();
    await expect(toast).toContainText('Successfully Saved');
  }
}