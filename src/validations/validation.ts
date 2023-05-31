export const esVacio = (cadena: string, campo: string) => {
  if (cadena.trim() === "") {
    return `${campo} no puede estar vacío`;
  }
  return "";
};
