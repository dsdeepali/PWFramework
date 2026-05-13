import { setWorldConstructor } from '@cucumber/cucumber';
import { Page } from '@playwright/test';
import { AddUserPage } from '../pages/AddUser';
import { CommonPage } from '../pages/CommonPage';

export class CustomWorld {
  page!: any;
  addUserPage!: any;
  commonPage!: CommonPage; 
  username?: string;
}

setWorldConstructor(CustomWorld);