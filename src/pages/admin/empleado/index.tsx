import { getAllEmpleadosByEstablecimiento } from "@/api/empleado";
import { Empleado } from "@/types/Empleado";
import EmpleadoCard from "@/components/admins/empleados/EmpleadoCard";
import router, { useRouter } from "next/router";
import UsuarioAutorizado from "@/components/layout/UsuarioAutorizado";
import { useContext, useEffect, useState } from "react";
import { EstablecimientoContext } from "@/context/EstablecimientoContext";
import VerificarEstablecimiento from "@/components/admins/ui/VerificarEstablecimiento";

export default function EmpleadoIndex() {
  const { establecimientoGlobal } = useContext(EstablecimientoContext);

  //OBTERNER LOS MENUS EN FUNCION DEL ESTABLECIMIENTO
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Realiza la llamada a getAllIngredientes para obtener los ingredientes actualizados
    const fetchEmpleados = async () => {
      let empleadosAux = [] as Empleado[];
      if (establecimientoGlobal.id != undefined) {
        empleadosAux = await getAllEmpleadosByEstablecimiento(
          establecimientoGlobal.id
        );
      }
      setEmpleados(empleadosAux);
    };

    // Verifica si el componente se carga directamente o se realiza un reemplazo de la ruta
    if (router.asPath === router.route) {
      fetchEmpleados();
    }
  }, [establecimientoGlobal, router]);
  return (
    <UsuarioAutorizado>
      <VerificarEstablecimiento>
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
      </VerificarEstablecimiento>
    </UsuarioAutorizado>
  );
}
