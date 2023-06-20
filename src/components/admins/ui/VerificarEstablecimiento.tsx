import { EstablecimientoContext } from "@/context/EstablecimientoContext";
import Link from "next/link";
import { useContext } from "react";

export default function VerificarEstablecimiento({
  children,
}: {
  children: React.ReactNode;
}) {
  const { establecimientoGlobal } = useContext(EstablecimientoContext);

  return (
    <>
      {establecimientoGlobal &&
      establecimientoGlobal.id &&
      establecimientoGlobal.id != "" ? (
        <>{children}</>
      ) : (
        <div className="w-full pt-11 flex justify-center items-center uppercase font-black text-xl flex-col">
          <p className="">Para empezar a gestionar seleccione primero un</p>
          <Link
            href={"/admin/establecimiento"}
            className="text-primaryOrange underline"
          >
            establecimiento
          </Link>
        </div>
      )}
    </>
  );
}
