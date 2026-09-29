export const CLAVES: Record<string, string> = {
  standard_user: 'secret_sauce',
  locked_out_user: 'secret_sauce'
};

export function obtenerClave(usuario: string): string {
  const clave = CLAVES[usuario];
  if (!clave) {
    throw new Error(`No hay clave registrada para el usuario "${usuario}"`);
  }
  return clave;
}