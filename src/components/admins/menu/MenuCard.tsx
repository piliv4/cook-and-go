import { Menu } from "@/types/types";
import Link from "next/link";
import { BsFillPencilFill, BsTrashFill } from "react-icons/bs";

export default function MenuCard({ menu }: { menu: Menu }) {
  async function borrarMenu() {}
  return (
    <div
      className="bg-white border flex flex-col border-gray-200 rounded-lg relative hover:scale-110 transition duration-150 overflow-hidden"
      key={menu.id}
    >
      <div className="relative flex pt-2 items-center">
        <div className="flex-grow border-t border-primaryGreen"></div>
        <span className="flex-shrink mx-1 font-bold text-sm uppercase">
          {menu.nombre}
        </span>
        <div className="flex-grow border-t border-primaryGreen"></div>
      </div>

      <p className=" px-2 pb-1 font-extralight text-sm">{menu.precio}</p>

      <div className=" border border-gray-200 py-1 flex justify-center bg-secondaryGreen hover:bg-secondaryOrange transition duration-200 text-white font-light hover:text-black">
        <Link className="bg-transparent" href={"/admin/menu/" + menu.id}>
          Ver detalles
        </Link>
      </div>
      <div className="grid grid-cols-2 absolute right-2 top-2 gap-1 z-10">
        <BsFillPencilFill
          className="group fill-white hover:fill-secondaryOrange transition duration-150"
          onClick={() => {}}
        />
        <BsTrashFill
          className="fill-white hover:fill-secondaryOrange transition duration-150"
          onClick={() => borrarMenu()}
        />
      </div>
    </div>
  );
}
