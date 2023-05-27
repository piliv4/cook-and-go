import CabeceraPagina from "../ui/CabeceraPagina";
import { useState } from "react";
import router from "next/router";
import { Empleado } from "@/types/Empleado";
import SubirImagenCircular from "../ui/SubirImagenCircular";

const EmpleadoFormulario = ({
  empleadoProp,
  crearEditar,
}: {
  empleadoProp: Empleado | null;
  crearEditar: Function;
}) => {
  const [empleado, setEmpleado] = useState(
    empleadoProp ? empleadoProp : ({} as Empleado)
  );
  const [errorNombre, setErrorNombre] = useState("");

  function guardar() {
    if (validacionCampos()) {
      crearEditar(empleado);
    }
  }

  function validacionCampos() {
    return true;
  }

  return (
    <div className="px-48 ">
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
        <div className="flex flex-col gap-y-[1px] w-full pt-2">
          <p className="">Nombre y Apellidos</p>
          <input
            type={"text"}
            className="px-6  border-[1px] rounded-md"
            placeholder="Nombre y Apellidos"
            defaultValue={empleado.nombre}
            onChange={(e) =>
              setEmpleado({
                ...empleado,
                nombre: e.target.value,
              })
            }
          />
          <p className="text-red-600 font-medium">{}</p>
        </div>
        <div className="flex flex-col gap-y-[1px] w-full pt-2">
          <p className="">DNI/NIE</p>
          <input
            type={"text"}
            className="px-6  border-[1px] rounded-md"
            placeholder="Documento de identificación"
            defaultValue={empleado.dni}
            onChange={(e) =>
              setEmpleado({
                ...empleado,
                dni: e.target.value,
              })
            }
          />
          <p className="text-red-600 font-medium">{}</p>
        </div>
        <div className="flex flex-col gap-y-[1px] w-full pt-2">
          <p className="">Correo</p>
          <input
            type={"email"}
            className="px-6  border-[1px] rounded-md"
            placeholder="Correo electrónico"
            defaultValue={empleado.correo}
            onChange={(e) =>
              setEmpleado({
                ...empleado,
                correo: e.target.value,
              })
            }
          />
          <p className="text-red-600 font-medium">{}</p>
        </div>
        <div className="flex flex-col gap-y-[1px] w-full pt-2">
          <p className="">Contraseña</p>
          <input
            type={"password"}
            className="px-6  border-[1px] rounded-md"
            placeholder="Contraseña"
            defaultValue={empleado.contraseña}
            onChange={(e) =>
              setEmpleado({
                ...empleado,
                contraseña: e.target.value,
              })
            }
          />
          <p className="text-red-600 font-medium">{}</p>
        </div>
        <div className="flex flex-col gap-y-[1px] w-full pt-2">
          <p className="">Rol</p>
          <select
            className="px-6  border-[1px] rounded-md"
            onChange={(e) =>
              setEmpleado({
                ...empleado,
                rol: e.target.value,
              })
            }
          >
            <option>Administrador</option>
            <option>Cocinero</option>
            <option>Camarero</option>
          </select>
          <p className="text-red-600 font-medium">{}</p>
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
          onClick={() => router.push("/admin/empleado")}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};
export default EmpleadoFormulario;
