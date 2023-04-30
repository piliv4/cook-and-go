import supabase from "@/server/client";
import Image from "next/image";
import Link from "next/link";
import router from "next/router";
import { useState } from "react";
import { BsFillPencilFill, BsTrashFill } from "react-icons/bs";
import CrearCategoriaPopup from "./CrearCategoriaPopup";
import { Categoria } from "@/types/Categoria";
import { eliminarCategoria } from "@/api/categoria";

export default function CategoriaCard({ categoria }: { categoria: Categoria }) {
  const [open, setOpen] = useState(false);
  async function borrarCategoria() {
    try {
      await eliminarCategoria(categoria.id);
    } catch (error) {
      console.log("Error al eliminar la categoria");
    }
    router.replace(router.asPath);
  }
  return (
    <div
      className="bg-white border flex flex-col border-gray-200 rounded-lg relative hover:scale-110 transition duration-150 overflow-hidden"
      key={categoria.id}
    >
      <div className="relative py-16 bg-transparent ">
        <Image
          src={categoria?.imagenURL}
          alt="imagen_categoria.jpg"
          className="absolute rounded-t-lg"
          fill
        />
        <div className="absolute top-0 z-10 bg-gradient-to-t h-full from-white w-full" />
      </div>

      <div className="relative flex pt-2 items-center">
        <div className="flex-grow border-t border-primaryGreen"></div>
        <span className="flex-shrink mx-1 font-bold text-sm uppercase">
          {categoria.nombre}
        </span>
        <div className="flex-grow border-t border-primaryGreen"></div>
      </div>

      <p className=" px-2 pb-1 font-extralight text-sm">
        {categoria.descripcion}
      </p>

      <div className=" border border-gray-200 py-1 flex justify-center bg-secondaryGreen hover:bg-secondaryOrange transition duration-200 text-white font-light hover:text-black">
        <Link
          className="bg-transparent"
          href={"/admin/categoria/" + categoria.id}
        >
          Ver detalles
        </Link>
      </div>
      <div className="grid grid-cols-2 absolute right-2 top-2 gap-1 z-10">
        <BsFillPencilFill
          className="group fill-white hover:fill-secondaryOrange transition duration-150"
          onClick={() => setOpen(true)}
        />
        <BsTrashFill
          className="fill-white hover:fill-secondaryOrange transition duration-150"
          onClick={() => borrarCategoria()}
        />
      </div>
      <CrearCategoriaPopup
        cerrarPopUp={() => setOpen(false)}
        open={open}
        categoriaEditar={categoria}
      />
    </div>
  );
}
