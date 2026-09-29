import { Before, After, setDefaultTimeout, Status } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import { CustomWorld } from './world';

setDefaultTimeout(30 * 1000);

Before(async function (this: CustomWorld) {
    this.browser = await chromium.launch({
    headless: process.env.HEADLESS === 'true',
    slowMo: Number(process.env.SLOWMO ?? 0)
  });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

After(async function (this: CustomWorld, scenario) {
  if (scenario.result?.status === Status.FAILED) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    this.attach(screenshot, 'image/png');
  }
  await this.context.close();
  await this.browser.close();
});