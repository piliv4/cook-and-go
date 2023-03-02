import supabase from "@/server/client";
import { Categoria, Plato } from "@/types/types";
import router from "next/router";
import { useState } from "react";
import Popup from "reactjs-popup";

export async function getServerSideProps() {
  let { data: categorias } = await supabase.from("Categoria").select("*");
  return {
    props: {
      categorias: categorias as Categoria[],
    },
  };
}

const CrearPlatoPopUp = ({
  platoEditar,
  cerrarPopUp,
  open,
  categorias,
}: {
  platoEditar: Plato | null;
  cerrarPopUp: Function;
  open: boolean;
  categorias: Categoria[];
}) => {
  const categoriaURI = router.pathname.split("/")[3];
  const [plato, setPlato] = useState<Plato>(
    platoEditar
      ? platoEditar
      : {
          id: "",
          nombre: "",
          descripcion: "",
          precio: 0,
          categoria: "",
        }
  );
  async function crearPlato() {
    const { error } = await supabase.from("Articulo").insert([
      {
        nombre: plato.nombre,
        descripcion: plato.descripcion,
        precio: plato.precio,
        categoria_id: plato.categoria,
      },
    ]);
    if (!error) {
      router.replace(router.asPath);
    }
  }

  async function editarCategoria() {
    const { error } = await supabase
      .from("Categoria")
      .update([
        {
          nombre: plato.nombre,
          descripcion: plato.descripcion,
          precio: plato.precio,
          categoria_id: plato.categoria,
        },
      ])
      .eq("id", platoEditar?.id);
    if (!error) {
      router.replace(router.asPath);
    }
  }

  function aceptar() {
    platoEditar ? editarCategoria() : crearPlato();
    cerrarPopUp();
  }

  return (
    <Popup open={open} modal closeOnDocumentClick onClose={() => cerrarPopUp()}>
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
                defaultValue={plato.nombre}
                className="px-6 border-[1px] rounded-md"
                onChange={(e) =>
                  setPlato({
                    ...plato,
                    nombre: e.target.value.toString(),
                  } as Plato)
                }
              />
            </div>

            <div className="flex flex-col gap-y-[2px]">
              <p className="font-thin">Descripción</p>
              <input
                type={"text"}
                defaultValue={plato.descripcion}
                className="px-6 border-[1px] rounded-md"
                onChange={(e) =>
                  setPlato({
                    ...plato,
                    descripcion: e.target.value.toString(),
                  } as Plato)
                }
              ></input>
            </div>

            <div className="flex flex-col gap-y-[2px]">
              <p className="font-thin">Categoría</p>
              <select>
                {categorias.map((categoria) => (
                  <option
                    key={categoria.id}
                    value={categoria.id}
                    selected={
                      platoEditar?.categoria == categoria.id ||
                      categoriaURI == categoria.id
                    }
                  >
                    {categoria.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-3 mr-3 flex justify-end gap-2 font-">
            <button
              className=" ml-3 mt-3 rounded-full border border-primaryOrange bg-transparent px-1 hover:scale-105 transition duration-100 sm:mt-5 sm:px-3"
              onClick={() => cerrarPopUp()}
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
    </Popup>
  );
};
export default CrearPlatoPopUp;
