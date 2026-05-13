export class CommonPage {
  constructor(private page: any) {}

  async logout() {
    await this.page.locator('.oxd-userdropdown-tab').click();
    await this.page.getByText('Logout').click();
    await this.page.waitForLoadState('networkidle');
  }
}