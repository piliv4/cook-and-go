import supabase from "@/server/client";
import { Categoria, Ingrediente, Plato } from "@/types/types";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import Popup from "reactjs-popup";
import IngredienteTable from "../ingrediente/IngredienteTable";
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
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
  const [categorias, setCategorias] = useState<Categoria[] | null>(null);
  const [imagen, setImagen] = useState(
    platoEditar ? platoEditar?.imagenURL : ""
  );
  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase.from("Categoria").select();
      setCategorias(data as Categoria[]);
    };
    fetchPosts();
  }, []);

  async function crearPlato(
    nombre: string,
    descripcion: string,
    categoria: string
  ) {
    const { error } = await supabase.from("Articulo").insert([
      {
        nombre: nombre,
        descripcion: descripcion,
        precio: 10,
        categoria_id: categoria,
        imagenURL: imagen,
      },
    ]);
    console.log(error);
    if (!error) {
      router.replace(router.asPath);
    }
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
    if (!error) {
      router.replace(router.asPath);
    }
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
      cerrarPopUp();
    }
  };

  return (
    <Popup open={open} modal closeOnDocumentClick onClose={() => cerrarPopUp()}>
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-600 bg-opacity-10 backdrop-blur-sm  ">
        <div className="   rounded-md bg-background w-10/12 overflow-hidden flex flex-col ">
          <form onSubmit={(e) => aceptar(e)}>
            <div className="bg-primaryGreen py-2 text-center font-semibold text-lg text-white">
              Crear nuevo plato
            </div>
            <SubirImagen imagen={imagen} setImagen={setImagen} />
            <div className="grid grid-cols-2">
              <div className="flex flex-col px-2 gap-y-6 items-center py-4">
                <h1>Datos genéricos del plato</h1>
                <div className="flex flex-col gap-y-[2px]">
                  <p className="font-thin">Nombre</p>
                  <input
                    type={"text"}
                    id="nombre"
                    defaultValue={platoEditar?.nombre}
                    className="px-6 border-[1px] rounded-md"
                  />
                </div>

                <div className="flex flex-col gap-y-[2px]">
                  <p className="font-thin">Descripción</p>
                  <textarea
                    id="descripcion"
                    defaultValue={platoEditar?.descripcion}
                    rows={2}
                    className="px-6 border-[1px] h-auto w-full rounded-md resize-none "
                  ></textarea>
                </div>

                <div className="flex flex-col gap-y-[2px]">
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
              </div>
              {/* SELECCIONAR INGREDIENES */}
              <div className="flex flex-col px-2">
                <h1>Ingredientes del plato</h1>
                <SeleccionarIngredientes anyadirIngrediente={setIngredientes} />
                <div className="flex flex-col">
                  <h1>Mis ingredientes:</h1>{" "}
                  {ingredientes?.map((ingrediente, index) => (
                    <div
                      key={ingrediente.id}
                      className="flex flex-row border-[1px]"
                    >
                      <p>{ingrediente.nombre}</p>
                      <button
                        onClick={() =>
                          setIngredientes((ingredientes) => {
                            return ingredientes.filter(
                              (value, i) => i !== index
                            );
                          })
                        }
                      >
                        Eliminar
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
