import supabase from "@/server/client";
import router from "next/router";
import { FormEvent, useState } from "react";
import Popup from "reactjs-popup";
import SubirImagen from "../ui/SubirImagen";
import { Categoria } from "@/types/Categoria";
import { crearCategoria, editarCategoria } from "@/api/categoria";
import { esVacio } from "@/validations/validation";

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

  const aceptar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (open) {
      const { nombre, descripcion } = e.target as typeof e.target & {
        nombre: { value: string };
        descripcion: { value: string };
      };

      let eNombre = esVacio(nombre.value, "nombre");
      setErrorNombre(eNombre ? eNombre : "");

      let eDescripcion = esVacio(descripcion.value, "descripción");
      setErrorDescripcion(eDescripcion ? eDescripcion : "");

      if (eNombre == undefined && eDescripcion == undefined) {
        const categoria = {
          id: categoriaEditar?.id || "",
          nombre: nombre.value,
          descripcion: descripcion.value,
          imagenURL: imagen,
        };
        categoriaEditar
          ? editarCategoria(categoria)
          : crearCategoria(categoria);
        setImagen("");
        cerrarPopUp();
      }
    }
  };

  return (
    <Popup open={open} modal closeOnDocumentClick onClose={() => cerrarPopUp()}>
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-600 bg-opacity-10 backdrop-blur-sm  ">
        <div className="  w-3/5 sm:w-2/5 rounded-md bg-background xl:w-1/4 overflow-hidden">
          <div className="bg-primaryGreen py-2 text-center font-semibold text-lg text-white">
            Crear nueva categoría
          </div>
          <SubirImagen imagen={imagen} setImagen={setImagen} />
          <form onSubmit={(e) => aceptar(e)}>
            <div className="flex flex-col p-4 pb-0 gap-y-2 items-center  ">
              <div className="flex flex-col gap-y-[2px] w-full">
                <p>
                  Nombre<span className="font-thin">*</span>
                </p>
                <input
                  type={"text"}
                  defaultValue={categoriaEditar?.nombre}
                  className="px-6 border-[1px] rounded-md border-primaryGreen"
                  id="nombre"
                />
                <p className="text-red-600 min-h-[22px] font-thin">
                  {errorNombre}
                </p>
              </div>
              <div className="flex flex-col gap-y-[2px] w-full">
                <p>
                  Descripción<span className="font-thin">*</span>
                </p>
                <input
                  type={"text"}
                  defaultValue={categoriaEditar?.descripcion}
                  className="px-6 border-[1px] rounded-md border-primaryGreen"
                  id="descripcion"
                ></input>
                <p className="text-red-600 min-h-[22px] font-thin">
                  {errorDescripcion}
                </p>
              </div>
            </div>
            <div className="mb-3 mr-3 flex justify-end gap-2 font-">
              <button
                className=" ml-3 mt-3 rounded-full border border-primaryOrange bg-transparent px-1 hover:scale-105 transition duration-100 sm:mt-5 sm:px-3"
                onClick={() => {
                  cerrarPopUp();
                  setErrorDescripcion("");
                  setErrorNombre("");
                }}
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
