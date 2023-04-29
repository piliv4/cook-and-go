import MenuFormulario from "@/components/admins/menu/MenuFormulario";
import supabase from "@/server/client";
import { Menu } from "@/types/Menu";
import { Plato } from "@/types/Plato";
import { GetServerSideProps } from "next";
import router from "next/router";

export default function CrearMenu({
  menu,
  platos,
}: {
  menu: Menu;
  platos: Plato[];
}) {
  const tiposPlato = ["entrantes", "primeros", "segundos", "postres"];
  async function editarMenu(menu: Menu) {
    //BORRAR RELACIONES
    const {} = await supabase
      .from("MenuArticulo")
      .delete()
      .eq("menu_id", menu.id);

    //Modificar campos
    const { data, error } = await supabase
      .from("Menu")
      .update([
        {
          nombre: menu.nombre,
          precio: menu.precio,
          comensales: menu.comensales,
          incluye_pan: menu.incluyePan,
          incluye_bebida: menu.incluyeBebida,
          restaurante_id: "ea443834-c2ff-45e9-9504-ab580bcbbe01",
        },
      ])
      .eq("id", menu.id)
      .select();
    if (!error) {
      tiposPlato.map((tipoPlato) =>
        insertarPlatos(
          menu[tipoPlato as keyof Menu] as Plato[],
          (data[0] as Menu).id,
          tipoPlato
        )
      );
      router.push("/admin/menu");
    }
  }

  function insertarPlatos(platos: Plato[], menuId: string, tipo: string) {
    if (platos.length > 0) {
      platos.map(async (platoAux) => {
        const { error } = await supabase.from("MenuArticulo").insert([
          {
            menu_id: menuId,
            articulo_id: platoAux.id,
            tipo: tipo,
          },
        ]);
        if (!error) {
          return true;
        } else {
          return false;
        }
      });
    } else {
      return true;
    }
  }

  return (
    <MenuFormulario crearEditar={editarMenu} menuProp={menu} platos={platos} />
  );
}

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

  let { data: platos } = await supabase.from("Articulo").select("*");

  return {
    props: {
      menu: menu as Menu,
      platos: platos as Plato[],
    },
  };
};
