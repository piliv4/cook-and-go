import { useRouter } from "next/router";
import { useContext, useState } from "react";
import SubirImagen from "../ui/SubirImagen";
import { Bebida } from "@/types/Bebida";
import { Categoria } from "@/types/Categoria";
import { crearBebida, editarBebida } from "@/api/bebida";
import MensajeError from "../ui/MensajeError";
import { esMayorQueCero, esVacio } from "@/validations/validation";
import CabeceraPagina from "../ui/CabeceraPagina";
import InputErrorEnvoltorio from "../ui/InputErrorEnvoltorio";
import { EstablecimientoContext } from "@/context/EstablecimientoContext";

const BebidaFormulario = ({
  bebidaEditar,
  categorias,
}: {
  bebidaEditar: Bebida;
  categorias: Categoria[];
}) => {
  const { establecimientoGlobal } = useContext(EstablecimientoContext);

  const router = useRouter();
  const [bebida, setBebida] = useState<Bebida>(bebidaEditar);
  const [errorNombre, setErrorNombre] = useState("");
  const [errorPrecio, setErrorPrecio] = useState("");
  const [errorCategoria, setErrorCategoria] = useState("");

  function validarCampos() {
    let eNombre = esVacio(bebida.nombre, "nombre");
    setErrorNombre(eNombre ? eNombre : "");

    let ePrecio = esMayorQueCero(bebida.precio.toString(), "precio");
    setErrorPrecio(ePrecio ? ePrecio : "");

    let eCategoria = esVacio(bebida.categoria, "categoria");
    setErrorCategoria(eCategoria ? eCategoria : "");

    if (eNombre == null && ePrecio == null && eCategoria == null) return true;

    return false;
  }

  function aceptar() {
    if (validarCampos()) {
      bebida.id
        ? editarBebida(bebida)
        : crearBebida(bebida, establecimientoGlobal.id);
    }
  }

  return (
    <div className="px-48 ">
      <CabeceraPagina>
        <h1 className="text-2xl font-black col-span-3 text-center uppercase ">
          Crear un nuevo bebida
        </h1>
      </CabeceraPagina>
      <div></div>

      <SubirImagen
        imagen={bebida.imagenURL}
        setImagen={(imagen: string) => {
          setBebida({ ...bebida, imagenURL: imagen });
        }}
      />
      <div className="">
        <div className="flex flex-col px-4 gap-y-2 items-center py-2 mt-4 border-r-[1px] ">
          <h1 className="text-lg font-black w-full text-center border-b-[1px] border-primaryGreen">
            Datos genéricos del bebida
          </h1>
          <div className="flex flex-col gap-y-[1px] w-full">
            <p className="">
              Nombre<span className="font-light">*</span>
            </p>
            <InputErrorEnvoltorio error={errorNombre}>
              <input
                type={"text"}
                id="nombre"
                defaultValue={bebida.nombre}
                onChange={(e) => {
                  setBebida({ ...bebida, nombre: e.target.value });
                }}
                className="w-full focus:outline-none"
              />
            </InputErrorEnvoltorio>
            <MensajeError texto={errorNombre} />
          </div>

          <div className="flex flex-col gap-y-[1px] w-full">
            <p className="">Categoría</p>

            <InputErrorEnvoltorio error={errorCategoria}>
              <select
                id="categoria"
                value={bebida.categoria}
                className="w-full focus:outline-none"
                onChange={(e) => {
                  setBebida({ ...bebida, categoria: e.target.value });
                }}
              >
                <option key={-1} value="">
                  Seleccione una categoría
                </option>
                {categorias?.map((categoria) => (
                  <option
                    key={categoria.id}
                    value={categoria.id}
                    selected={bebida.categoria === categoria.id}
                  >
                    {categoria.nombre}
                  </option>
                ))}
              </select>
            </InputErrorEnvoltorio>

            <MensajeError texto={errorCategoria} />
          </div>

          <div className="flex flex-col gap-y-[1px] w-full">
            <div>
              <p className=" flex w-full ">Precio</p>
            </div>

            <InputErrorEnvoltorio error={errorPrecio}>
              <input
                type={"number"}
                id="precio"
                defaultValue={bebida.precio}
                onChange={(e) => {
                  setBebida({ ...bebida, precio: parseFloat(e.target.value) });
                }}
                className="w-full focus:outline-none"
              />
            </InputErrorEnvoltorio>
            <MensajeError texto={errorPrecio} />
          </div>

          <div className="flex flex-col gap-y-[1px] w-full">
            <p className="">Descripción</p>
            <textarea
              id="descripcion"
              defaultValue={bebidaEditar?.descripcion}
              rows={3}
              className="px-6 border-[1px] h-auto w-full rounded-md resize-none border-primaryGreen focus:outline-none"
              onChange={(e) => {
                setBebida({ ...bebida, descripcion: e.target.value });
              }}
            ></textarea>
          </div>
        </div>
      </div>

      <div className="mb-3 -mt-2 mr-3 flex justify-end gap-2 font-">
        <button
          className=" ml-3 rounded-full border border-primaryOrange bg-transparent px-1 hover:scale-105 transition duration-100 sm:mt-5 sm:px-3"
          onClick={() => router.back()}
        >
          Cancelar
        </button>
        <button
          className="btn-sm rounded-full bg-primaryOrange text-white  hover:scale-105 transition duration-100 sm:mt-5 sm:py-1 sm:px-4"
          onClick={() => aceptar()}
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};
export default BebidaFormulario;
