# language: es
@login
Característica: Inicio de sesión en Sauce Demo
  Como cliente de Sauce Demo
  Quiero iniciar sesión con mis credenciales
  Para acceder al catálogo de productos

  Antecedentes:
    Dado que el usuario se encuentra en la página de inicio de sesión

  @smoke @positivo
  Escenario: Inicio de sesión exitoso con usuario estándar
    Cuando inicia sesión con el usuario "standard_user" y la contraseña "secret_sauce"
    Entonces debería visualizar la página de productos

  @negativo @bloqueado
  Escenario: Usuario bloqueado no puede iniciar sesión
    Cuando inicia sesión con el usuario "locked_out_user" y la contraseña "secret_sauce"
    Entonces debería visualizar el mensaje de error "Epic sadface: Sorry, this user has been locked out."
    Y debería permanecer en la página de inicio de sesión

  @negativo @contrasena-incorrecta
  Esquema del escenario: Inicio de sesión fallido con contraseña incorrecta - <tipo>
    Cuando inicia sesión con el usuario "standard_user" y la contraseña "<clave>"
    Entonces debería visualizar el mensaje de error "Epic sadface: Username and password do not match any user in this service"
    Y debería permanecer en la página de inicio de sesión

    Ejemplos:
      | clave           | tipo                                   |
      | secret_sauc     | contraseña incompleta                  |
      | SECRET_SAUCE    | contraseña en mayúsculas               |
      | secret_sauce123 | contraseña con caracteres adicionales  |
      | secret sauce    | espacio en lugar de guion bajo         |
      | 123456          | contraseña común                       |

  @negativo @credenciales-invalidas
  Esquema del escenario: Inicio de sesión fallido - <caso>
    Cuando inicia sesión con el usuario "<usuario>" y la contraseña "<clave>"
    Entonces debería visualizar el mensaje de error "<mensaje>"
    Y debería permanecer en la página de inicio de sesión

    Ejemplos:
      | caso                | usuario       | clave        | mensaje                                                                   |
      | usuario inexistente | usuario_falso | secret_sauce | Epic sadface: Username and password do not match any user in this service |
      | usuario vacío       |               | secret_sauce | Epic sadface: Username is required                                        |
      | contraseña vacía    | standard_user |              | Epic sadface: Password is required                                        |