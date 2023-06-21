import { eliminarEmpleado } from "@/api/empleado";
import { Empleado } from "@/types/Empleado";
import router from "next/router";
import Image from "next/image";
import { BsFillPencilFill } from "react-icons/bs";
import Link from "next/link";
import BorrarCofirmacion from "../ui/BorrarConfirmacion";

export default function EmpleadoCard({ empleado }: { empleado: Empleado }) {
  return (
    <div
      className="bg-white border flex flex-row border-gray-200 rounded-lg relative hover:scale-105 transition duration-150 overflow-hidden py-2"
      key={empleado.id}
    >
      {/* Imagen */}
      <div className="relative w-20 mx-2">
        <Image
          src={empleado.imagenURL}
          alt="imagen_categoria.jpg"
          sizes="200px"
          className="rounded-full mx-1 absolute"
          fill
        />
      </div>

      <div className="ml-1 flex flex-col w-full">
        <div className=" flex flex-row w-full justify-end gap-1 pr-1">
          <BsFillPencilFill
            className=" fill- hover:fill-secondaryOrange transition duration-150"
            onClick={() => router.push("/admin/empleado/editar/" + empleado.id)}
          />
          <BorrarCofirmacion
            borrar={() => eliminarEmpleado(empleado.id)}
            nombre={empleado.nombre}
            tipo="empleado"
            tipoArticulo="al empleado"
            negro={true}
          />
        </div>
        <Link
          className="font-medium hover:underline h-full"
          href={"/admin/empleado/" + empleado.id}
        >
          {empleado.nombre}
        </Link>
        <div className="w-full flex">
          <p
            className={`text-sm px-1 rounded-full  text-center text-white ${
              empleado.rol == "Administrador"
                ? "bg-red-400"
                : empleado.rol == "Cocinero"
                ? "bg-emerald-500"
                : "bg-indigo-600"
            } `}
          >
            {empleado.rol}
          </p>
        </div>
      </div>
    </div>
  );
}
