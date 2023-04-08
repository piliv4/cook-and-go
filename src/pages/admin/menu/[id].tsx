import CabeceraPagina from "@/components/admins/ui/CabeceraPagina";
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
  (menu as Menu).primeros = [];
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
  return (
    <div className="px-48 ">
      <CabeceraPagina>
        <h1 className="text-2xl font-black col-span-3 text-center uppercase ">
          {menu.nombre}
        </h1>
      </CabeceraPagina>
      <div>
        <div className="flex flex-row">
          <p>Comensales</p>
          <p>{menu.comensales}</p>
        </div>
        <div className="flex flex-row">
          <p>Precio</p>
          <p>{menu.precio}</p>
        </div>
      </div>
      {/* SECCIONES DEL MENU */}
      <div className=" flex flex-col">
        {menu.entrantes.length > 0 && (
          <div>
            <h1>Entrantes</h1>
            <div className="flex">
              {menu.entrantes.map((plato) => (
                <p key={plato.id}>{plato.nombre}</p>
              ))}
            </div>
          </div>
        )}
        {menu.primeros.length > 0 && (
          <div>
            <h1>Primeros</h1>
            <div className="flex">
              {menu.entrantes.map((plato) => (
                <p key={plato.id}>{plato.nombre}</p>
              ))}
            </div>
          </div>
        )}
        {menu.segundos.length > 0 && (
          <div>
            <h1>Segundos</h1>
            <div className="flex">
              {menu.entrantes.map((plato) => (
                <p key={plato.id}>{plato.nombre}</p>
              ))}
            </div>
          </div>
        )}
        {menu.postres.length > 0 && (
          <div>
            <h1>Postres</h1>
            <div className="flex">
              {menu.entrantes.map((plato) => (
                <p key={plato.id}>{plato.nombre}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetallesMenu;
