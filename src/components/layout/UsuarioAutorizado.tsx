import { UsuarioContext } from "@/context/UsuarioContext";
import router from "next/router";
import { useContext, useEffect } from "react";
import IniciarSesionComp from "../IniciarSesionComp";

export default function UsuarioAutorizado({
  children,
}: {
  children: React.ReactNode;
}) {
  const { usuarioGlobal } = useContext(UsuarioContext);

  return (
    <>
      {usuarioGlobal && usuarioGlobal.id && usuarioGlobal.id != "" ? (
        <>{children}</>
      ) : (
        <IniciarSesionComp />
      )}
    </>
  );
}
