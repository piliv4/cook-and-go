import MenuFormulario from "@/components/admins/menu/MenuFormulario";
import supabase from "@/server/client";
import { Menu } from "@/types/Menu";
import { Plato } from "@/types/Plato";
import router from "next/router";

export async function getStaticProps() {
  let { data: platos } = await supabase.from("Articulo").select("*");
  return {
    props: {
      platos: platos as Plato[],
    },
  };
}

export default function CrearMenu({ platos }: { platos: Plato[] }) {
  const tiposPlato = ["entrantes", "primeros", "segundos", "postres"];
  async function crearMenu(menu: Menu) {
    const { data, error } = await supabase
      .from("Menu")
      .insert([
        {
          nombre: menu.nombre,
          precio: menu.precio,
          comensales: menu.comensales,
          incluye_pan: menu.incluyePan,
          incluye_bebida: menu.incluyeBebida,
          restaurante_id: "ea443834-c2ff-45e9-9504-ab580bcbbe01",
        },
      ])
      .select();
    console.log(error);
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
    <MenuFormulario crearEditar={crearMenu} menuProp={null} platos={platos} />
  );
}
