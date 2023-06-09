import { Empleado } from "@/types/Empleado";

type UsuarioAction = {
  type: "setUsuarioGlobal";
  payload: Empleado;
};

export const usuarioReducer = (
  state: Empleado,
  action: UsuarioAction
): Empleado => {
  return state;
};
