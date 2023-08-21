import { UsuarioContext } from "@/context/UsuarioContext";
import Link from "next/link";
import { useContext } from "react";

export default function AdministradorAutorizado({
  children,
}: {
  children: React.ReactNode;
}) {
  const { usuarioGlobal } = useContext(UsuarioContext);

  return (
    <>
      {usuarioGlobal.rol == "Administrador" ||
      usuarioGlobal.rol == undefined ? (
        <>{children}</>
      ) : (
        <div className="w-full pt-11 flex justify-center items-center uppercase font-black text-xl flex-col">
          <p>Usuario no autorizado</p>
          <Link href="/login" className="underline text-primaryOrange">
            Cambie de sesion
          </Link>
        </div>
      )}
    </>
  );
}
