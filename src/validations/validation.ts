export const esVacio = (cadena: string, campo: string) => {
  if (cadena.trim() === "") {
    return `El campo ${campo} no puede estar vacío`;
  }
};

export const esNumerico = (cadena: string, campo: string) => {
  const numero = parseFloat(cadena);

  if (isNaN(numero) || numero <= 0) {
    return `El campo ${campo} debe ser un número válido`;
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
    return "El NIE/DNI no tiene el formato válido";
  }
};

export const esCorreoValido = (cadena: string) => {
  const correoVacio = esVacio(cadena, "correo");
  if (correoVacio) return correoVacio;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(cadena)) {
    return "El correo electrónico no tiene un formato válido";
  }
};

export const esCIFValido = (cadena: string) => {
  const cifVacio = esVacio(cadena, "CIF");
  if (cifVacio) return cifVacio;

  const cifRegex = /^[A-HJNP-SUW][0-9]{8}$/;

  if (!cifRegex.test(cadena)) {
    return "El CIF no tiene el formato válido";
  }
};

export const esTelefonoValido = (cadena: string) => {
  const telVacio = esVacio(cadena, "teléfono");
  if (telVacio) return telVacio;

  const telNum = esVacio(cadena, "teléfono");
  if (telNum) return telNum;

  const telefonoRegex = /^[6-9]\d{8}$/;

  if (!telefonoRegex.test(cadena)) {
    return "El número de teléfono no tiene un formato válido";
  }
};

export const esWebValida = (cadena: string) => {
  const dominioRegex = /^(?!:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
  if (cadena != "")
    if (!dominioRegex.test(cadena)) {
      return "La página web no tiene un formato válido";
    }
};
