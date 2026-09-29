import { Page, Locator } from 'playwright';

export class CartPage {
  readonly page: Page;
  readonly title: Locator;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  item(nombre: string): Locator {
    return this.cartItems.filter({ has: this.page.getByText(nombre, { exact: true }) });
  }

  itemPrice(nombre: string): Locator {
    return this.item(nombre).locator('[data-test="inventory-item-price"]');
  }

  async goToCheckout() {
    await this.checkoutButton.click();
  }
}