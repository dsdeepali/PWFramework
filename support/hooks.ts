import { Before, After, Status } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import { setDefaultTimeout } from '@cucumber/cucumber';
import { AddUserPage } from '../pages/AddUser';
import { CommonPage } from '../pages/CommonPage';
import fs from 'fs';

setDefaultTimeout(parseInt(process.env.DEFAULT_TIMEOUT || '80000'));
import dotenv from "dotenv";
import { LoginPage } from '../pages/LoginPage';
dotenv.config();

Before(async function () {
  this.browser = await chromium.launch({ headless: false });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
  this.loginPage = new LoginPage(this.page);
  this.addUserPage = new AddUserPage(this.page);
  this.commonPage = new CommonPage(this.page);
});

After(async function (scenario) {
  try {
    if (scenario.result?.status === Status.FAILED) {
      if (!fs.existsSync('screenshots')) {
        fs.mkdirSync('screenshots');
      }

      const fileName = `${scenario.pickle.name.replace(/ /g, '_')}-${Date.now()}.png`;
      const path = `screenshots/${fileName}`;

      if (this.page) {
        const screenshot = await this.page.screenshot({ fullPage: true });
        await this.page.screenshot({ path, fullPage: true });
        await this.page.attach(screenshot, 'image/png');
        console.log('Screenshot saved:', path);
      }
    }

    if (this.authState === 'loggedIn') {
      await this.CommonPage.logout();
      }
   } 
     finally {
    if (this.context) {
      await this.context.close();
    }
    if (this.browser) {
      await this.browser.close();
    }
  }
});