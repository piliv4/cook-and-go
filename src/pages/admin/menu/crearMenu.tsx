import SeccionMenu from "@/components/admins/menu/SeccionMenu";
import CabeceraPagina from "@/components/admins/ui/CabeceraPagina";
import supabase from "@/server/client";
import { Menu, Plato } from "@/types/types";
import router from "next/router";
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
  const [errorTitulo, setErrorTitulo] = useState("");
  const [errorPrecio, setErrorPrecio] = useState("");
  const [errorComensales, setErrorComensales] = useState("");
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
      anyadirPlatos(entrantes, (data[0] as Menu).id, "entrantes") &&
        anyadirPlatos(primeros, (data[0] as Menu).id, "primeros") &&
        anyadirPlatos(segundos, (data[0] as Menu).id, "terceros") &&
        anyadirPlatos(postres, (data[0] as Menu).id, "postres") &&
        router.push("/admin/menu");
    }
  }

  function validacionCampos() {
    setErrorComensales("");
    setErrorPrecio("");
    setErrorTitulo("");
    if (menu.nombre == "" || menu.nombre == null) {
      setErrorTitulo("Introduzca un titulo");
    }
    if (menu.precio == null || menu.precio <= 0) {
      setErrorPrecio("Introduzca un precio");
    }
    if (menu.comensales == null || menu.comensales <= 0) {
      setErrorComensales("Introduzca un número de comensales");
    }
    if (
      primeros.length <= 0 &&
      segundos.length <= 0 &&
      entrantes.length <= 0 &&
      postres.length <= 0
    ) {
      return false;
    }
    if (errorComensales == "" || errorPrecio == "" || errorTitulo == "") {
      return false;
    }
    return true;
  }

  function guardar() {
    if (validacionCampos()) {
      crearMenu();
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
    <div className="px-48 ">
      <CabeceraPagina>
        <h1 className="text-2xl font-black col-span-3 text-center uppercase ">
          Crear un nuevo menú
        </h1>
      </CabeceraPagina>
      <div>
        <h1 className="w-full border-b-2 pb-1 text-center pt-4 font-black text-lg border-primaryGreen">
          INFORMACIÓN GENERAL
        </h1>
        <div>
          <div className="flex flex-col gap-y-[1px] w-full pt-2">
            <p className="">Nombre</p>
            <input
              type={"text"}
              className="px-6  border-[1px] rounded-md"
              onChange={(e) => setMenu({ ...menu, nombre: e.target.value })}
            />
            <p className="text-red-600 font-medium">{errorTitulo}</p>
          </div>
          <div className="flex pt-2 flex-row gap-x-4">
            <div className="flex flex-col gap-y-[1px] w-full">
              <p className="">Precio</p>
              <input
                type={"tel"}
                className="px-6 border-[1px] rounded-md"
                onChange={(e) =>
                  setMenu({ ...menu, precio: parseFloat(e.target.value) })
                }
              />
              <p className="text-red-600 font-medium">{errorPrecio}</p>
            </div>
            <div className="flex flex-col gap-y-[1px] w-full">
              <p className="">Número de comensales</p>
              <input
                type="number"
                className="px-6 border-[1px] rounded-md"
                onChange={(e) =>
                  setMenu({ ...menu, comensales: parseInt(e.target.value) })
                }
              />
              <p className="text-red-600 font-medium">{errorComensales}</p>
            </div>
          </div>
        </div>
      </div>
      {/* SECCIONES DEL MENU */}

      <div className=" flex flex-col">
        <h1 className="w-full border-b-2 pb-1 pt-6 text-center font-black text-lg border-primaryGreen">
          PLATOS
        </h1>
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
      <h1 className="w-full border-b-2 pb-1 pt-6 text-center font-black text-lg border-primaryGreen">
        EXTRAS
      </h1>
      <div className="flex flex-col gap-y-4 pt-4">
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
          onClick={() => guardar()}
        >
          Guardar
        </button>
        <button
          className=" ml-3 mt-3 rounded-full border border-primaryOrange bg-transparent px-1 hover:scale-105 transition duration-100 sm:mt-5 sm:px-3"
          onClick={() => router.push("/admin/menu")}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
