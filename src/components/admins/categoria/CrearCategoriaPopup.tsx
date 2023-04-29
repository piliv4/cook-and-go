import supabase from "@/server/client";
import router from "next/router";
import { FormEvent, useState } from "react";
import Popup from "reactjs-popup";
import SubirImagen from "../ui/SubirImagen";
import { Categoria } from "@/types/Categoria";

const CrearCategoriaPopup = ({
  cerrarPopUp,
  open,
  categoriaEditar,
}: {
  cerrarPopUp: Function;
  open: boolean;
  categoriaEditar: Categoria | null;
}) => {
  const [imagen, setImagen] = useState(
    categoriaEditar ? categoriaEditar?.imagenURL : ""
  );

  const [errorNombre, setErrorNombre] = useState("");
  const [errorDescripcion, setErrorDescripcion] = useState("");

  async function crearCategoria(nombre: string, descripcion: string) {
    const { error } = await supabase.from("Categoria").insert([
      {
        nombre: nombre,
        descripcion: descripcion,
        imagenURL: imagen,
      },
    ]);
    if (!error) {
      router.replace(router.asPath);
    }
  }

  async function editarCategoria(nombre: string, descripcion: string) {
    const { error } = await supabase
      .from("Categoria")
      .update([
        {
          nombre: nombre,
          descripcion: descripcion,
          imagenURL: imagen,
        },
      ])
      .eq("id", categoriaEditar?.id);
    if (!error) {
      router.replace(router.asPath);
    }
  }
  function validarForm(nombre: string, descripcion: string) {
    setErrorNombre("");
    setErrorDescripcion("");
    if (nombre == null || nombre == "") {
      console.log("problema nooo");
      setErrorNombre("¡Por favor introduzca un nombre!");
      return false;
    }
    if (descripcion == null || descripcion == "") {
      setErrorDescripcion("¡Por favor introduzca una descripción!");
      return false;
    }
    return true;
  }

  const aceptar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (open) {
      const { nombre, descripcion } = e.target as typeof e.target & {
        nombre: { value: string };
        descripcion: { value: string };
      };
      if (validarForm(nombre.value, descripcion.value)) {
        categoriaEditar
          ? editarCategoria(nombre.value, descripcion.value)
          : crearCategoria(nombre.value, descripcion.value);
        cerrarPopUp();
      }
    }
  };

  return (
    <Popup open={open} modal closeOnDocumentClick onClose={() => cerrarPopUp()}>
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-600 bg-opacity-10 backdrop-blur-sm  ">
        <div className="  w-3/5 sm:w-2/5 rounded-md bg-background xl:w-1/5 overflow-hidden">
          <div className="bg-primaryGreen py-2 text-center font-semibold text-lg text-white">
            Crear nueva categoría
          </div>
          <SubirImagen imagen={imagen} setImagen={setImagen} />
          <form onSubmit={(e) => aceptar(e)}>
            <div className="flex flex-col px-2 gap-y-6 items-center py-4">
              <div className="flex flex-col gap-y-[2px]">
                <p className="font-thin">Nombre</p>
                <input
                  type={"text"}
                  defaultValue={categoriaEditar?.nombre}
                  className="px-6 border-[1px] rounded-md"
                  id="nombre"
                />
                <p className="text-red-600">{errorNombre}</p>
              </div>
              <div className="flex flex-col gap-y-[2px]">
                <p className="font-thin">Descripción</p>
                <input
                  type={"text"}
                  defaultValue={categoriaEditar?.descripcion}
                  className="px-6 border-[1px] rounded-md"
                  id="descripcion"
                ></input>
                <p className="text-red-600">{errorDescripcion}</p>
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
                type={"submit"}
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
export default CrearCategoriaPopup;
