import SeccionMenu from "@/components/admins/menu/SeccionMenu";
import CabeceraPagina from "@/components/admins/ui/CabeceraPagina";
import supabase from "@/server/client";
import { Menu, Plato } from "@/types/types";
import { useState } from "react";

export async function getStaticProps() {
  let { data: platos } = await supabase.from("Articulo").select("*");
  return {
    props: {
      platos: platos as Plato[],
    },
  };
}

export default function CrearMenu({ platos }: { platos: Plato[] }) {
  const [menu, setMenu] = useState<Menu>({
    id: "",
    nombre: "",
    precio: 0,
    comensales: 0,
    incluyePan: false,
    incluyeBebida: false,
  });

  const [entrantes, setEntrantes] = useState<Plato[]>([]);
  const [primeros, setPrimeros] = useState<Plato[]>([]);
  const [segundos, setSegundos] = useState<Plato[]>([]);
  const [postres, setPostres] = useState<Plato[]>([]);

  async function crearMenu() {
    const { data, error } = await supabase
      .from("Menu")
      .insert([
        {
          nombre: menu.nombre,
          precio: menu.precio,
          num_personas: menu.comensales,
          incluye_pan: menu.incluyePan,
          incluye_bebida: menu.incluyeBebida,
          restaurante_id: "ea443834-c2ff-45e9-9504-ab580bcbbe01",
        },
      ])
      .select();
    if (!error) {
      anyadirPlatos(entrantes, (data[0] as Menu).id, "entrantes");
      anyadirPlatos(primeros, (data[0] as Menu).id, "primeros");
      anyadirPlatos(segundos, (data[0] as Menu).id, "terceros");
      anyadirPlatos(postres, (data[0] as Menu).id, "postres");
    }
  }

  function anyadirPlatos(platos: Plato[], menuId: string, tipo: string) {
    if (platos.length > 0) {
      platos.map(async (platoAux) => {
        const { error } = await supabase.from("MenuArticulo").insert([
          {
            menu_id: menuId,
            articulo_id: platoAux.id,
            tipo: tipo,
          },
        ]);
      });
    }
  }

  return (
    <div className="px-48 ">
      <CabeceraPagina>
        <h1 className="text-2xl font-black col-span-3 text-center uppercase ">
          Crear un nuevo menú
        </h1>
      </CabeceraPagina>
      <div>
        <h1>Información general</h1>
        <div className="flex flex-col gap-y-[1px] w-full">
          <p className="font-thin">Nombre</p>
          <input
            type={"text"}
            className="px-6 border-[1px] rounded-md"
            onChange={(e) => setMenu({ ...menu, nombre: e.target.value })}
          />
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col gap-y-[1px] w-full">
            <p className="font-thin">Precio</p>
            <input
              type={"tel"}
              className="px-6 border-[1px] rounded-md"
              onChange={(e) =>
                setMenu({ ...menu, precio: parseFloat(e.target.value) })
              }
            />
          </div>
          <div className="flex flex-col gap-y-[1px] w-full">
            <p className="font-thin">Comensales</p>
            <input
              type="number"
              className="px-6 border-[1px] rounded-md"
              onChange={(e) =>
                setMenu({ ...menu, comensales: parseInt(e.target.value) })
              }
            />
          </div>
        </div>
      </div>
      {/* SECCIONES DEL MENU */}
      <div className=" flex flex-col">
        <SeccionMenu
          titulo={"Entrantes"}
          platos={platos}
          setPlatosAnyadidos={setEntrantes}
          platosAnyadidos={entrantes}
        />
        <SeccionMenu
          titulo={"Primeros"}
          platos={platos}
          setPlatosAnyadidos={setPrimeros}
          platosAnyadidos={primeros}
        />
        <SeccionMenu
          titulo={"Segundos"}
          platos={platos}
          setPlatosAnyadidos={setSegundos}
          platosAnyadidos={segundos}
        />
        <SeccionMenu
          titulo={"Postres"}
          platos={platos}
          setPlatosAnyadidos={setPostres}
          platosAnyadidos={postres}
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <div className="flex flex-row border-b-[1px] border-primaryGreen">
          <p className="w-full font-black">¿Incluir pan?</p>
          <label className="flex flex-row gap-x-1 font-light">
            Incluir
            <input
              type="checkbox"
              onChange={(e) =>
                setMenu({ ...menu, incluyePan: e.target.checked })
              }
            />
          </label>
        </div>
        <div className="flex flex-row border-b-[1px] border-primaryGreen">
          <p className="w-full font-black">¿Incluir bebida?</p>
          <label className="flex flex-row gap-x-1 font-light">
            Incluir
            <input
              type="checkbox"
              onChange={(e) =>
                setMenu({ ...menu, incluyeBebida: e.target.checked })
              }
            />
          </label>
        </div>
      </div>
      <div className=" flex flex-row justify-end gap-x-2 font-black py-4">
        <button
          className=" ml-3 mt-3 rounded-full border text-white border-primaryOrange bg-primaryOrange px-1 hover:scale-105 transition duration-100 sm:mt-5 sm:px-3"
          onClick={() => crearMenu()}
        >
          Guardar
        </button>
        <button className=" ml-3 mt-3 rounded-full border border-primaryOrange bg-transparent px-1 hover:scale-105 transition duration-100 sm:mt-5 sm:px-3">
          Cancelar
        </button>
      </div>
    </div>
  );
}
