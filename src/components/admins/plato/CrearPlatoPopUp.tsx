import supabase from "@/server/client";
import { Categoria, Plato } from "@/types/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import SeleccionarIngredientes from "./SeleccionarIngredientes";

const CrearPlatoPopUp = ({
  platoEditar,
  cerrarPopUp,
  open,
}: {
  platoEditar: Plato | null;
  cerrarPopUp: Function;
  open: boolean;
  categorias: Categoria[];
}) => {
  const router = useRouter();
  const categoriaURI = router.query;
  const [categorias, setCategorias] = useState<Categoria[] | null>(null);
  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase.from("Categoria").select();
      setCategorias(data as Categoria[]);
    };
    fetchPosts();
  }, []);

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

  async function editarPlato() {
    const { error } = await supabase
      .from("Articulo")
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
    platoEditar ? editarPlato() : crearPlato();
    cerrarPopUp();
  }

  return (
    <Popup open={open} modal closeOnDocumentClick onClose={() => cerrarPopUp()}>
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-600 bg-opacity-10 backdrop-blur-sm  ">
        <div className="  w-3/5 sm:w-2/5 rounded-md bg-background xl:w-1/5 overflow-hidden flex flex-col ">
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
              <textarea
                defaultValue={plato.descripcion}
                rows={2}
                className="px-6 border-[1px] h-auto w-full rounded-md resize-none "
                onChange={(e) =>
                  setPlato({
                    ...plato,
                    descripcion: e.target.value.toString(),
                  } as Plato)
                }
              ></textarea>
            </div>

            <div className="flex flex-col gap-y-[2px]">
              <p className="font-thin">Categoría</p>
              <select
                onChange={(e) => {
                  setPlato({
                    ...plato,
                    categoria: e.target.value,
                  } as Plato);
                }}
              >
                {categorias?.map((categoria) => (
                  <option
                    key={categoria.id}
                    value={categoria.id}
                    selected={
                      platoEditar?.categoria == categoria.id ||
                      categoriaURI.id == categoria.id
                    }
                  >
                    {categoria.nombre}
                  </option>
                ))}
              </select>
              <SeleccionarIngredientes />
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
