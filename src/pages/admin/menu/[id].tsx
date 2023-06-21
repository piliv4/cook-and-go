import { eliminarMenu, getMenuById } from "@/api/menu";
import DisplayerPlatos from "@/components/admins/menu/DisplayerPlatos";
import AdministradorAutorizado from "@/components/admins/ui/AdministradorAutorizado";
import BorrarCofirmacion from "@/components/admins/ui/BorrarConfirmacion";
import CabeceraPagina from "@/components/admins/ui/CabeceraPagina";
import VerificarEstablecimiento from "@/components/admins/ui/VerificarEstablecimiento";
import UsuarioAutorizado from "@/components/layout/UsuarioAutorizado";
import { Menu } from "@/types/Menu";
import { Plato } from "@/types/Plato";
import { tiposPlato } from "@/types/enum";
import { GetServerSideProps } from "next";
import router from "next/router";
import { BsFillPencilFill } from "react-icons/bs";

const DetallesMenu = ({ menu }: { menu: Menu }) => {
  async function borrarMenu() {
    try {
      await eliminarMenu(menu.id);
    } catch (error) {
      console.log("Error al eliminar el menu");
    }
    router.replace("/admin/menu");
  }

  function montarCadena() {
    if (menu.incluyeBebida && !menu.incluyePan) {
      return "Bebida incluida";
    }
    if (!menu.incluyeBebida && menu.incluyePan) {
      return "Pan incluido";
    }
    if (menu.incluyeBebida && menu.incluyePan) {
      return "Pan y bebida incluidos";
    }
    return "Pan y bebida no incluidos";
  }
  return (
    <UsuarioAutorizado>
      <AdministradorAutorizado>
        <VerificarEstablecimiento>
          <div className="px-48 ">
            <CabeceraPagina>
              <div className="text-2xl font-black col-span-3 text-center uppercase relative">
                {menu.nombre} para {menu.comensales} persona(s)
                <div className="absolute top-1/2 right-0 flex flex-row gap-3">
                  <BsFillPencilFill
                    className="group fill-black hover:fill-secondaryOrange transition duration-150"
                    onClick={() => router.push("/admin/menu/editar/" + menu.id)}
                  />
                  <BorrarCofirmacion
                    borrar={() => borrarMenu()}
                    nombre={menu.nombre}
                    tipo="menú"
                    tipoArticulo="el menú"
                    negro={true}
                  />
                </div>
              </div>
            </CabeceraPagina>
            {/* SECCIONES DEL MENU */}
            {tiposPlato.map(
              (tipoPlato) =>
                (menu[tipoPlato as keyof Menu] as Plato[]).length > 0 && (
                  <DisplayerPlatos
                    key={tipoPlato}
                    titulo={tipoPlato}
                    platos={menu[tipoPlato as keyof Menu] as Plato[]}
                  />
                )
            )}
            <p className="w-full text-center py-2">{montarCadena()}</p>
            <div className="flex flex-row font-black text-xl">
              <p className="w-full">Precio</p>
              <p>{(Math.round(menu.precio * 100) / 100).toFixed(2)}€</p>
            </div>
          </div>
        </VerificarEstablecimiento>
      </AdministradorAutorizado>
    </UsuarioAutorizado>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  let menu = await getMenuById(id as string);

  return {
    props: {
      menu: menu as Menu,
    },
  };
};

export default DetallesMenu;
