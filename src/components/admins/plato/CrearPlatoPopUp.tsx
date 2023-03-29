import supabase from "@/server/client";
import { Categoria, Ingrediente, Plato } from "@/types/types";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { BsTrashFill } from "react-icons/bs";
import Popup from "reactjs-popup";
import SubirImagen from "../SubirImagen";
import SeleccionarIngredientes from "./SeleccionarIngredientes";

const CrearPlatoPopUp = ({
  platoEditar,
  cerrarPopUp,
  open,
}: {
  platoEditar: Plato;
  cerrarPopUp: Function;
  open: boolean;
}) => {
  const router = useRouter();
  const categoriaURI = router.query;
  const [plato, setPlato] = useState<Plato>(platoEditar);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    setPlato(platoEditar);
  }, [platoEditar]);

  useEffect(() => {
    const getCategorias = async () => {
      const { data } = await supabase.from("Categoria").select();
      setCategorias(data as Categoria[]);
    };
    getCategorias();
  }, []);

  async function crearPlato() {
    const { data, error } = await supabase
      .from("Articulo")
      .insert([
        {
          nombre: plato.nombre,
          descripcion: plato.descripcion,
          precio: plato.precio,
          categoria_id: plato.categoria,
          imagenURL: plato.imagenURL,
        },
      ])
      .select();
    !error && agregarIngredientes((data as Plato[])[0].id);
  }

  async function editarPlato() {
    console.log(plato.categoria);
    const { error } = await supabase
      .from("Articulo")
      .update([
        {
          nombre: plato.nombre,
          descripcion: plato.descripcion,
          precio: plato.precio,
          categoria_id: plato.categoria,
          imagenURL: plato.imagenURL,
        },
      ])
      .eq("id", platoEditar?.id);

    //Borrar relaciones anteriores de la tabla ArticuloIngrediente
    const { error: error2 } = await supabase
      .from("ArticuloIngrediente")
      .delete()
      .eq("articulo_id", platoEditar?.id);
    //Agregar los ingredientes
    platoEditar && !error && agregarIngredientes(platoEditar.id);
  }

  function agregarIngredientes(platoId: string) {
    plato.ingredientes.map(async (ingrediente) => {
      const { error } = await supabase.from("ArticuloIngrediente").insert([
        {
          ingrediente_id: ingrediente.id,
          articulo_id: platoId,
        },
      ]);
      if (!error) {
        router.replace(router.asPath);
      }
    });
  }

  const aceptar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (open) {
      plato.id ? editarPlato() : crearPlato();
      cerrarPopUp();
    }
  };

  return (
    <Popup open={open} modal closeOnDocumentClick onClose={() => cerrarPopUp()}>
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-600 bg-opacity-10 backdrop-blur-sm  ">
        <div className="   rounded-md bg-background w-[60%] overflow-hidden flex flex-col ">
          <form onSubmit={(e) => aceptar(e)}>
            <div className="bg-primaryGreen py-2 text-center font-semibold text-lg text-white">
              Crear nuevo plato
            </div>
            <SubirImagen
              imagen={plato.imagenURL}
              setImagen={(imagen: string) => {
                setPlato({ ...plato, imagenURL: imagen });
              }}
            />
            <div className="grid grid-cols-2">
              <div className="flex flex-col px-4 gap-y-2 items-center py-2 mt-4 border-r-[1px] ">
                <h1 className="text-xl w-full text-center border-b-[1px] border-primaryGreen">
                  Datos genéricos del plato
                </h1>
                <div className="flex flex-col gap-y-[1px] w-full">
                  <p className="font-thin">Nombre</p>
                  <input
                    type={"text"}
                    id="nombre"
                    defaultValue={plato.nombre}
                    onChange={(e) => {
                      setPlato({ ...plato, nombre: e.target.value });
                    }}
                    className="px-6 border-[1px] rounded-md"
                  />
                </div>

                <div className="flex flex-col gap-y-[1px] w-full">
                  <p className="font-thin">Categoría</p>
                  <select
                    id="categoria"
                    onChange={(e) => {
                      setPlato({ ...plato, categoria: e.target.value });
                    }}
                  >
                    {categorias?.map((categoria) => (
                      <option
                        key={categoria.id}
                        value={categoria.id}
                        selected={
                          plato.categoria == categoria.id ||
                          categoriaURI.id == categoria.id
                        }
                      >
                        {categoria.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-y-[1px] w-full">
                  <p className="font-thin">Descripción</p>
                  <textarea
                    id="descripcion"
                    defaultValue={platoEditar?.descripcion}
                    rows={3}
                    className="px-6 border-[1px] h-auto w-full rounded-md resize-none "
                  ></textarea>
                </div>
              </div>
              {/* SELECCIONAR INGREDIENES */}
              <div className="flex flex-col px-4 gap-y-2 py-2 mt-4">
                <h1 className="text-xl w-full text-center border-b-[1px] border-primaryGreen">
                  Ingredientes del plato
                </h1>
                <div className="pt-[20px]">
                  <SeleccionarIngredientes
                    anyadirIngrediente={(ingrediente: Ingrediente) =>
                      setPlato({
                        ...plato,
                        ingredientes: plato.ingredientes.concat([ingrediente]),
                      })
                    }
                  />
                </div>
                <div className="flex flex-col pt-2 relative">
                  <h1 className=" w-full text-center border-b-[1px] border-secondaryGreen">
                    Mis ingredientes:
                  </h1>
                  {plato.ingredientes.map((ingrediente, index) => (
                    <div
                      key={ingrediente.id}
                      className="flex flex-row border-b-[2px] border-primaryOrange border-dotted"
                    >
                      <p className="w-full font-thin">
                        {index + 1}. {ingrediente.nombre}
                      </p>
                      <button
                        className="px-1"
                        onClick={() =>
                          setPlato({
                            ...plato,
                            ingredientes: plato.ingredientes.filter(
                              (value, i) => i !== index
                            ),
                          })
                        }
                      >
                        <BsTrashFill className="fill-primaryOrange" />
                      </button>
                    </div>
                  ))}
                </div>
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
                type="submit"
                className="btn-sm mt-3 rounded-full bg-primaryOrange text-white  hover:scale-105 transition duration-100 sm:mt-5 sm:py-1 sm:px-4"
              >
                Confirmar
              </button>
            </div>
          </form>
        </div>
      </div>
    </Popup>
  );
};
export default CrearPlatoPopUp;
