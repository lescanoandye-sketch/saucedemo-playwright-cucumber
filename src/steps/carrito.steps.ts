import { When, Then, DataTable } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

When('agrega el producto {string} al carrito', async function (this: CustomWorld, producto: string) {
  await new InventoryPage(this.page).addToCart(producto);
});

When('agrega los siguientes productos al carrito:', async function (this: CustomWorld, tabla: DataTable) {
  const inventoryPage = new InventoryPage(this.page);
  for (const fila of tabla.hashes()) {
    await inventoryPage.addToCart(fila.producto);
  }
});

When('ingresa al carrito de compras', async function (this: CustomWorld) {
  await new InventoryPage(this.page).goToCart();
});

Then('el contador del carrito debería mostrar {string}', async function (this: CustomWorld, cantidad: string) {
  await expect(new InventoryPage(this.page).cartBadge).toHaveText(cantidad);
});

Then('el botón del producto {string} debería cambiar a {string}', async function (this: CustomWorld, producto: string, texto: string) {
  await expect(new InventoryPage(this.page).productButton(producto)).toHaveText(texto);
});

Then('debería visualizar los siguientes productos en el carrito:', async function (this: CustomWorld, tabla: DataTable) {
  const cartPage = new CartPage(this.page);
  const filas = tabla.hashes();

  await expect(cartPage.title).toHaveText('Your Cart');
  await expect(cartPage.cartItems).toHaveCount(filas.length);

  for (const fila of filas) {
    await expect(cartPage.item(fila.producto)).toBeVisible();
    await expect(cartPage.itemPrice(fila.producto)).toHaveText(fila.precio);
  }
});