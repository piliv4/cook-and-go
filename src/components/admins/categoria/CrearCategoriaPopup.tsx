import supabase from "@/server/client";
import { Categoria } from "@/types/types";
import router from "next/router";
import { useState } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import Popup from "reactjs-popup";

const CrearCategoriaPopup = ({
  cancelHandler,
  acceptHandler,
}: {
  cancelHandler: Function;
  acceptHandler: Function;
}) => {
  const [categoria, setcategoria] = useState<Categoria>({
    id: "",
    nombre: "",
    descripcion: "",
  });

  async function crearCategoria() {
    const { error } = await supabase.from("Categoria").insert([
      {
        nombre: categoria.nombre,
        descripcion: categoria.descripcion,
      },
    ]);
    if (!error) {
      router.replace(router.asPath);
    }
  }

  function aceptar() {
    crearCategoria();
    acceptHandler();
  }
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-600 bg-opacity-10 backdrop-blur-sm  ">
      <div className="  w-3/5 sm:w-2/5 rounded-md bg-background xl:w-1/5 overflow-hidden">
        <div className="bg-primaryGreen py-2 text-center font-semibold text-lg text-white">
          Crear nueva categoría
        </div>
        <div className="flex flex-col px-2 gap-y-6 items-center py-4">
          <div className="flex flex-col gap-y-[2px]">
            <p className="font-thin">Nombre</p>
            <input
              type={"text"}
              className="px-6 border-[1px] rounded-md"
              onChange={(e) =>
                setcategoria({
                  ...categoria,
                  nombre: e.target.value.toString(),
                } as Categoria)
              }
            />
          </div>
          <div className="flex flex-col gap-y-[2px]">
            <p className="font-thin">Descripción</p>
            <input
              type={"text"}
              className="px-6 border-[1px] rounded-md"
              onChange={(e) =>
                setcategoria({
                  ...categoria,
                  descripcion: e.target.value.toString(),
                } as Categoria)
              }
            ></input>
          </div>
        </div>
        <div className="mb-3 mr-3 flex justify-end gap-2 font-">
          <button
            className=" ml-3 mt-3 rounded-full border border-primaryOrange bg-transparent px-1 hover:scale-105 transition duration-100 sm:mt-5 sm:px-3"
            onClick={() => cancelHandler()}
          >
            Cancelar
          </button>
          <button
            className="btn-sm mt-3 rounded-full bg-primaryOrange text-white  hover:scale-105 transition duration-100 sm:mt-5 sm:py-1 sm:px-4"
            onClick={() => aceptar()}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};
export default CrearCategoriaPopup;
