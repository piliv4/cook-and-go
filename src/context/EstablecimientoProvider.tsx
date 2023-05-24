import { Establecimiento } from "@/types/Establecimiento";
import {
  EstablecimientoContext,
  EstablecimientoContextProps,
} from "./EstablecimientoContext";
import { useEffect, useState } from "react";

interface EstablecimientoProviderProps {
  children: JSX.Element | JSX.Element[];
}
const INITIAL_STATE: Establecimiento = {} as Establecimiento;
export const EstablecimientoProvider: React.FC<
  EstablecimientoProviderProps
> = ({ children }) => {
  const [establecimiento, setEstablecimiento] = useState(INITIAL_STATE);

  useEffect(() => {
    const storedEstablecimiento = localStorage.getItem("establecimiento");
    if (storedEstablecimiento) {
      setEstablecimiento(JSON.parse(storedEstablecimiento));
    }
  }, []);

  const cambiarEstablecimiento = (establecimiento: Establecimiento) => {
    setEstablecimiento(establecimiento);
    if (establecimiento) {
      localStorage.setItem("establecimiento", JSON.stringify(establecimiento));
    } else {
      localStorage.removeItem("establecimiento");
    }
  };

  const establecimientoGlobal: EstablecimientoContextProps = {
    establecimientoGlobal: establecimiento,
    setEstablecimientoGlobal: cambiarEstablecimiento,
  };

  return (
    <EstablecimientoContext.Provider value={establecimientoGlobal}>
      {children}
    </EstablecimientoContext.Provider>
  );
};
