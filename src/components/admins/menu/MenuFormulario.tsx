import { Menu, Plato } from "@/types/types";
import CabeceraPagina from "../ui/CabeceraPagina";
import { useState } from "react";
import SeleccionarPlatos from "./SeleccionarPlatos";
import router from "next/router";

const MenuFormulario = ({
  menuProp,
  platos,
  crearEditar,
}: {
  menuProp: Menu | null;
  platos: Plato[];
  crearEditar: Function;
}) => {
  const [menu, setMenu] = useState(
    menuProp
      ? menuProp
      : {
          id: "",
          nombre: "",
          precio: 0,
          comensales: 0,
          incluyePan: false,
          incluyeBebida: false,
          entrantes: [],
          primeros: [],
          segundos: [],
          postres: [],
        }
  );
  const [errorTitulo, setErrorTitulo] = useState("");
  const [errorPrecio, setErrorPrecio] = useState("");
  const [errorComensales, setErrorComensales] = useState("");
  const tiposPlato = ["entrantes", "primeros", "segundos", "postres"];

  function anyadirPlato(plato: Plato, tipoPlato: string) {
    let key = tipoPlato as keyof Menu;
    !(menu[key] as Plato[]).includes(plato) &&
      setMenu({ ...menu, [key]: (menu[key] as Plato[]).concat([plato]) });
  }

  function eliminarPlatoPorIndice(index: number, tipoPlato: string) {
    let key = tipoPlato as keyof Menu;
    setMenu({
      ...menu,
      [key]: (menu[key] as Plato[]).filter((value, i) => i !== index),
    });
  }

  function eliminarPlatos(tipoPlato: string) {
    let key = tipoPlato as keyof Menu;
    setMenu({
      ...menu,
      [key]: [],
    });
  }

  function guardar() {
    if (validacionCampos()) {
      crearEditar(menu);
    }
  }

  function validacionCampos() {
    setErrorComensales("");
    setErrorPrecio("");
    setErrorTitulo("");
    if (menu.nombre == "" || menu.nombre == null) {
      setErrorTitulo("Introduzca un titulo");
    }
    if (menu.precio == null || menu.precio <= 0) {
      setErrorPrecio("Introduzca un precio");
    }
    if (menu.comensales == null || menu.comensales <= 0) {
      setErrorComensales("Introduzca un número de comensales");
    }
    if (
      menu.entrantes.length <= 0 &&
      menu.primeros.length <= 0 &&
      menu.segundos.length <= 0 &&
      menu.postres.length <= 0
    ) {
      return false;
    }
    if (errorComensales != "" || errorPrecio != "" || errorTitulo != "") {
      return false;
    }
    return true;
  }
  return (
    <div className="px-48 ">
      <CabeceraPagina>
        <h1 className="text-2xl font-black col-span-3 text-center uppercase ">
          Crear un nuevo menú
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
              onChange={(e) => setMenu({ ...menu, nombre: e.target.value })}
            />
            <p className="text-red-600 font-medium">{errorTitulo}</p>
          </div>
          <div className="flex pt-2 flex-row gap-x-4">
            <div className="flex flex-col gap-y-[1px] w-full">
              <p className="">Precio</p>
              <input
                type={"tel"}
                className="px-6 border-[1px] rounded-md"
                onChange={(e) =>
                  setMenu({ ...menu, precio: parseFloat(e.target.value) })
                }
              />
              <p className="text-red-600 font-medium">{errorPrecio}</p>
            </div>
            <div className="flex flex-col gap-y-[1px] w-full">
              <p className="">Número de comensales</p>
              <input
                type="number"
                className="px-6 border-[1px] rounded-md"
                onChange={(e) =>
                  setMenu({ ...menu, comensales: parseInt(e.target.value) })
                }
              />
              <p className="text-red-600 font-medium">{errorComensales}</p>
            </div>
          </div>
        </div>
      </div>
      {/* SECCIONES DEL MENU */}

      <div className=" flex flex-col">
        <h1 className="w-full border-b-2 pb-1 pt-6 text-center font-black text-lg border-primaryGreen">
          PLATOS
        </h1>
        {tiposPlato.map((tipoPlato) => (
          <SeleccionarPlatos
            key={tipoPlato}
            titulo={tipoPlato}
            platos={platos}
            eliminarPlatoPorIndice={eliminarPlatoPorIndice}
            eliminarPlatos={eliminarPlatos}
            anyadirPlato={anyadirPlato}
            platosAnyadidos={menu[tipoPlato as keyof Menu] as Plato[]}
          />
        ))}
      </div>
      <h1 className="w-full border-b-2 pb-1 pt-6 text-center font-black text-lg border-primaryGreen">
        EXTRAS
      </h1>
      <div className="flex flex-col gap-y-4 pt-4">
        <div className="flex flex-row border-b-[1px] border-primaryGreen">
          <p className="w-full font-black">¿Incluir pan?</p>
          <label className="flex flex-row gap-x-1 font-light">
            Incluir
            <input
              type="checkbox"
              onChange={(e) =>
                setMenu({ ...menu, incluyePan: e.target.checked })
              }
            />
          </label>
        </div>
        <div className="flex flex-row border-b-[1px] border-primaryGreen">
          <p className="w-full font-black">¿Incluir bebida?</p>
          <label className="flex flex-row gap-x-1 font-light">
            Incluir
            <input
              type="checkbox"
              onChange={(e) =>
                setMenu({ ...menu, incluyeBebida: e.target.checked })
              }
            />
          </label>
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
          onClick={() => router.push("/admin/menu")}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};
export default MenuFormulario;
