import { UsuarioContext } from "@/context/UsuarioContext";
import router from "next/router";
import { useContext, useEffect } from "react";

export default function AdministradorAutorizado({
  children,
}: {
  children: React.ReactNode;
}) {
  const { usuarioGlobal } = useContext(UsuarioContext);

  useEffect(() => {
    // Verificar si el usuario no ha iniciado sesión
    if (usuarioGlobal.rol != "Administrador") {
      // Redirigir al usuario a la página de inicio de sesión
      router.push("/#");
    }
  }, [usuarioGlobal]);

  return (
    <>
      <main>{children}</main>
    </>
  );
}
