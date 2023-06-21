import {
  getAllEstablecimientos,
  getAllEstablecimientosByUsuario,
} from "@/api/establecimiento";
import EstablecimientoCard from "@/components/admins/establecimiento/EstablecimientoCard";
import CabeceraPagina from "@/components/admins/ui/CabeceraPagina";
import UsuarioAutorizado from "@/components/layout/UsuarioAutorizado";
import { UsuarioContext } from "@/context/UsuarioContext";
import { Establecimiento } from "@/types/Establecimiento";
import router, { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

export default function EstablecimientoPage() {
  const { usuarioGlobal } = useContext(UsuarioContext);

  //OBTERNER LOS MENUS EN FUNCION DEL ESTABLECIMIENTO
  const [establecimientos, setEstablecimiento] = useState<Establecimiento[]>(
    []
  );
  const router = useRouter();

  useEffect(() => {
    // Realiza la llamada a getAllIngredientes para obtener los ingredientes actualizados
    const fetchEstablecimientos = async () => {
      let establecimientosAux = [] as Establecimiento[];
      if (usuarioGlobal.id != undefined) {
        establecimientosAux = await getAllEstablecimientosByUsuario(
          usuarioGlobal.id
        );
      }
      setEstablecimiento(establecimientosAux);
    };

    // Verifica si el componente se carga directamente o se realiza un reemplazo de la ruta
    if (router.asPath === router.route) {
      fetchEstablecimientos();
    }
  }, [usuarioGlobal, router]);
  return (
    <UsuarioAutorizado>
      <div className="flex flex-col gap-4">
        <CabeceraPagina>
          <h1 className="text-2xl font-black ">Todos mis establecimiento</h1>
          <div className="flex col-span-2 justify-end">
            <button
              className="self-end rounded-full border h-full px-11 font-black bg-primaryOrange text-white hover:scale-105 transition duration-100 "
              onClick={() =>
                router.push("/admin/establecimiento/crearEstablecimiento")
              }
            >
              Crear establecimiento
            </button>
          </div>
        </CabeceraPagina>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-1 sm:gap-3 ">
          {establecimientos.map((establecimiento) => (
            <EstablecimientoCard
              establecimiento={establecimiento}
              key={establecimiento.id}
            />
          ))}
        </div>
      </div>
    </UsuarioAutorizado>
  );
}
