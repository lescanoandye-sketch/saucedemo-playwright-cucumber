import { Page, Locator } from 'playwright';

export class CheckoutInfoPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async fillShippingInfo(nombre: string, apellido: string, codigoPostal: string) {
    await this.firstNameInput.fill(nombre);
    await this.lastNameInput.fill(apellido);
    await this.postalCodeInput.fill(codigoPostal);
  }

  async continue() {
    await this.continueButton.click();
  }
}