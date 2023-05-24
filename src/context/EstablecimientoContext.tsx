import { Establecimiento } from "@/types/Establecimiento";
import { createContext } from "react";

export type EstablecimientoContextProps = {
  establecimientoGlobal: Establecimiento;
  setEstablecimientoGlobal: (establecimiento: Establecimiento) => void;
};

export const EstablecimientoContext =
  createContext<EstablecimientoContextProps>({} as EstablecimientoContextProps);
