import { Before, After, AfterStep, BeforeAll, setDefaultTimeout, Status } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';
import { CustomWorld } from './world';

setDefaultTimeout(30 * 1000);

const CARPETA_CAPTURAS = path.join('evidencias', 'capturas');

function nombreArchivo(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/^_|_$/g, '');
}

BeforeAll(function () {
  fs.rmSync(CARPETA_CAPTURAS, { recursive: true, force: true });
});

Before(async function (this: CustomWorld) {
  this.browser = await chromium.launch({
    headless: process.env.HEADLESS === 'true',
    slowMo: Number(process.env.SLOWMO ?? 0)
  });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

AfterStep(async function (this: CustomWorld) {
  const captura = await this.page.screenshot();
  this.attach(captura, 'image/png');
});

After(async function (this: CustomWorld, scenario) {
  const feature = path.basename(scenario.pickle.uri, '.feature');
  const estado = scenario.result?.status === Status.PASSED ? 'PASSED' : 'FAILED';
  const carpeta = path.join(CARPETA_CAPTURAS, feature);

  fs.mkdirSync(carpeta, { recursive: true });
  await this.page.screenshot({
    path: path.join(carpeta, `${estado}_${nombreArchivo(scenario.pickle.name)}.png`),
    fullPage: true
  });

  await this.context.close();
  await this.browser.close();
});