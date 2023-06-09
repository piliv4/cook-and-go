import { Empleado } from "@/types/Empleado";
import { createContext } from "react";

export type UsuarioContextProps = {
  usuarioGlobal: Empleado;
  setUsuarioGlobal: (usuraio: Empleado) => void;
};

export const UsuarioContext = createContext<UsuarioContextProps>(
  {} as UsuarioContextProps
);
