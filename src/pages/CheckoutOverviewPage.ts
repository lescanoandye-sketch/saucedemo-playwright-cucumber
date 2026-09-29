import { Page, Locator } from 'playwright';

export class CheckoutOverviewPage {
  readonly page: Page;
  readonly title: Locator;
  readonly items: Locator;
  readonly totalLabel: Locator;
  readonly finishButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.items = page.locator('[data-test="inventory-item"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
    this.finishButton = page.locator('[data-test="finish"]');
  }

  item(nombre: string): Locator {
    return this.items.filter({ has: this.page.getByText(nombre, { exact: true }) });
  }

  async finish() {
    await this.finishButton.click();
  }
}