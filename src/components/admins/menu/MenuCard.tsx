import { Menu, Plato } from "@/types/types";
import Link from "next/link";
import router from "next/router";
import { BsFillPencilFill, BsTrashFill } from "react-icons/bs";
import DisplayerPlatos from "./DisplayerPlatos";
import supabase from "@/server/client";

export default function MenuCard({ menu }: { menu: Menu }) {
  async function borrarMenu() {
    //Primero borramos la relacion con ingredientes
    const { error: error1 } = await supabase
      .from("MenuArticulo")
      .delete()
      .eq("menu_id", menu.id);

    //Despues hacemos el borrado del campo
    const { error: error2 } = await supabase
      .from("Menu")
      .delete()
      .eq("id", menu.id);
    //Si no hay errores refrescamos la página
    if (!error1 && !error2) {
      router.replace("/admin/menu");
    }
  }
  return (
    <Link className="bg-transparent" href={"/admin/menu/" + menu.id}>
      <div
        className="bg-white border flex flex-col border-gray-200 rounded-lg relative hover:scale-110 transition duration-150 overflow-hidden"
        key={menu.id}
      >
        <div className="relative flex pt-2 flex-row">
          <span className="flex-shrink mx-1 font-bold text-sm uppercase w-full">
            {menu.nombre}
          </span>
          <div className="flex flex-row gap-1 items-end">
            <BsFillPencilFill
              className="group fill-primaryOrange hover:fill-secondaryOrange transition duration-150"
              onClick={() => router.push("/admin/menu/editar/" + menu.id)}
            />
            <BsTrashFill
              className="fill-primaryOrange hover:fill-secondaryOrange transition duration-150"
              onClick={() => borrarMenu()}
            />
          </div>
        </div>
        <div className=" flex flex-row px-2 pb-2">
          <p className="font-bold w-full">Precio</p>
          {menu.precio}
        </div>
      </div>
    </Link>
  );
}
