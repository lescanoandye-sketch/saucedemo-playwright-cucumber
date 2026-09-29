import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { CartPage } from '../pages/CartPage';
import { CheckoutInfoPage } from '../pages/CheckoutInfoPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';

When('continúa al checkout', async function (this: CustomWorld) {
  await new CartPage(this.page).goToCheckout();
});

When('ingresa sus datos de envío con nombre {string}, apellido {string} y código postal {string}', async function (this: CustomWorld, nombre: string, apellido: string, codigo: string) {
  const checkoutInfoPage = new CheckoutInfoPage(this.page);
  await checkoutInfoPage.fillShippingInfo(nombre, apellido, codigo);
  await checkoutInfoPage.continue();
});

When('finaliza la compra', async function (this: CustomWorld) {
  await new CheckoutOverviewPage(this.page).finish();
});

Then('debería visualizar el mensaje de confirmación {string}', async function (this: CustomWorld, mensaje: string) {
  await expect(this.page).toHaveURL(/checkout-complete\.html/);
  await expect(new CheckoutCompletePage(this.page).completeHeader).toHaveText(mensaje);
});

Then('debería visualizar el resumen de compra con el producto {string}', async function (this: CustomWorld, producto: string) {
  const overviewPage = new CheckoutOverviewPage(this.page);
  await expect(overviewPage.title).toHaveText('Checkout: Overview');
  await expect(overviewPage.item(producto)).toBeVisible();
});

Then('el total de la compra debería ser {string}', async function (this: CustomWorld, total: string) {
  await expect(new CheckoutOverviewPage(this.page).totalLabel).toHaveText(`Total: ${total}`);
});

Then('debería visualizar el error {string} en el formulario de envío', async function (this: CustomWorld, mensaje: string) {
  await expect(new CheckoutInfoPage(this.page).errorMessage).toHaveText(mensaje);
});

Then('no debería avanzar al resumen de compra', async function (this: CustomWorld) {
  await expect(this.page).toHaveURL(/checkout-step-one\.html/);
});