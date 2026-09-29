import { Page, Locator } from 'playwright';

export class CheckoutCompletePage {
  readonly page: Page;
  readonly completeHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.completeHeader = page.locator('[data-test="complete-header"]');
  }
}