import { Empleado } from "@/types/Empleado";
import { UsuarioContext, UsuarioContextProps } from "./UsuarioContext";
import { useEffect, useState } from "react";

interface UsuarioProviderProps {
  children: JSX.Element | JSX.Element[];
}
const INITIAL_STATE: Empleado = {} as Empleado;
export const UsuarioProvider: React.FC<UsuarioProviderProps> = ({
  children,
}) => {
  const [usuario, setUsuario] = useState(INITIAL_STATE);

  useEffect(() => {
    const storedUsuario = localStorage.getItem("usuario");
    if (storedUsuario) {
      setUsuario(JSON.parse(storedUsuario));
    }
  }, []);

  const cambiarUsuario = (usuario: Empleado) => {
    setUsuario(usuario);
    if (usuario) {
      localStorage.setItem("usuario", JSON.stringify(usuario));
    } else {
      localStorage.removeItem("usuario");
    }
  };

  const usuarioGlobal: UsuarioContextProps = {
    usuarioGlobal: usuario,
    setUsuarioGlobal: cambiarUsuario,
  };

  return (
    <UsuarioContext.Provider value={usuarioGlobal}>
      {children}
    </UsuarioContext.Provider>
  );
};
