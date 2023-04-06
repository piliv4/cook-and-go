import supabase from "@/server/client";
import { Menu } from "@/types/types";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  let { data: menu } = await supabase
    .from("Menu")
    .select("*")
    .eq("id", id)
    .single();
  //RECUPERAMOS LOS PLATOS
  menu.primeros = [];
  menu.segundos = [];
  menu.entrantes = [];
  menu.postres = [];

  let { data: platosId } = await supabase
    .from("MenuArticulo")
    .select()
    .eq("menu_id", menu.id);

  if (platosId != null) {
    for (const id of platosId) {
      let { data: plato } = await supabase
        .from("Articulo")
        .select("*")
        .eq("id", id.articulo_id);
      if (plato) {
        switch (id.tipo) {
          case "primero":
            menu.primeros.push(plato);
            break;
          case "segundo":
            menu.primeros.push(plato);
            break;
          case "entrante":
            menu.segundos.push(plato);
            break;
          case "postre":
            menu.postres.push(plato);
            break;
          default:
            break;
        }
      }
    }
  }

  return {
    props: {
      menu: menu,
    },
  };
};

const DetallesMenu = ({ menu }: { menu: Menu }) => {
  return <div>{menu ? menu.nombre : "uhoh :("}</div>;
};

export default DetallesMenu;
