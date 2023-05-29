import CabeceraPagina from "../ui/CabeceraPagina";
import { useState } from "react";
import router from "next/router";
import { Establecimiento, Seccion } from "@/types/Establecimiento";
import SeccionesFormulario from "./SeccionesFormulario";
import SubirImagen from "../ui/SubirImagen";

const EstablecimientoFormulario = ({
  establecimientoProp,
  crearEditar,
}: {
  establecimientoProp: Establecimiento | null;
  crearEditar: Function;
}) => {
  const [establecimiento, setEstablecimiento] = useState(
    establecimientoProp ? establecimientoProp : ({} as Establecimiento)
  );

  const [secciones, setSecciones] = useState(
    establecimientoProp?.secciones ? establecimientoProp.secciones : []
  );

  function guardar() {
    console.log("Mi establecimiento " + establecimiento);
    if (validacionCampos()) {
      //crearEditar(establecimiento);
    }
  }

  function validacionCampos() {
    return true;
  }

  return (
    <div className="px-20 ">
      <CabeceraPagina>
        <h1 className="text-2xl font-black  uppercase ">
          {establecimientoProp
            ? "Editar establecimiento"
            : "Crear un establecimiento"}
        </h1>
      </CabeceraPagina>
      {/* <SubirImagen imagen="" setImagen={() => console.log("implemetar")} /> */}
      <div className="grid md:grid-cols-2 md:gap-5">
        <div>
          <h1 className="w-full border-b-2 pb-1 text-center pt-4 font-black text-lg border-primaryGreen">
            INFORMACIÓN GENERAL
          </h1>
          <div>
            {/* INFORMACION GENERAL */}
            <div className="flex flex-row gap-6">
              <div className="flex flex-col gap-y-[1px] w-full pt-2">
                <p className="">Nombre</p>
                <input
                  type={"text"}
                  className="px-6  border-[1px] rounded-md"
                  placeholder="Nombre del establecimiento"
                  defaultValue={establecimiento.nombre}
                  onChange={(e) =>
                    setEstablecimiento({
                      ...establecimiento,
                      nombre: e.target.value,
                    })
                  }
                />
                <p className="text-red-600 font-medium">{}</p>
              </div>
              <div className="flex flex-col gap-y-[1px] w-full pt-2">
                <p className="">CIF</p>
                <input
                  type={"text"}
                  className="px-6  border-[1px] rounded-md"
                  placeholder="Código de identificación fiscal"
                  defaultValue={establecimiento.cif}
                  onChange={(e) =>
                    setEstablecimiento({
                      ...establecimiento,
                      cif: e.target.value,
                    })
                  }
                />
                <p className="text-red-600 font-medium">{}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-[1px] w-full pt-2">
            <p className="">Detalles</p>
            <input
              type={"text"}
              className="px-6  border-[1px] rounded-md"
              placeholder="Detalles sobre el establecimiento"
              defaultValue={establecimiento.descripcion}
              onChange={(e) =>
                setEstablecimiento({
                  ...establecimiento,
                  descripcion: e.target.value,
                })
              }
            />
            <p className="text-red-600 font-medium">{}</p>

            {/* INFORMACIÓN DE CONTACTO */}
            <h1 className="w-full border-b-2 pb-1 text-center pt-4 font-black text-lg border-primaryGreen">
              INFORMACIÓN DE CONTACTO
            </h1>

            <div className="flex flex-row gap-6">
              <div className="flex flex-col gap-y-[1px] w-full pt-2">
                <p className="">Número de teléfono</p>
                <input
                  type={"tel"}
                  className="px-6  border-[1px] rounded-md"
                  placeholder="Número de teléfono del establecimiento"
                  defaultValue={
                    (establecimiento.telefono = !0 && establecimiento.telefono)
                  }
                  onChange={(e) =>
                    setEstablecimiento({
                      ...establecimiento,
                      telefono: e.target.value,
                    })
                  }
                />
                <p className="text-red-600 font-medium">{}</p>
              </div>
              <div className="flex flex-col gap-y-[1px] w-full pt-2">
                <p className="">Correo electronico</p>
                <input
                  type={"email"}
                  className="px-6  border-[1px] rounded-md"
                  placeholder="Dirección de correo electrónico"
                  defaultValue={establecimiento.correo}
                  onChange={(e) =>
                    setEstablecimiento({
                      ...establecimiento,
                      correo: e.target.value,
                    })
                  }
                />
                <p className="text-red-600 font-medium">{}</p>
              </div>
            </div>
            <div className="flex flex-col gap-y-[1px] w-full pt-2">
              <p className="">Web</p>
              <input
                type={"url"}
                className="px-6  border-[1px] rounded-md"
                placeholder="Dirección de la página web"
                defaultValue={establecimiento.web}
                onChange={(e) =>
                  setEstablecimiento({
                    ...establecimiento,
                    web: e.target.value,
                  })
                }
              />
              <p className="text-red-600 font-medium">{}</p>
            </div>

            {/* UBICACIÓN */}
            <h1 className="w-full border-b-2 pb-1 text-center pt-4 font-black text-lg border-primaryGreen">
              UBICACIÓN
            </h1>
            <div className="flex flex-row gap-6">
              <div className="flex flex-col gap-y-[1px] w-full pt-2">
                <p className="">Localidad</p>
                <input
                  type={"text"}
                  className="px-6  border-[1px] rounded-md"
                  placeholder="Localidad"
                  defaultValue={establecimiento.ciudad}
                  onChange={(e) =>
                    setEstablecimiento({
                      ...establecimiento,
                      ciudad: e.target.value,
                    })
                  }
                />
                <p className="text-red-600 font-medium">{}</p>
              </div>
              <div className="flex flex-col gap-y-[1px] w-full pt-2">
                <p className="">Direccion</p>
                <input
                  type={"text"}
                  className="px-6  border-[1px] rounded-md"
                  placeholder="Dirección del establecimiento"
                  defaultValue={establecimiento.direccion}
                  onChange={(e) =>
                    setEstablecimiento({
                      ...establecimiento,
                      direccion: e.target.value,
                    })
                  }
                />
                <p className="text-red-600 font-medium">{}</p>
              </div>
            </div>
          </div>
        </div>
        <SeccionesFormulario
          establecimiento={establecimiento}
          setEstablecimiento={setEstablecimiento}
        />
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
          onClick={() => router.push("/admin/establecimiento")}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};
export default EstablecimientoFormulario;
