import { Page, Locator } from 'playwright';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  productCard(nombre: string): Locator {
    return this.page
      .locator('[data-test="inventory-item"]')
      .filter({ has: this.page.getByText(nombre, { exact: true }) });
  }

  productButton(nombre: string): Locator {
    return this.productCard(nombre).locator('button');
  }

  async addToCart(nombre: string) {
    await this.productButton(nombre).click();
  }

  async goToCart() {
    await this.cartLink.click();
  }
}