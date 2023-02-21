import supabase from "@/server/client";
import { Categoria } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import EditarBorrar from "../EditarBorrar";

export default function CategoriaCard({
  categoria,
  recargar,
}: {
  categoria: Categoria;
  recargar: Function;
}) {
  async function borrarCategoria() {
    const { data, error } = await supabase
      .from("Categoria")
      .delete()
      .eq("id", categoria.id);
    console.log(error);
    if (!error) {
      recargar();
    }
  }
  return (
    <div
      className="bg-white border border-gray-200 rounded-lg relative hover:scale-110 transition duration-150 overflow-hidden"
      key={categoria.id}
    >
      <div className="relative py-16 bg-transparent ">
        <Image
          src="https://www.clara.es/medio/2021/11/28/postres-navidenos_3f462fd7_1280x1115.jpg"
          alt="imagen_categoria.jpg"
          className="absolute rounded-t-lg"
          fill
        />
        <div className="absolute top-0 z-10 bg-gradient-to-t h-full from-white w-full" />
      </div>
      <div className="relative flex pt-2 items-center">
        <div className="flex-grow border-t border-gray-200"></div>
        <span className="flex-shrink mx-4 font-extrabold  uppercase">
          {categoria.nombre}
        </span>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>

      <p className=" px-2 pb-1">{categoria.descripcion}</p>

      <div className="border border-gray-200 py-1 flex justify-center bg-secondaryGreen hover:bg-secondaryOrange transition duration-200 text-white font-light hover:text-black">
        <Link className="bg-transparent" href={"#"}>
          Ver detalles
        </Link>
      </div>
      <EditarBorrar />
    </div>
  );
}
