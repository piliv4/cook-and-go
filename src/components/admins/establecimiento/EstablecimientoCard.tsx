import Image from "next/image";
import Link from "next/link";
import router from "next/router";
import { BsFillPencilFill } from "react-icons/bs";
import { Establecimiento } from "@/types/Establecimiento";
import { eliminarEstablecimiento } from "@/api/establecimiento";
import { EstablecimientoContext } from "@/context/EstablecimientoContext";
import { useContext } from "react";
import BorrarCofirmacion from "../ui/BorrarConfirmacion";

export default function EstablecimientoCard({
  establecimiento,
}: {
  establecimiento: Establecimiento;
}) {
  const { setEstablecimientoGlobal, establecimientoGlobal } = useContext(
    EstablecimientoContext
  );
  async function borrarEstablecimiento() {
    await eliminarEstablecimiento(establecimiento.id);
    setEstablecimientoGlobal({} as Establecimiento);
    router.replace(router.asPath);
  }
  return (
    <div
      className={`bg-white border flex flex-col border-gray-200 rounded-lg relative hover:scale-110 transition duration-150 overflow-hidden ${
        establecimientoGlobal.id == establecimiento.id &&
        "shadow-md shadow-primaryOrange"
      }`}
      key={establecimiento.id}
    >
      <div className="relative py-16 bg-transparent ">
        <Image
          src={establecimiento.imagenURL}
          alt="imagen_establecimiento.jpg"
          className="absolute rounded-t-lg"
          sizes="300px"
          fill
        />
        <div className="absolute top-0 z-10 bg-gradient-to-t h-full from-white w-full" />
      </div>

      <div className="relative flex pt-2 items-center">
        <div className="flex-grow border-t border-primaryGreen"></div>
        <Link
          className="flex-shrink mx-1 font-bold text-sm uppercase hover:underline"
          href={"/admin/establecimiento/" + establecimiento.id}
        >
          {establecimiento.nombre}
        </Link>
        <div className="flex-grow border-t border-primaryGreen"></div>
      </div>

      <p className=" px-2 pb-1 font-extralight text-sm h-full">
        {establecimiento.descripcion}
      </p>

      <div
        className={`border border-gray-200 py-1 flex justify-center text-white transition duration-200 font-light hover:text-black ${
          establecimientoGlobal.id == establecimiento.id
            ? "bg-primaryOrange hover:bg-secondaryOrange "
            : "bg-secondaryGreen hover:bg-secondaryOrange "
        }`}
      >
        <div
          className="bg-transparent"
          onClick={() => setEstablecimientoGlobal(establecimiento)}
        >
          {establecimientoGlobal.id == establecimiento.id
            ? "ADMINISTRANDO"
            : "ADMINISTRAR"}
        </div>
      </div>
      <div className="grid grid-cols-2 absolute right-2 top-2 gap-1 z-10">
        <BsFillPencilFill
          className="group fill-white hover:fill-secondaryOrange transition duration-150"
          onClick={() =>
            router.push("/admin/establecimiento/editar/" + establecimiento.id)
          }
        />
        <BorrarCofirmacion
          borrar={() => borrarEstablecimiento()}
          nombre={establecimiento.nombre}
          tipo="establecimiento"
          tipoArticulo="el establecimiento"
          negro={false}
        />
      </div>
    </div>
  );
}
