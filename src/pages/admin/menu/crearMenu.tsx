import SeccionMenu from "@/components/admins/menu/SeccionMenu";
import CabeceraPagina from "@/components/admins/ui/CabeceraPagina";
import supabase from "@/server/client";
import { Plato } from "@/types/types";
import { useState } from "react";

export async function getStaticProps() {
  let { data: platos } = await supabase.from("Articulo").select("*");
  return {
    props: {
      platos: platos as Plato[],
    },
  };
}

export default function CrearMenu(platos: Plato[]) {
  const menuCategorias = ["Entrantes", "Primeros", "Segundos", "Postres"];
  const [entrantes, setEntrantes] = useState([]);
  const [primeros, setPrimeros] = useState([]);
  const [segundos, setSegundos] = useState([]);
  const [postres, setPostres] = useState([]);
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
          <input type={"text"} className="px-6 border-[1px] rounded-md" />
        </div>
        <div className="flex flex-col gap-y-[1px] w-full">
          <p className="font-thin">Precio</p>
          <input type={"tel"} className="px-6 border-[1px] rounded-md" />
        </div>
      </div>
      {/* SECCIONES DEL MENU */}
      <div className=" flex flex-col">
        <SeccionMenu
          titulo={"Entrantes"}
          platos={platos}
          anyadirPlato={setEntrantes}
          platosAnyadidos={entrantes}
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <div className="flex flex-row border-b-[1px] border-primaryGreen">
          <p className="w-full font-black">¿Incluir pan?</p>
          <label className="flex flex-row gap-x-1 font-light">
            Incluir
            <input type="checkbox" />
          </label>
        </div>
        <div className="flex flex-row border-b-[1px] border-primaryGreen">
          <p className="w-full font-black">¿Incluir bebida?</p>
          <label className="flex flex-row gap-x-1 font-light">
            Incluir
            <input type="checkbox" />
          </label>
        </div>
      </div>
      <div className=" flex flex-row justify-end gap-x-2 font-black">
        <button className=" ml-3 mt-3 rounded-full border text-white border-primaryOrange bg-primaryOrange px-1 hover:scale-105 transition duration-100 sm:mt-5 sm:px-3">
          Guardar
        </button>
        <button className=" ml-3 mt-3 rounded-full border border-primaryOrange bg-transparent px-1 hover:scale-105 transition duration-100 sm:mt-5 sm:px-3">
          Cancelar
        </button>
      </div>
    </div>
  );
}
