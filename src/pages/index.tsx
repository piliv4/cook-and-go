import UsuarioAutorizado from "@/components/layout/UsuarioAutorizado";
import { UsuarioContext } from "@/context/UsuarioContext";
import router from "next/router";
import { useContext, useEffect } from "react";

export default function Home() {
  const { usuarioGlobal } = useContext(UsuarioContext);
  useEffect(() => {
    if (
      usuarioGlobal.rol === "Administrador" ||
      usuarioGlobal.rol == undefined
    ) {
      router.push("/admin"); // Redirigir a la página no autorizada
    } else if (usuarioGlobal.rol === "Cocinero") {
      router.push("/kds"); // Redirigir a la página no autorizada
    }
  }, [usuarioGlobal.rol]);
  return (
    <UsuarioAutorizado>
      <p></p>
    </UsuarioAutorizado>
  );
}
