import { eliminarPlato } from "@/api/plato";
import { Plato } from "@/types/Plato";
import Image from "next/image";
import Link from "next/link";
import router from "next/router";
import { BsFillPencilFill } from "react-icons/bs";
import BorrarCofirmacion from "../ui/BorrarConfirmacion";

export default function CategoriaCard({ plato }: { plato: Plato }) {
  return (
    <div
      className="bg-white border flex flex-col border-gray-200 rounded-lg relative sm:hover:scale-110 transition duration-150 overflow-hidden"
      key={plato.id}
    >
      <div className="relative py-16 bg-transparent ">
        <Image
          src={plato.imagenURL}
          sizes="300px"
          alt="imagen_plato.jpg"
          className="absolute rounded-t-lg"
          fill
        />
        <div className="absolute top-0 z-10 bg-gradient-to-t h-full from-white w-full" />
      </div>

      <div className="flex flex-col justify-end h-full align-bottom">
        <div className="relative flex pt-2 items-center">
          <div className="flex-grow border-t border-primaryGreen"></div>
          <span className="flex-shrink mx-1 font-bold text-sm uppercase">
            {plato.nombre}
          </span>
          <div className="flex-grow border-t border-primaryGreen"></div>
        </div>

        <p className=" px-2 pb-1 font-extralight text-sm h-full">
          {plato.descripcion}
        </p>

        <div className=" border border-gray-200 py-1 flex justify-center bg-secondaryGreen hover:bg-secondaryOrange transition duration-200 text-white font-light hover:text-black">
          <Link className="bg-transparent" href={"/admin/plato/" + plato.id}>
            Ver detalles
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 absolute right-2 top-2 gap-1 z-10">
        <BsFillPencilFill
          className="group fill-white hover:fill-secondaryOrange transition duration-150"
          onClick={() => {
            router.push("/admin/plato/editar/" + plato.id);
          }}
        />
        <BorrarCofirmacion
          borrar={() => eliminarPlato(plato.id)}
          nombre={plato.nombre}
          tipo="plato"
          tipoArticulo="el plato"
          negro={false}
        />
      </div>
    </div>
  );
}
