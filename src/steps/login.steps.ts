import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { obtenerClave } from '../data/usuarios';

Given('que el usuario se encuentra en la página de inicio de sesión', async function (this: CustomWorld) {
  await new LoginPage(this.page).goto();
});

When('inicia sesión con el usuario {string} y la contraseña {string}', async function (this: CustomWorld, usuario: string, clave: string) {
  await new LoginPage(this.page).login(usuario, clave);
});

Then('debería visualizar la página de productos', async function (this: CustomWorld) {
  const inventoryPage = new InventoryPage(this.page);
  await expect(this.page).toHaveURL(/inventory\.html/);
  await expect(inventoryPage.title).toHaveText('Products');
});

Then('debería visualizar el mensaje de error {string}', async function (this: CustomWorld, mensaje: string) {
  const loginPage = new LoginPage(this.page);
  await expect(loginPage.errorMessage).toHaveText(mensaje);
});

Then('debería permanecer en la página de inicio de sesión', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await expect(this.page).toHaveURL('https://www.saucedemo.com/');
  await expect(loginPage.loginButton).toBeVisible();
});

Given('que el usuario ha iniciado sesión como {string}', async function (this: CustomWorld, usuario: string) {
  const loginPage = new LoginPage(this.page);
  await loginPage.goto();
  await loginPage.login(usuario, obtenerClave(usuario));
  await expect(this.page).toHaveURL(/inventory\.html/);
});