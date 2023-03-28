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
  platoEditar: Plato | null;
  cerrarPopUp: Function;
  open: boolean;
}) => {
  const router = useRouter();
  const categoriaURI = router.query;
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>(
    platoEditar ? platoEditar.ingredientes : []
  );
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [imagen, setImagen] = useState(
    platoEditar ? platoEditar?.imagenURL : ""
  );
  useEffect(() => {
    console.log("culo");
    if (platoEditar) {
      setImagen(platoEditar.imagenURL);
      setIngredientes(platoEditar.ingredientes);
    }
  }, [platoEditar]);

  useEffect(() => {
    const getCategorias = async () => {
      const { data } = await supabase.from("Categoria").select();
      setCategorias(data as Categoria[]);
    };
    getCategorias();
  }, []);
  console.log(platoEditar?.ingredientes);
  async function crearPlato(
    nombre: string,
    descripcion: string,
    categoria: string
  ) {
    const { data, error } = await supabase
      .from("Articulo")
      .insert([
        {
          nombre: nombre,
          descripcion: descripcion,
          precio: 10,
          categoria_id: categoria,
          imagenURL: imagen,
        },
      ])
      .select();
    !error && agregarIngredientes((data as Plato[])[0].id);
  }

  async function editarPlato(
    nombre: string,
    descripcion: string,
    categoria: string
  ) {
    const { error } = await supabase
      .from("Articulo")
      .update([
        {
          nombre: nombre,
          descripcion: descripcion,
          precio: 10,
          categoria_id: categoria,
          imagenURL: imagen,
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
    ingredientes.map(async (ingrediente) => {
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
      const { nombre, descripcion, categoria } = e.target as typeof e.target & {
        nombre: { value: string };
        descripcion: { value: string };
        categoria: { value: string };
      };
      platoEditar
        ? editarPlato(nombre.value, descripcion.value, categoria.value)
        : crearPlato(nombre.value, descripcion.value, categoria.value);
      setIngredientes([]);
      setImagen("");
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
            <SubirImagen imagen={imagen} setImagen={setImagen} />
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
                    defaultValue={platoEditar?.nombre}
                    className="px-6 border-[1px] rounded-md"
                  />
                </div>

                <div className="flex flex-col gap-y-[1px] w-full">
                  <p className="font-thin">Categoría</p>
                  <select id="categoria">
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
                    anyadirIngrediente={setIngredientes}
                  />
                </div>
                <div className="flex flex-col pt-2 relative">
                  <h1 className=" w-full text-center border-b-[1px] border-secondaryGreen">
                    Mis ingredientes:
                  </h1>
                  {ingredientes?.map((ingrediente, index) => (
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
                          setIngredientes((ingredientes) => {
                            return ingredientes.filter(
                              (value, i) => i !== index
                            );
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
                onClick={() => {
                  setIngredientes([]);
                  setImagen("");
                  cerrarPopUp();
                }}
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
