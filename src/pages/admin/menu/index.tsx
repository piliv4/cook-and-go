import { getAllMenus, getAllMenusByEstablecimiento } from "@/api/menu";
import CrearMenu from "@/components/admins/menu/CrearMenu";
import MenuCard from "@/components/admins/menu/MenuCard";
import AdministradorAutorizado from "@/components/admins/ui/AdministradorAutorizado";
import Buscador from "@/components/admins/ui/Buscador";
import CabeceraPagina from "@/components/admins/ui/CabeceraPagina";
import VerificarEstablecimiento from "@/components/admins/ui/VerificarEstablecimiento";
import UsuarioAutorizado from "@/components/layout/UsuarioAutorizado";
import Loading from "@/components/layout/loadingGif";
import { EstablecimientoContext } from "@/context/EstablecimientoContext";
import { Menu } from "@/types/Menu";
import router, { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

export default function MenuPagina() {
  const { establecimientoGlobal } = useContext(EstablecimientoContext);

  //OBTERNER LOS MENUS EN FUNCION DEL ESTABLECIMIENTO
  const [menus, setMenus] = useState<Menu[]>();
  const router = useRouter();

  useEffect(() => {
    // Realiza la llamada a getAllIngredientes para obtener los ingredientes actualizados
    const fetchIngredientes = async () => {
      let menusAux = [];
      if (establecimientoGlobal.id != undefined) {
        menusAux = await getAllMenusByEstablecimiento(establecimientoGlobal.id);
      }
      setMenus(menusAux);
    };

    // Verifica si el componente se carga directamente o se realiza un reemplazo de la ruta
    if (router.asPath === router.route) {
      fetchIngredientes();
    }
  }, [establecimientoGlobal, router]);

  return (
    <UsuarioAutorizado>
      <AdministradorAutorizado>
        <VerificarEstablecimiento>
          <div className="flex flex-col gap-2 sm:gap-4 ">
            <CabeceraPagina>
              <h1 className=" text-xl sm:text-2xl font-black col-span-2 ">
                Todos mis menús
              </h1>
            </CabeceraPagina>
            <div className="pt-1 sm:pt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-1 sm:gap-3 ">
              <>
                {menus ? (
                  <>
                    <CrearMenu />
                    {menus.map((menu) => (
                      <MenuCard key={menu.id} menu={menu} />
                    ))}
                  </>
                ) : (
                  <div className="col-span-full flex justify-center pt-6">
                    <Loading />
                  </div>
                )}
              </>
            </div>
          </div>
        </VerificarEstablecimiento>
      </AdministradorAutorizado>
    </UsuarioAutorizado>
  );
}
