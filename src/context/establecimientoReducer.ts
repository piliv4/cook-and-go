import { Establecimiento } from "@/types/Establecimiento";

type EstablecimientoAction = {
  type: "setEstablecimientoGlobal";
  payload: Establecimiento;
};

export const establecimientoReducer = (
  state: Establecimiento,
  action: EstablecimientoAction
): Establecimiento => {
  return state;
};
