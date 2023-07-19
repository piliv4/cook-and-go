import CabeceraPagina from "../ui/CabeceraPagina";
import { useState } from "react";
import router from "next/router";
import { Empleado } from "@/types/Empleado";
import SubirImagenCircular from "../ui/SubirImagenCircular";
import { esCorreoValido, esDNIoNIE, esVacio } from "@/validations/validation";
import MensajeError from "../ui/MensajeError";
import InputErrorEnvoltorio from "../ui/InputErrorEnvoltorio";

const EmpleadoFormulario = ({
  empleadoProp,
  crearEditar,
}: {
  empleadoProp: Empleado | null;
  crearEditar: Function;
}) => {
  const DEFAULT_EMPLEADO = {
    nombre: "",
    correo: "",
    dni: "",
    contraseña: "",
    imagenURL: "",
    rol: "Cocinero",
  };
  const [empleado, setEmpleado] = useState(
    empleadoProp ? empleadoProp : DEFAULT_EMPLEADO
  );

  const [errorNombre, setErrorNombre] = useState("");
  const [errorDNINIE, setErrorDNINIE] = useState("");
  const [errorCorreo, setErrorCorreo] = useState("");
  const [errorContrasenya, setErrorContrasenya] = useState("");

  function guardar() {
    let eNombre = esVacio(empleado.nombre, "nombre y apellidos");
    setErrorNombre(eNombre ? eNombre : "");
    let eDNINIE = esDNIoNIE(empleado.dni);
    setErrorDNINIE(eDNINIE ? eDNINIE : "");
    let eCorreo = esCorreoValido(empleado.correo);
    setErrorCorreo(eCorreo ? eCorreo : "");
    let eContrasenya = esVacio(empleado.contraseña, "contraseña");
    setErrorContrasenya(eContrasenya ? eContrasenya : "");
    if (
      eNombre == undefined &&
      eDNINIE == undefined &&
      eCorreo == undefined &&
      eContrasenya == undefined
    ) {
      crearEditar(empleado);
    }
  }

  return (
    <div className="sm:px-48 ">
      <CabeceraPagina>
        <h1 className="text-2xl col-span-full text-center font-black  uppercase ">
          {empleadoProp ? "Editar empleado" : "Crear un empleado"}
        </h1>
      </CabeceraPagina>
      <div>
        <div className="flex justify-center pt-4">
          {/* INFORMACION GENERAL */}
          <SubirImagenCircular
            imagen={empleado.imagenURL}
            setImagen={(imagen: string) => {
              setEmpleado({ ...empleado, imagenURL: imagen });
            }}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-y-[1px] w-full pt-2">
            <p className="">
              Nombre y Apellidos<span className="font-thin">*</span>
            </p>

            <InputErrorEnvoltorio error={errorNombre}>
              <input
                type={"text"}
                className="w-full focus:outline-none"
                placeholder="Nombre y Apellidos"
                defaultValue={empleado.nombre}
                onChange={(e) =>
                  setEmpleado({
                    ...empleado,
                    nombre: e.target.value,
                  })
                }
              />
            </InputErrorEnvoltorio>
            <MensajeError texto={errorNombre} />
          </div>
          <div className="flex flex-col gap-y-[1px] w-full pt-2">
            <p className="">
              DNI/NIE<span className="font-thin">*</span>
            </p>

            <InputErrorEnvoltorio error={errorDNINIE}>
              <input
                type={"text"}
                className="w-full focus:outline-none"
                placeholder="Documento de identificación"
                defaultValue={empleado.dni}
                onChange={(e) =>
                  setEmpleado({
                    ...empleado,
                    dni: e.target.value,
                  })
                }
              />
            </InputErrorEnvoltorio>
            <MensajeError texto={errorDNINIE} />
          </div>
        </div>
        <div className="flex flex-col gap-y-[1px] w-full pt-2">
          <p className="">
            Correo<span className="font-thin">*</span>
          </p>

          <InputErrorEnvoltorio error={errorCorreo}>
            <input
              type={"email"}
              className="w-full focus:outline-none"
              placeholder="Correo electrónico"
              defaultValue={empleado.correo}
              onChange={(e) =>
                setEmpleado({
                  ...empleado,
                  correo: e.target.value,
                })
              }
            />
          </InputErrorEnvoltorio>
          <MensajeError texto={errorCorreo} />
        </div>
        <div className="flex flex-col gap-y-[1px] w-full pt-2">
          <p className="">
            Contraseña<span className="font-thin">*</span>
          </p>

          <InputErrorEnvoltorio error={errorContrasenya}>
            <input
              type={"password"}
              className="w-full focus:outline-none"
              placeholder="Contraseña"
              defaultValue={empleado.contraseña}
              onChange={(e) =>
                setEmpleado({
                  ...empleado,
                  contraseña: e.target.value,
                })
              }
            />
          </InputErrorEnvoltorio>
          <MensajeError texto={errorContrasenya} />
        </div>
        <div className="flex flex-col gap-y-[1px] w-full pt-2">
          <p className="">Rol</p>
          <select
            className="px-6  border-[1px] rounded-md border-primaryGreen"
            defaultValue={empleado.rol}
            onChange={(e) =>
              setEmpleado({
                ...empleado,
                rol: e.target.value,
              })
            }
          >
            <option>Cocinero</option>
            <option>Camarero</option>
          </select>
        </div>
      </div>
      <div className=" flex flex-row justify-end gap-x-2 font-black py-4">
        <button
          className=" ml-3 mt-3 rounded-full border border-primaryOrange bg-transparent px-1 hover:scale-105 transition duration-100 sm:mt-5 sm:px-3"
          onClick={() => router.push("/admin/empleado")}
        >
          Cancelar
        </button>
        <button
          className=" ml-3 mt-3 rounded-full border text-white border-primaryOrange bg-primaryOrange px-1 hover:scale-105 transition duration-100 sm:mt-5 sm:px-3"
          onClick={() => guardar()}
        >
          Guardar
        </button>
      </div>
    </div>
  );
};
export default EmpleadoFormulario;
