# language: es
Característica: Inicio de sesión en Sauce Demo
  Como cliente de Sauce Demo
  Quiero iniciar sesión con mis credenciales
  Para acceder al catálogo de productos

  @login @smoke
  Escenario: Inicio de sesión exitoso con usuario estándar
    Dado que el usuario se encuentra en la página de inicio de sesión
    Cuando inicia sesión con el usuario "standard_user" y la contraseña "secret_sauce"
    Entonces debería visualizar la página de productos