import Link from "next/link";
import router from "next/router";
import { BsFillPencilFill, BsTrashFill } from "react-icons/bs";
import supabase from "@/server/client";
import { Menu } from "@/types/Menu";
import { eliminarMenu } from "@/api/menu";

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
              onClick={() => eliminar()}
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
