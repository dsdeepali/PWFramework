import {Page, Locator, expect} from '@playwright/test';

type flexibleLocator = string | Locator;

export class ElementUtil {
    private page: Page;
    private defaultTimeout: number= 30000;

    constructor(page: Page, timeOut: number = 30000) {
        this.page = page;
        this.defaultTimeout = timeOut;
    }
    public getLocator(locator: flexibleLocator): Locator {
        if (typeof locator === 'string') {
            return this.page.locator(locator);
        }
        return locator;
    }
    async click(locator:flexibleLocator, options?: {force: boolean; timeout?: number}):Promise<void> {
        await this.getLocator(locator).click({
            force: options?.force,
            timeout: options?.timeout || this.defaultTimeout
        });
        console.log(`Clicked on element: ${locator}`);
}
async rightClick(locator: flexibleLocator):Promise<void> {
    await this.getLocator(locator).click({
        button: 'right',
        timeout: this.defaultTimeout
    });
    console.log(`Right Clicked on element: ${locator}`);
}

async fill(locator: flexibleLocator, text: string): Promise<void> {
    await this.getLocator(locator).waitFor({state: 'visible', timeout: this.defaultTimeout});
    await this.getLocator(locator).fill(text, { timeout: this.defaultTimeout });
    console.log(`Filled "${text}" into locator: ${locator}`);

}
async getText(locator: flexibleLocator): Promise<string> {
    const text = await this.getLocator(locator).textContent({timeout: this.defaultTimeout});
    return text || '';
}

async isHidden(locator: flexibleLocator): Promise<boolean> {
    return await this.getLocator(locator).isHidden({timeout: this.defaultTimeout});
}
async isEnabled(locator: flexibleLocator): Promise<boolean> {
    return await this.getLocator(locator).isEnabled({timeout: this.defaultTimeout});
}
async isDisabled(locator: flexibleLocator): Promise<boolean> {
    return await this.getLocator(locator).isDisabled({timeout: this.defaultTimeout});
}
async isChecked(locator: flexibleLocator): Promise<boolean> {
    return await this.getLocator(locator).isChecked({timeout: this.defaultTimeout});
}
async isEditable(locator: flexibleLocator): Promise<boolean> {
    return await this.getLocator(locator).isEditable({timeout: this.defaultTimeout});
}
//====== Wait Methods =====//
async waitForElementVisible(locator: flexibleLocator,timeout: number=5000):Promise<boolean> {
    try {
        await this.getLocator(locator).waitFor({state: 'visible', timeout});
        console.log (`Element is visible`);
        return true;
    } 
    catch {
        return false;
}
}
async waitForElementAttached(locator: flexibleLocator,timeout: number=5000):Promise<boolean> {
    try {
        await this.getLocator(locator).waitFor({state: 'attached', timeout});
        console.log (`Element is attached`);
        return true;
    } 
    catch {
        return false;
}
}
//wait for page load//
    async waitForPageLoad(state: 'load' | 'domcontentloaded' | 'networkidle' = 'load'): Promise<void> {
        await this.page.waitForLoadState(state);
        console.log(`Page load state: ${state}`);
    }

//wait for specific timeout//
    async sleep(timeout: number): Promise<void> {
        this.page.waitForTimeout(timeout);
        console.log(`waited for: ${timeout} ms`);
    }
}