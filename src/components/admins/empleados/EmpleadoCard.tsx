import { eliminarEmpleado } from "@/api/empleado";
import { Empleado } from "@/types/Empleado";
import router from "next/router";
import Image from "next/image";
import { BsFillPencilFill, BsTrashFill } from "react-icons/bs";

export default function EmpleadoCard({ empleado }: { empleado: Empleado }) {
  async function borrarEmpleado() {
    try {
      await eliminarEmpleado(empleado.id);
    } catch (error) {
      console.log("Error al eliminar la categoria");
    }
    router.replace(router.asPath);
  }
  return (
    <div
      className="bg-white border flex flex-row border-gray-200 rounded-lg relative hover:scale-105 transition duration-150 overflow-hidden py-2"
      key={empleado.id}
    >
      {/* Imagen */}

      <div className="relative px-10 mx-2  ">
        <Image
          src={empleado.imagenURL}
          alt="imagen_categoria.jpg"
          className="absolute rounded-full"
          fill
        />
      </div>

      <div className="flex flex-col w-full">
        <div className=" flex flex-row w-full justify-end gap-1 pr-1">
          <BsFillPencilFill className=" fill- hover:fill-secondaryOrange transition duration-150" />
          <BsTrashFill
            className="fill- hover:fill-secondaryOrange transition duration-150"
            onClick={() => borrarEmpleado()}
          />
        </div>
        <p className="font-medium">{empleado.nombre}</p>
        <p className="text-sm rounded-full bg-red-400  w-2/5 text-center text-white">
          {empleado.rol}
        </p>
      </div>
    </div>
  );
}
