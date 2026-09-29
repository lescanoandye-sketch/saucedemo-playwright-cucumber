# Sauce Demo - Automatización con Playwright + Cucumber

Suite de pruebas automatizadas E2E para la aplicación web [Sauce Demo](https://www.saucedemo.com/), desarrollada con **Playwright**, **Cucumber (Gherkin)** y **TypeScript**, aplicando el patrón de diseño **Page Object Model (POM)**.

## Historia de usuario

> **Como** cliente de Sauce Demo,
> **quiero** poder iniciar sesión, agregar productos al carrito y completar una compra,
> **para** poder adquirir los productos que necesito.

## Tecnologías utilizadas

| Herramienta | Uso |
|---|---|
| Playwright | Automatización del navegador |
| Cucumber | Ejecución de escenarios escritos en Gherkin (en español) |
| TypeScript 5 | Lenguaje de programación con tipado estático |
| ts-node | Ejecución de TypeScript sin compilación previa |
| @playwright/test | Aserciones con espera automática (`expect`) |

## Requisitos previos

- [Node.js](https://nodejs.org/) versión 18 o superior
- [Git](https://git-scm.com/)

## Instalación

```bash
git clone https://github.com/lescanoandye-sketch/saucedemo-playwright-cucumber.git
cd saucedemo-playwright-cucumber
npm install
npx playwright install chromium
```

## Ejecución de pruebas

### Ejecutar toda la suite

```bash
npm test
```

### Ejecutar por tags

```bash
npx cucumber-js --tags "@smoke"        # Escenarios principales
npx cucumber-js --tags "@login"        # Módulo de inicio de sesión
npx cucumber-js --tags "@carrito"      # Módulo de carrito
npx cucumber-js --tags "@checkout"     # Módulo de proceso de compra
npx cucumber-js --tags "@negativo"     # Solo casos negativos
npx cucumber-js --tags "@bloqueado"    # Un escenario específico
```

### Modo sin interfaz (headless)

PowerShell (Windows):

```powershell
$env:HEADLESS="true"; npm test
```

Bash (Linux / macOS):

```bash
HEADLESS=true npm test
```

### Modo cámara lenta (para depuración visual)

PowerShell (Windows):

```powershell
$env:SLOWMO=800; npm test
```

Bash (Linux / macOS):

```bash
SLOWMO=800 npm test
```

## Reportes y evidencias

Al finalizar cada ejecución se genera un reporte HTML en:

```
reports/cucumber-report.html
```

Si un escenario falla, se adjunta automáticamente una **captura de pantalla** en el reporte como evidencia.

## Estructura del proyecto

```
saucedemo-playwright-cucumber/
├── features/                  # Escenarios en Gherkin
│   ├── login.feature
│   ├── carrito.feature
│   └── checkout.feature
├── src/
│   ├── data/                  # Datos de prueba
│   │   └── usuarios.ts
│   ├── pages/                 # Page Objects (POM)
│   │   ├── LoginPage.ts
│   │   ├── InventoryPage.ts
│   │   ├── CartPage.ts
│   │   ├── CheckoutInfoPage.ts
│   │   ├── CheckoutOverviewPage.ts
│   │   └── CheckoutCompletePage.ts
│   ├── steps/                 # Step definitions
│   │   ├── login.steps.ts
│   │   ├── carrito.steps.ts
│   │   └── checkout.steps.ts
│   └── support/               # Configuración de ejecución
│       ├── world.ts           # Contexto compartido por escenario
│       └── hooks.ts           # Apertura/cierre del navegador y evidencias
├── cucumber.js                # Configuración de Cucumber
├── tsconfig.json              # Configuración de TypeScript
└── package.json
```

## Escenarios cubiertos

| Módulo | Escenario | Tipo | Tags |
|---|---|---|---|
| Login | Inicio de sesión exitoso con `standard_user` | Positivo | `@smoke` `@positivo` |
| Login | Usuario bloqueado (`locked_out_user`) no puede iniciar sesión | Negativo | `@negativo` `@bloqueado` |
| Login | Contraseña incompleta | Negativo | `@negativo` `@contrasena-incorrecta` |
| Login | Contraseña en mayúsculas | Negativo | `@negativo` `@contrasena-incorrecta` |
| Login | Contraseña con caracteres adicionales | Negativo | `@negativo` `@contrasena-incorrecta` |
| Login | Espacio en lugar de guion bajo | Negativo | `@negativo` `@contrasena-incorrecta` |
| Login | Contraseña común | Negativo | `@negativo` `@contrasena-incorrecta` |
| Login | Usuario inexistente | Negativo | `@negativo` `@credenciales-invalidas` |
| Login | Usuario vacío | Negativo | `@negativo` `@credenciales-invalidas` |
| Login | Contraseña vacía | Negativo | `@negativo` `@credenciales-invalidas` |
| Carrito | Agregar un producto desde la página de productos | Positivo | `@smoke` |
| Carrito | Visualizar varios productos agregados con su precio | Positivo | `@carrito` |
| Checkout | Completar la compra hasta la confirmación | Positivo (E2E) | `@smoke` `@e2e` `@compra-exitosa` |
| Checkout | Visualizar el resumen y total de la compra | Positivo | `@positivo` `@resumen-compra` |
| Checkout | Nombre vacío en datos de envío | Negativo | `@negativo` `@datos-envio-vacios` |
| Checkout | Apellido vacío en datos de envío | Negativo | `@negativo` `@datos-envio-vacios` |
| Checkout | Código postal vacío en datos de envío | Negativo | `@negativo` `@datos-envio-vacios` |

**Total:** 17 escenarios (5 positivos, 12 negativos).

## Patrón de diseño: Page Object Model

Cada pantalla de la aplicación está representada por una clase en `src/pages/`, que contiene sus **localizadores** y las **acciones** posibles. Los step definitions solo orquestan esas acciones, sin conocer los detalles de la interfaz.

**Beneficio:** si cambia un elemento de la interfaz, se actualiza en un solo lugar y todos los escenarios que lo usan siguen funcionando.

## Autor

**Andy Lescano Espino** - QA Engineer