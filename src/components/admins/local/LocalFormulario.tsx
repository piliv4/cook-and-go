import { Local } from "@/types/types";
import CabeceraPagina from "../ui/CabeceraPagina";
import { useState } from "react";
import router from "next/router";

const LocalFormulario = ({
  localProp,
  crearEditar,
}: {
  localProp: Local | null;
  crearEditar: Function;
}) => {
  const [local, setLocal] = useState(
    localProp
      ? localProp
      : {
          id: "",
          nombre: "",
          descripcion: "",
          cif: "",
          correo: "",
          web: "",
          telefono: 0,
          ciudad: "",
          direccion: "",
        }
  );
  const [errorNombre, setErrorNombre] = useState("");

  function guardar() {
    if (validacionCampos()) {
      crearEditar(local);
    }
  }

  function validacionCampos() {
    return true;
  }

  return (
    <div>
      <CabeceraPagina>
        <h1 className="text-2xl font-black  uppercase ">
          {localProp ? "Editar local" : "Crear un local"}
        </h1>
      </CabeceraPagina>
      <div>
        <h1 className="w-full border-b-2 pb-1 text-center pt-4 font-black text-lg border-primaryGreen">
          INFORMACIÓN GENERAL
        </h1>
        <div>
          <div className="flex flex-col gap-y-[1px] w-full pt-2">
            <p className="">Nombre</p>
            <input
              type={"text"}
              className="px-6  border-[1px] rounded-md"
              defaultValue={local.nombre}
              onChange={(e) => setLocal({ ...local, nombre: e.target.value })}
            />
            <p className="text-red-600 font-medium">{}</p>
          </div>
          <div className="flex flex-col gap-y-[1px] w-full pt-2">
            <p className="">Descripcion</p>
            <input
              type={"text"}
              className="px-6  border-[1px] rounded-md"
              defaultValue={local.descripcion}
              onChange={(e) =>
                setLocal({ ...local, descripcion: e.target.value })
              }
            />
            <p className="text-red-600 font-medium">{}</p>
          </div>
          <div className="flex flex-col gap-y-[1px] w-full pt-2">
            <p className="">CIF</p>
            <input
              type={"text"}
              className="px-6  border-[1px] rounded-md"
              defaultValue={local.cif}
              onChange={(e) => setLocal({ ...local, cif: e.target.value })}
            />
            <p className="text-red-600 font-medium">{}</p>
          </div>
          <div className="flex flex-col gap-y-[1px] w-full pt-2">
            <p className="">Correo electronico</p>
            <input
              type={"email"}
              className="px-6  border-[1px] rounded-md"
              defaultValue={local.correo}
              onChange={(e) => setLocal({ ...local, correo: e.target.value })}
            />
            <p className="text-red-600 font-medium">{}</p>
          </div>

          <div className="flex flex-col gap-y-[1px] w-full pt-2">
            <p className="">Número de teléfono</p>
            <input
              type={"tel"}
              className="px-6  border-[1px] rounded-md"
              defaultValue={(local.telefono = !0 && local.telefono)}
              onChange={(e) => setLocal({ ...local, telefono: e.target.value })}
            />
            <p className="text-red-600 font-medium">{}</p>
          </div>

          <div className="flex flex-col gap-y-[1px] w-full pt-2">
            <p className="">Ciudad</p>
            <input
              type={"text"}
              className="px-6  border-[1px] rounded-md"
              defaultValue={local.ciudad}
              onChange={(e) => setLocal({ ...local, ciudad: e.target.value })}
            />
            <p className="text-red-600 font-medium">{}</p>
          </div>

          <div className="flex flex-col gap-y-[1px] w-full pt-2">
            <p className="">Direccion</p>
            <input
              type={"text"}
              className="px-6  border-[1px] rounded-md"
              defaultValue={local.direccion}
              onChange={(e) =>
                setLocal({ ...local, direccion: e.target.value })
              }
            />
            <p className="text-red-600 font-medium">{}</p>
          </div>

          <div className="flex flex-col gap-y-[1px] w-full pt-2">
            <p className="">Web</p>
            <input
              type={"url"}
              className="px-6  border-[1px] rounded-md"
              defaultValue={local.web}
              onChange={(e) => setLocal({ ...local, web: e.target.value })}
            />
            <p className="text-red-600 font-medium">{}</p>
          </div>
        </div>
      </div>

      <div className=" flex flex-row justify-end gap-x-2 font-black py-4">
        <button
          className=" ml-3 mt-3 rounded-full border text-white border-primaryOrange bg-primaryOrange px-1 hover:scale-105 transition duration-100 sm:mt-5 sm:px-3"
          onClick={() => guardar()}
        >
          Guardar
        </button>
        <button
          className=" ml-3 mt-3 rounded-full border border-primaryOrange bg-transparent px-1 hover:scale-105 transition duration-100 sm:mt-5 sm:px-3"
          onClick={() => router.push("/admin/local")}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};
export default LocalFormulario;
