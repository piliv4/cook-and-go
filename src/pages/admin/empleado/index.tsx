import Buscador from "@/components/admins/ui/Buscador";
import { getAllEmpleados } from "@/api/empleado";
import { Empleado } from "@/types/Empleado";
import EmpleadoCard from "@/components/admins/empleados/EmpleadoCard";
import router from "next/router";

export async function getServerSideProps() {
  let empleados = await getAllEmpleados();
  return {
    props: {
      empleados: empleados,
    },
  };
}

export default function EmpleadoIndex({
  empleados,
}: {
  empleados: Empleado[];
}) {
  return (
    <div className="flex flex-col gap-4 ">
      <div className="grid grid-cols-[80%_20%] w-full pb-3 border-primaryGreen border-double border-b-4">
        <h1 className="text-2xl font-black ">Todos mis empleados</h1>
        <button
          className=" rounded-full border font-black bg-primaryOrange text-white hover:scale-105 transition duration-100 "
          onClick={() => router.push("/admin/empleado/crearEmpleado")}
        >
          Crear nuevo empleado
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-1 sm:gap-3 ">
        {empleados.map((empleado) => (
          <EmpleadoCard key={empleado.id} empleado={empleado} />
        ))}
      </div>
    </div>
  );
}
