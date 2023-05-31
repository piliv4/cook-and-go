import CabeceraPagina from "../ui/CabeceraPagina";
import { useState } from "react";
import router from "next/router";
import { Establecimiento } from "@/types/Establecimiento";
import SeccionesFormulario from "./SeccionesFormulario";
import SubirImagen from "../ui/SubirImagen";
import {
  esCIFValido,
  esCorreoValido,
  esTelefonoValido,
  esVacio,
  esWebValida,
} from "@/validations/validation";

const EstablecimientoFormulario = ({
  establecimientoProp,
  crearEditar,
}: {
  establecimientoProp: Establecimiento | null;
  crearEditar: Function;
}) => {
  const DEFAULT_ESTABLECIMIENTO = {
    id: "",
    nombre: "",
    descripcion: "",
    cif: "",
    correo: "",
    web: "",
    telefono: "",
    ciudad: "",
    direccion: "",
    imagenURL: "",
    secciones: [],
  };
  const [establecimiento, setEstablecimiento] = useState(
    establecimientoProp ? establecimientoProp : DEFAULT_ESTABLECIMIENTO
  );

  const [errorNombre, setErrorNombre] = useState("");
  const [errorCIF, setErrorCIF] = useState("");
  const [errorTelefono, setErrorTelefono] = useState("");
  const [errorCorreo, setErrorCorreo] = useState("");
  const [errorWeb, setErrorWeb] = useState("");
  const [errorLocalidad, setErrorLocalidad] = useState("");
  const [errorDireccion, setErrorDireccion] = useState("");

  function guardar() {
    let eNombre = esVacio(establecimiento.nombre, "nombre");
    setErrorNombre(eNombre ? eNombre : "");
    let eCIF = esCIFValido(establecimiento.cif);
    setErrorCIF(eCIF ? eCIF : "");
    let eTelefono = esTelefonoValido(establecimiento.telefono);
    setErrorTelefono(eTelefono ? eTelefono : "");
    let eCorreo = esCorreoValido(establecimiento.correo);
    setErrorCorreo(eCorreo ? eCorreo : "");
    let eWeb = esWebValida(establecimiento.web);
    setErrorWeb(eWeb ? eWeb : "");
    let eLocalidad = esVacio(establecimiento.ciudad, "localidad");
    setErrorLocalidad(eLocalidad ? eLocalidad : "");
    let eDireccion = esVacio(establecimiento.ciudad, "localidad");
    setErrorDireccion(eDireccion ? eDireccion : "");

    if (
      eNombre == null &&
      eCIF == null &&
      eTelefono == null &&
      eCorreo == null &&
      eWeb == null &&
      eLocalidad == null &&
      eDireccion == null
    ) {
      //console.log("culo");
      crearEditar(establecimiento);
    }
  }

  return (
    <div className="px-20 ">
      <CabeceraPagina>
        <h1 className="text-2xl font-black  uppercase ">
          {establecimientoProp
            ? "Editar establecimiento"
            : "Crear un establecimiento"}
        </h1>
        <div className=" flex flex-row justify-end gap-x-2 font-black col-span-2">
          <button
            className=" ml-3  rounded-full border border-primaryOrange bg-transparent px-1 hover:scale-105 transition duration-100 sm:mt-5 sm:px-3"
            onClick={() => router.push("/admin/establecimiento")}
          >
            Cancelar
          </button>
          <button
            className=" ml-3 rounded-full border text-white border-primaryOrange bg-primaryOrange px-1 hover:scale-105 transition duration-100 sm:mt-5 sm:px-3"
            onClick={() => guardar()}
          >
            Guardar
          </button>
        </div>
      </CabeceraPagina>
      <SubirImagen
        imagen={establecimiento.imagenURL}
        setImagen={(imagen: string) =>
          setEstablecimiento({ ...establecimiento, imagenURL: imagen })
        }
      />
      <div className="grid md:grid-cols-2 md:gap-5">
        <div>
          <h1 className="w-full border-b-2  text-center pt-4 font-black text-lg border-primaryGreen">
            INFORMACIÓN GENERAL
          </h1>
          <div>
            {/* INFORMACION GENERAL */}
            <div className="flex flex-row gap-x-6">
              <div className="flex flex-col  w-full pt-2">
                <p className="">
                  Nombre<span className="font-thin">*</span>
                </p>
                <input
                  type={"text"}
                  className="px-6  border-[1px] rounded-md border-primaryGreen"
                  placeholder="Nombre del establecimiento"
                  defaultValue={establecimiento.nombre}
                  onChange={(e) =>
                    setEstablecimiento({
                      ...establecimiento,
                      nombre: e.target.value,
                    })
                  }
                />
                <p className="text-red-600 min-h-[22px] font-thin">
                  {errorNombre}
                </p>
              </div>
              <div className="flex flex-col  w-full pt-2">
                <p className="">
                  CIF<span className="font-thin">*</span>
                </p>
                <input
                  type={"text"}
                  className="px-6  border-[1px] rounded-md border-primaryGreen"
                  placeholder="Código de identificación fiscal"
                  defaultValue={establecimiento.cif}
                  onChange={(e) =>
                    setEstablecimiento({
                      ...establecimiento,
                      cif: e.target.value,
                    })
                  }
                />
                <p className="text-red-600 min-h-[22px] font-thin">
                  {errorCIF}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <p className="">Detalles</p>
            <input
              type={"text"}
              className="px-6  border-[1px] rounded-md border-primaryGreen"
              placeholder="Detalles sobre el establecimiento"
              defaultValue={establecimiento.descripcion}
              onChange={(e) =>
                setEstablecimiento({
                  ...establecimiento,
                  descripcion: e.target.value,
                })
              }
            />

            {/* INFORMACIÓN DE CONTACTO */}
            <h1 className="w-full border-b-2  text-center pt-4 font-black text-lg border-primaryGreen">
              INFORMACIÓN DE CONTACTO
            </h1>

            <div className="flex flex-row gap-x-6">
              <div className="flex flex-col  w-full pt-2 ">
                <p className="">
                  Número de teléfono<span className="font-thin">*</span>
                </p>
                <input
                  type={"tel"}
                  className="px-6  border-[1px] rounded-md border-primaryGreen"
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
                <p className="text-red-600 min-h-[22px] font-thin">
                  {errorTelefono}
                </p>
              </div>
              <div className="flex flex-col  w-full pt-2">
                <p className="">
                  Correo electronico<span className="font-thin">*</span>
                </p>
                <input
                  type={"email"}
                  className="px-6  border-[1px] rounded-md border-primaryGreen"
                  placeholder="Dirección de correo electrónico"
                  defaultValue={establecimiento.correo}
                  onChange={(e) =>
                    setEstablecimiento({
                      ...establecimiento,
                      correo: e.target.value,
                    })
                  }
                />
                <p className="text-red-600 min-h-[22px] font-thin">
                  {errorCorreo}
                </p>
              </div>
            </div>
            <div className="flex flex-col  w-full ">
              <p className="">Web</p>
              <input
                type={"url"}
                className="px-6  border-[1px] rounded-md border-primaryGreen"
                placeholder="Dirección de la página web"
                defaultValue={establecimiento.web}
                onChange={(e) =>
                  setEstablecimiento({
                    ...establecimiento,
                    web: e.target.value,
                  })
                }
              />
              <p className="text-red-600 min-h-[22px] font-thin">{errorWeb}</p>
            </div>

            {/* UBICACIÓN */}
            <h1 className="w-full border-b-2 text-center font-black text-lg border-primaryGreen">
              UBICACIÓN
            </h1>
            <div className="flex flex-row gap-x-6">
              <div className="flex flex-col  w-full pt-2">
                <p className="">
                  Localidad<span className="font-thin">*</span>
                </p>
                <input
                  type={"text"}
                  className="px-6  border-[1px] rounded-md border-primaryGreen"
                  placeholder="Localidad"
                  defaultValue={establecimiento.ciudad}
                  onChange={(e) =>
                    setEstablecimiento({
                      ...establecimiento,
                      ciudad: e.target.value,
                    })
                  }
                />
                <p className="text-red-600 min-h-[22px] font-thin">
                  {errorLocalidad}
                </p>
              </div>
              <div className="flex flex-col w-full pt-2">
                <p className="">
                  Direccion<span className="font-thin">*</span>
                </p>
                <input
                  type={"text"}
                  className="px-6  border-[1px] rounded-md border-primaryGreen"
                  placeholder="Dirección del establecimiento"
                  defaultValue={establecimiento.direccion}
                  onChange={(e) =>
                    setEstablecimiento({
                      ...establecimiento,
                      direccion: e.target.value,
                    })
                  }
                />
                <p className="text-red-600 min-h-[22px] font-thin">
                  {errorDireccion}
                </p>
              </div>
            </div>
          </div>
        </div>
        <SeccionesFormulario
          establecimiento={establecimiento}
          setEstablecimiento={setEstablecimiento}
        />
      </div>
    </div>
  );
};
export default EstablecimientoFormulario;
