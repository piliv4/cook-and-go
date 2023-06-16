import CabeceraPagina from "../ui/CabeceraPagina";
import { useState } from "react";
import SeleccionarPlatos from "./SeleccionarPlatos";
import router from "next/router";
import { Menu } from "@/types/Menu";
import { Plato } from "@/types/Plato";
import { esMayorQueCero, esVacio } from "@/validations/validation";
import MensajeError from "../ui/MensajeError";
import InputErrorEnvoltorio from "../ui/InputErrorEnvoltorio";
import { tiposPlato } from "@/types/enum";

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
  const [errorNombre, setErrorNombre] = useState("");
  const [errorPrecio, setErrorPrecio] = useState("");
  const [errorComensales, setErrorComensales] = useState("");
  const [errorPlatos, setErrorPlatos] = useState("");

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
    let eNombre = esVacio(menu.nombre, "nombre");
    setErrorNombre(eNombre ? eNombre : "");
    let ePrecio = esMayorQueCero(menu.precio + "", "precio");
    setErrorPrecio(ePrecio ? ePrecio : "");
    let eComensales = esMayorQueCero(menu.comensales + "", "comensales");
    setErrorComensales(eComensales ? eComensales : "");

    if (
      menu.entrantes.length <= 0 &&
      menu.primeros.length <= 0 &&
      menu.segundos.length <= 0 &&
      menu.postres.length <= 0
    ) {
      setErrorPlatos("El menú debe tener al menos un plato");
    } else {
      setErrorPlatos("");
    }
    if (eNombre || ePrecio || eComensales || errorPlatos != "") {
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
            <InputErrorEnvoltorio error={errorNombre}>
              <input
                type={"text"}
                className="w-full"
                defaultValue={menu.nombre}
                onChange={(e) => setMenu({ ...menu, nombre: e.target.value })}
              />
            </InputErrorEnvoltorio>
            <MensajeError texto={errorNombre} />
          </div>
          <div className="flex pt-2 flex-row gap-x-4">
            <div className="flex flex-col gap-y-[1px] w-full">
              <p className="">Precio</p>
              <InputErrorEnvoltorio error={errorPrecio}>
                <input
                  type={"tel"}
                  className="w-full"
                  defaultValue={menu.precio}
                  onChange={(e) =>
                    setMenu({ ...menu, precio: parseFloat(e.target.value) })
                  }
                />
              </InputErrorEnvoltorio>
              <MensajeError texto={errorPrecio} />
            </div>
            <div className="flex flex-col gap-y-[1px] w-full">
              <p className="">Número de comensales</p>

              <InputErrorEnvoltorio error={errorComensales}>
                <input
                  type="number"
                  className="w-full"
                  defaultValue={menu.comensales}
                  onChange={(e) =>
                    setMenu({ ...menu, comensales: parseInt(e.target.value) })
                  }
                />
              </InputErrorEnvoltorio>
              <MensajeError texto={errorComensales} />
            </div>
          </div>
        </div>
      </div>
      {/* SECCIONES DEL MENU */}

      <div className=" flex flex-col">
        <h1 className="w-full border-b-2 pb-1 pt-6 text-center font-black text-lg border-primaryGreen">
          PLATOS
        </h1>
        <MensajeError texto={errorPlatos} />
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
              defaultChecked={menu.incluyePan}
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
              defaultChecked={menu.incluyeBebida}
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
