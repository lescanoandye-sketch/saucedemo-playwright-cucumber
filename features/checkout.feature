# language: es
@checkout
Característica: Proceso de compra
  Como cliente de Sauce Demo
  Quiero completar el proceso de compra
  Para adquirir los productos que necesito

  Antecedentes:
    Dado que el usuario ha iniciado sesión como "standard_user"
    Y agrega el producto "Sauce Labs Backpack" al carrito
    Y ingresa al carrito de compras

  @smoke @e2e @compra-exitosa
  Escenario: Completar la compra de un producto hasta la confirmación
    Cuando continúa al checkout
    Y ingresa sus datos de envío con nombre "Andy", apellido "Lescano" y código postal "15001"
    Y finaliza la compra
    Entonces debería visualizar el mensaje de confirmación "Thank you for your order!"

  @positivo @resumen-compra
  Escenario: Visualizar el resumen de compra antes de finalizar
    Cuando continúa al checkout
    Y ingresa sus datos de envío con nombre "Andy", apellido "Lescano" y código postal "15001"
    Entonces debería visualizar el resumen de compra con el producto "Sauce Labs Backpack"
    Y el total de la compra debería ser "$32.39"

  @negativo @datos-envio-vacios
  Esquema del escenario: No se puede continuar el checkout - <caso>
    Cuando continúa al checkout
    Y ingresa sus datos de envío con nombre "<nombre>", apellido "<apellido>" y código postal "<codigo>"
    Entonces debería visualizar el error "<mensaje>" en el formulario de envío
    Y no debería avanzar al resumen de compra

    Ejemplos:
      | caso                | nombre | apellido | codigo | mensaje                        |
      | nombre vacío        |        | Lescano  | 15001  | Error: First Name is required  |
      | apellido vacío      | Andy   |          | 15001  | Error: Last Name is required   |
      | código postal vacío | Andy   | Lescano  |        | Error: Postal Code is required |