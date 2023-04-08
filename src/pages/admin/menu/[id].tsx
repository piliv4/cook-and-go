import DisplayerPlatos from "@/components/admins/menu/DisplayerPlatos";
import CabeceraPagina from "@/components/admins/ui/CabeceraPagina";
import supabase from "@/server/client";
import { Menu, Plato } from "@/types/types";
import { GetServerSideProps } from "next";

const DetallesMenu = ({ menu }: { menu: Menu }) => {
  console.log(menu);
  const tiposMenu = ["entrantes", "primeros", "segundos", "postres"];
  function montarCadena() {
    let incluyeTexto = "";
    if (!menu.incluyeBebida && !menu.incluyeBebida) {
      incluyeTexto = "Pan y bebida no incluidos";
      return incluyeTexto;
    }
    if (menu.incluyeBebida) {
      incluyeTexto += "bebida ";
      menu.incluyePan && incluyeTexto + "y ";
    }
    if (menu.incluyePan) incluyeTexto += "pan ";
    incluyeTexto += "incluida";
    if (menu.incluyePan && menu.incluyeBebida) incluyeTexto += "s";
    return incluyeTexto;
  }
  return (
    <div className="px-48 ">
      <CabeceraPagina>
        <h1 className="text-2xl font-black col-span-3 text-center uppercase ">
          {menu.nombre} para {menu.comensales} persona(s)
        </h1>
      </CabeceraPagina>
      {/* SECCIONES DEL MENU */}
      {tiposMenu.map((tipoMenu) => (
        <DisplayerPlatos
          key={tipoMenu}
          titulo={tipoMenu}
          platos={menu[tipoMenu as keyof Menu] as Plato[]}
        />
      ))}
      <p>{montarCadena()}</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  let { data: menu } = await supabase
    .from("Menu")
    .select("*")
    .eq("id", id)
    .single();

  //RECUPERAMOS LOS PLATOS
  menu.entrantes = [];
  menu.primeros = [];
  menu.segundos = [];
  menu.postres = [];
  menu.incluyePan = menu.incluye_pan;
  menu.incluyeBebida = menu.incluye_bebida;

  let { data: platosId } = await supabase
    .from("MenuArticulo")
    .select()
    .eq("menu_id", menu.id);

  if (platosId != null) {
    for (const id of platosId) {
      let { data: plato } = await supabase
        .from("Articulo")
        .select("*")
        .eq("id", id.articulo_id)
        .single();
      if (plato) {
        switch (id.tipo) {
          case "entrantes":
            menu.entrantes.push(plato);
            break;

          case "primeros":
            menu.primeros.push(plato);
            break;

          case "segundos":
            menu.segundos.push(plato);
            break;

          case "postres":
            menu.postres.push(plato);
            break;
        }
      }
    }
  }

  return {
    props: {
      menu: menu as Menu,
    },
  };
};

export default DetallesMenu;
