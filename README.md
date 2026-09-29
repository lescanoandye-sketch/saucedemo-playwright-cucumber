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
npx cucumber-js --tags "@smoke"                  # Escenarios principales
npx cucumber-js --tags "@login"                  # Módulo de inicio de sesión
npx cucumber-js --tags "@carrito"                # Módulo de carrito
npx cucumber-js --tags "@checkout"               # Módulo de proceso de compra
npx cucumber-js --tags "@negativo"               # Solo casos negativos
npx cucumber-js --tags "@contrasena-incorrecta"  # Un escenario específico
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

Cada ejecución genera evidencias en la carpeta `evidencias/`:

```
evidencias/
├── capturas/                  # Captura final de cada escenario
│   ├── login/
│   ├── carrito/
│   └── checkout/
└── reporte-cucumber.html      # Reporte con captura de cada paso
```

- **Reporte HTML:** muestra cada escenario con el resultado de sus pasos y una captura de pantalla después de cada paso.
- **Capturas por escenario:** imagen final de cada escenario, con el resultado en el nombre del archivo (`PASSED_` o `FAILED_`).

Las evidencias de la última ejecución están incluidas en el repositorio y se pueden revisar directamente en GitHub, en la carpeta [evidencias/capturas](evidencias/capturas).

## Estructura del proyecto

```
saucedemo-playwright-cucumber/
├── docs/
│   └── INFORME_ESTRATEGIA.md  # Informe de estrategia de automatización
├── evidencias/                # Capturas y reporte de la última ejecución
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
│       └── hooks.ts           # Navegador, capturas y evidencias
├── cucumber.js                # Configuración de Cucumber
├── tsconfig.json              # Configuración de TypeScript
└── package.json
```

## Escenarios cubiertos

| Módulo | Escenario | Tipo | Estructura | Ejecuciones | Tags |
|---|---|---|---|---|---|
| Login | Inicio de sesión exitoso con `standard_user` | Positivo | Escenario | 1 | `@smoke` `@positivo` |
| Login | Usuario bloqueado (`locked_out_user`) no puede iniciar sesión | Negativo | Escenario | 1 | `@negativo` `@bloqueado` |
| Login | Inicio de sesión fallido con contraseña incorrecta | Negativo | Esquema del escenario (5 ejemplos) | 5 | `@negativo` `@contrasena-incorrecta` |
| Login | Inicio de sesión fallido: usuario inexistente, usuario vacío, contraseña vacía | Negativo | Esquema del escenario (3 ejemplos) | 3 | `@negativo` `@credenciales-invalidas` |
| Carrito | Agregar un producto desde la página de productos | Positivo | Escenario | 1 | `@smoke` |
| Carrito | Visualizar varios productos agregados con su precio | Positivo | Escenario con DataTable | 1 | `@carrito` |
| Checkout | Completar la compra hasta la confirmación | Positivo (E2E) | Escenario | 1 | `@smoke` `@e2e` `@compra-exitosa` |
| Checkout | Visualizar el resumen y total de la compra | Positivo | Escenario | 1 | `@positivo` `@resumen-compra` |
| Checkout | No se puede continuar con datos de envío vacíos | Negativo | Esquema del escenario (3 ejemplos) | 3 | `@negativo` `@datos-envio-vacios` |

**Total:** 9 escenarios definidos (3 de ellos son Esquemas del escenario), que generan **17 ejecuciones**. Cucumber reporta cada fila de `Ejemplos` como una ejecución independiente.

### Ejemplo de Esquema del escenario

Un único escenario que se ejecuta una vez por cada fila de la tabla `Ejemplos`, reemplazando `<clave>` y `<tipo>` por los valores de cada fila. El mensaje de error es la validación final:

```gherkin
@negativo @contrasena-incorrecta
Esquema del escenario: Inicio de sesión fallido con contraseña incorrecta - <tipo>
  Cuando inicia sesión con el usuario "standard_user" y la contraseña "<clave>"
  Entonces debería visualizar el mensaje de error "Epic sadface: Username and password do not match any user in this service"

  Ejemplos:
    | clave           | tipo                                   |
    | secret_sauc     | contraseña incompleta                  |
    | SECRET_SAUCE    | contraseña en mayúsculas               |
    | secret_sauce123 | contraseña con caracteres adicionales  |
    | secret sauce    | espacio en lugar de guion bajo         |
    | 123456          | contraseña común                       |
```

### Diferencia entre Ejemplos y DataTable

| Recurso | Qué hace | Dónde se usa |
|---|---|---|
| `Ejemplos` (Examples) | Ejecuta el **escenario completo** una vez por cada fila | Login y checkout |
| `DataTable` | Pasa **una lista de datos a un solo paso**, dentro de una única ejecución | Carrito (agregar varios productos) |

## Patrón de diseño: Page Object Model

Cada pantalla de la aplicación está representada por una clase en `src/pages/`, que contiene sus **localizadores** y las **acciones** posibles. Los step definitions solo orquestan esas acciones, sin conocer los detalles de la interfaz.

**Beneficio:** si cambia un elemento de la interfaz, se actualiza en un solo lugar y todos los escenarios que lo usan siguen funcionando.

## Informe de estrategia

El detalle de la estrategia de automatización, patrones utilizados y decisiones técnicas se encuentra en [docs/INFORME_ESTRATEGIA.md](docs/INFORME_ESTRATEGIA.md).

## Autor

**Andy Lescano Espino** - QA Engineer