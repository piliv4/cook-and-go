import router from "next/router";
import { BsFillPencilFill } from "react-icons/bs";
import { Menu } from "@/types/Menu";
import { eliminarMenu } from "@/api/menu";
import { FaUtensils } from "react-icons/fa";
import Link from "next/link";
import BorrarCofirmacion from "../ui/BorrarConfirmacion";

export default function MenuCard({ menu }: { menu: Menu }) {
  async function eliminar() {
    try {
      await eliminarMenu(menu.id);
    } catch (error) {
      console.log("Error al eliminar el menu");
    }
    router.replace("/admin/menu");
  }

  return (
    <div
      className="bg-white border grid grid-cols-[30%_70%] border-gray-200 rounded-lg  sm:hover:scale-105 transition duration-150 overflow-hidden relative "
      key={menu.id}
    >
      <div className="flex justify-center items-center bg-primaryOrange   border-r-4 border-double ">
        <FaUtensils size={46} className="fill-white" />
      </div>
      <div className="w-full flex items-center justify-center">
        <div className=" flex  flex-col  pt-5 px-1 w-fit">
          <Link
            className="flex-shrink mx-1 font-black  text-center uppercase w-full hover:underline decoration-primaryOrange"
            href={"/admin/menu/" + menu.id}
          >
            {menu.nombre}
          </Link>
          <div className=" flex flex-row px-2 pb-2 text-sm">
            <p className="font-black  w-full">PRECIO</p>
            {(Math.round(menu.precio * 100) / 100).toFixed(2)}€
          </div>
        </div>
        <div className="flex flex-row gap-1 items-end absolute top-1 right-1">
          <BsFillPencilFill
            className="group fill-black hover:fill-secondaryOrange transition duration-150"
            onClick={() => router.push("/admin/menu/editar/" + menu.id)}
          />
          <BorrarCofirmacion
            borrar={() => eliminar()}
            nombre={menu.nombre}
            tipo="menú"
            tipoArticulo="el menú"
            negro={true}
          />
        </div>
      </div>
    </div>
  );
}
