export const esVacio = (cadena: string, campo: string) => {
  if (cadena.trim() === "") {
    return `El campo ${campo} no puede estar vacío`;
  }
};

export const esDNIoNIE = (cadena: string) => {
  const dniVacio = esVacio(cadena, "DNI/NIE");
  if (dniVacio) return dniVacio;

  const dniRegex = /^(\d{8})([A-Z])$/;
  const nieRegex = /^(X|Y|Z)\d{7}([A-Z])$/;

  if (dniRegex.test(cadena)) {
    return;
  } else if (!nieRegex.test(cadena)) {
    return "El NIE/DNI no tiene el formato correcto";
  }
};

export const esCorreoValido = (cadena: string) => {
  const correoVacio = esVacio(cadena, "correo");
  if (correoVacio) return correoVacio;

  esVacio(cadena, "Correo electrónico");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(cadena)) {
    return "El correo electrónico no tiene un formato válido";
  }
};
