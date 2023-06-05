import supabase from "@/server/client";
import { getPlatoById } from "./articulo";
import { Plato } from "@/types/Plato";
import { Menu } from "@/types/Menu";

export const crearMenu = async (menu: Menu) => {
  const tiposPlato = ["entrantes", "primeros", "segundos", "postres"];
  try {
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
    if (!error) {
      tiposPlato.map((tipoPlato) =>
        insertarPlatos(
          menu[tipoPlato as keyof Menu] as Plato[],
          (data[0] as Menu).id,
          tipoPlato
        )
      );
    }

    if (error) {
      throw new Error("Error al crear la categoria");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const eliminarMenu = async (id: string) => {
  await eliminarRelacionesDeMenu(id);
  try {
    const { error } = await supabase.from("Menu").delete().eq("id", id);
    if (error) {
      throw new Error("Error al eliminar el menu");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const eliminarRelacionesDeMenu = async (id: string) => {
  try {
    const { error: error } = await supabase
      .from("MenuArticulo")
      .delete()
      .eq("menu_id", id);

    if (error) {
      throw new Error("Error al eliminar las referencias de menu a plato");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllMenus = async () => {
  try {
    const { data, error } = await supabase
      .from("Menu")
      .select("*")
      .order("nombre");
    if (error) {
      throw new Error("Error al eliminar el menu");
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMenuById = async (id: string) => {
  try {
    const { data: menu, error } = await supabase
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
      for (const platoId of platosId) {
        let plato = await getPlatoById(platoId.articulo_id);
        if (plato) {
          switch (platoId.tipo) {
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

    if (error) {
      throw new Error("Error al obtener todas las categorias");
    }
    return menu;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const insertarPlatos = async (
  platos: Plato[],
  menuId: string,
  tipo: string
) => {
  if (platos.length > 0) {
    platos.map(async (platoAux) => {
      try {
        const { error: error } = await supabase.from("MenuArticulo").insert([
          {
            menu_id: menuId,
            articulo_id: platoAux.id,
            tipo: tipo,
          },
        ]);
        if (!error) {
          return true;
        } else {
          throw new Error("Error al insertar plato");
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    });
  } else {
    return true;
  }
};

export const modificarMenu = async (menu: Menu) => {
  const tiposPlato = ["entrantes", "primeros", "segundos", "postres"];
  eliminarRelacionesDeMenu(menu.id);
  try {
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
    }
    if (error) {
      throw new Error("Error al crear la categoria");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
