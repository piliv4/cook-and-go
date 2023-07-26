import {
  getAllEstablecimientos,
  getAllEstablecimientosByUsuario,
} from "@/api/establecimiento";
import CrearEstablecimientoCard from "@/components/admins/establecimiento/CrearEstablecimientoCard";
import EstablecimientoCard from "@/components/admins/establecimiento/EstablecimientoCard";
import AdministradorAutorizado from "@/components/admins/ui/AdministradorAutorizado";
import CabeceraPagina from "@/components/admins/ui/CabeceraPagina";
import UsuarioAutorizado from "@/components/layout/UsuarioAutorizado";
import { UsuarioContext } from "@/context/UsuarioContext";
import { Establecimiento } from "@/types/Establecimiento";
import router, { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

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
      <AdministradorAutorizado>
        <div className="flex flex-col gap-2 sm:gap-4">
          <CabeceraPagina>
            <div className=" text-xl sm:text-2xl font-black flex items-end">
              <h1>Todos mis establecimientos</h1>
              <abbr title="Los establecimientos son los locales que tienes a tu cargo">
                <AiOutlineInfoCircle className="ml-1 " size={24} />
              </abbr>
            </div>
          </CabeceraPagina>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-1 sm:gap-3 ">
            <CrearEstablecimientoCard />
            {establecimientos.map((establecimiento) => (
              <EstablecimientoCard
                establecimiento={establecimiento}
                key={establecimiento.id}
              />
            ))}
          </div>
        </div>
      </AdministradorAutorizado>
    </UsuarioAutorizado>
  );
}
