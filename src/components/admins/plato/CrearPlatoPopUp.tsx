import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsTrashFill } from "react-icons/bs";
import Popup from "reactjs-popup";
import SubirImagen from "../ui/SubirImagen";
import SeleccionarIngredientes from "./SeleccionarIngredientes";
import { Plato } from "@/types/Plato";
import { Categoria } from "@/types/Categoria";
import { Ingrediente } from "@/types/Ingrediente";
import { getAllCategorias } from "@/services/categoria";
import { crearPlato, editarPlato } from "@/services/plato";

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
  const [plato, setPlato] = useState<Plato>(platoEditar);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [errorNombre, setErrorNombre] = useState("");
  const [errorPrecio, setErrorPrecio] = useState("");
  const [errorIngredientes, setErrorIngredientes] = useState("");

  useEffect(() => {
    setPlato(platoEditar);
  }, [platoEditar]);

  useEffect(() => {
    const getCategorias = async () => {
      let data = await getAllCategorias();
      setCategorias(data as Categoria[]);
    };
    getCategorias();
  }, []);

  async function crear() {
    try {
      crearPlato(plato);
    } catch (error) {
      console.log("Error al crear el plato");
    }
    router.replace(router.asPath);
  }

  async function editar() {
    try {
      await editarPlato(plato);
    } catch (error) {
      console.log("Error al editar el plato");
    }
    router.replace(router.asPath);
  }

  function validarCampos() {
    if (plato.nombre == "") {
      setErrorNombre("Introduzca un nombre por favor.");
    } else {
      setErrorNombre("");
    }
    if (plato.ingredientes.length <= 0) {
      setErrorIngredientes("Introduzca al menos un ingrediente.");
    } else {
      setErrorIngredientes("");
    }
    if (plato.precio <= 0) {
      setErrorPrecio("El precio debe ser mayor a 0");
    } else {
      setErrorPrecio("");
    }
    if (errorNombre == "" && errorPrecio == "" && errorIngredientes == "") {
      return true;
    }
    return false;
  }

  function aceptar() {
    if (open && validarCampos()) {
      console.log(plato);
      plato.id ? editar() : crear();
      cerrarPopUp();
    }
  }

  return (
    <Popup open={open} modal closeOnDocumentClick onClose={() => cerrarPopUp()}>
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-600 bg-opacity-10 backdrop-blur-sm  ">
        <div className="   rounded-md bg-background w-[60%] overflow-hidden flex flex-col ">
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
                <p className="font-thin">
                  Nombre*{" "}
                  <span className="text-end pl-2 text-red-600">
                    {errorNombre}
                  </span>
                </p>
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
                  <option key={-1} value={-1} selected={plato.categoria == ""}>
                    Seleccione una categoria
                  </option>
                  {categorias?.map((categoria) => (
                    <option
                      key={categoria.id}
                      value={categoria.id}
                      selected={plato.categoria == categoria.id}
                    >
                      {categoria.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-y-[1px] w-full">
                <div>
                  <p className="font-thin flex w-full ">
                    Precio{" "}
                    <span className="text-end pl-8 text-red-600">
                      {errorPrecio}
                    </span>
                  </p>
                </div>
                <input
                  type={"number"}
                  id="precio"
                  defaultValue={plato.precio}
                  onChange={(e) => {
                    setPlato({ ...plato, precio: parseFloat(e.target.value) });
                  }}
                  className="px-6 border-[1px] rounded-md"
                />
              </div>

              <div className="flex flex-col gap-y-[1px] w-full">
                <p className="font-thin">Descripción</p>
                <textarea
                  id="descripcion"
                  defaultValue={platoEditar?.descripcion}
                  rows={3}
                  className="px-6 border-[1px] h-auto w-full rounded-md resize-none "
                  onChange={(e) => {
                    setPlato({ ...plato, descripcion: e.target.value });
                  }}
                ></textarea>
              </div>
            </div>
            {/* SELECCIONAR INGREDIENES */}
            <div className="flex flex-col px-4 gap-y-2 py-2 mt-4">
              <h1 className="text-xl w-full text-center border-b-[1px] border-primaryGreen">
                Ingredientes del plato
              </h1>
              <div className="pt-[20px]">
                <p className="text-red-600">{errorIngredientes}</p>
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
              onClick={() => {
                setErrorNombre("");
                setErrorPrecio("");
                setErrorIngredientes("");
                cerrarPopUp();
              }}
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
