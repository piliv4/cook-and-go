export const esVacio = (cadena: string, campo: string) => {
  if (cadena.trim() === "") {
    return `${campo} no puede estar vacío`;
  }
};

export const esDNIoNIE = (cadena: string, campo: string) => {
  esVacio(cadena, campo);
};

export const esCorreoValido = (cadena: string, campo: string) => {
  if (cadena.trim() === "") {
    return `${campo} no puede estar vacío`;
  }
  return "";
};
