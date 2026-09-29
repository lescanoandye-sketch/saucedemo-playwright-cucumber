# language: es
@carrito
Característica: Carrito de compras
  Como cliente de Sauce Demo
  Quiero agregar productos al carrito
  Para revisarlos antes de realizar mi compra

  Antecedentes:
    Dado que el usuario ha iniciado sesión como "standard_user"

  @smoke
  Escenario: Agregar un producto al carrito desde la página de productos
    Cuando agrega el producto "Sauce Labs Backpack" al carrito
    Entonces el contador del carrito debería mostrar "1"
    Y el botón del producto "Sauce Labs Backpack" debería cambiar a "Remove"

  Escenario: Visualizar los productos agregados en el carrito
    Cuando agrega los siguientes productos al carrito:
      | producto              |
      | Sauce Labs Backpack   |
      | Sauce Labs Bike Light |
    Y ingresa al carrito de compras
    Entonces debería visualizar los siguientes productos en el carrito:
      | producto              | precio |
      | Sauce Labs Backpack   | $29.99 |
      | Sauce Labs Bike Light | $9.99  |