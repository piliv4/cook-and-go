import { useRouter } from "next/router";
import { useState, useContext } from "react";
import { BsTrashFill } from "react-icons/bs";
import SubirImagen from "../ui/SubirImagen";
import SeleccionarIngredientes from "./SeleccionarIngredientes";
import { Plato } from "@/types/Plato";
import { Categoria } from "@/types/Categoria";
import { Ingrediente } from "@/types/Ingrediente";
import { crearPlato, editarPlato } from "@/api/plato";
import MensajeError from "../ui/MensajeError";
import { esMayorQueCero, esVacio } from "@/validations/validation";
import CabeceraPagina from "../ui/CabeceraPagina";
import InputErrorEnvoltorio from "../ui/InputErrorEnvoltorio";
import { EstablecimientoContext } from "@/context/EstablecimientoContext";

const PlatoFormulario = ({
  platoEditar,
  categorias,
}: {
  platoEditar: Plato;
  categorias: Categoria[];
}) => {
  const { establecimientoGlobal } = useContext(EstablecimientoContext);
  const router = useRouter();
  const [plato, setPlato] = useState<Plato>(platoEditar);
  const [errorNombre, setErrorNombre] = useState("");
  const [errorPrecio, setErrorPrecio] = useState("");
  const [errorCategoria, setErrorCategoria] = useState("");

  function validarCampos() {
    let ePlato = esVacio(plato.nombre, "nombre");
    setErrorNombre(ePlato ? ePlato : "");

    let ePrecio = esMayorQueCero(plato.precio.toString(), "precio");
    setErrorPrecio(ePrecio ? ePrecio : "");

    let eCategoria = esVacio(plato.categoria, "categoria");
    setErrorCategoria(eCategoria ? eCategoria : "");

    if (ePlato == null && ePrecio == null && eCategoria == null) return true;

    return false;
  }

  function aceptar() {
    if (validarCampos()) {
      plato.id
        ? editarPlato(plato)
        : crearPlato(plato, establecimientoGlobal.id);
    }
  }

  return (
    <div className="px-48 ">
      <CabeceraPagina>
        <h1 className="text-2xl font-black col-span-3 text-center uppercase ">
          Crear un nuevo plato
        </h1>
      </CabeceraPagina>
      <div></div>

      <SubirImagen
        imagen={plato.imagenURL}
        setImagen={(imagen: string) => {
          setPlato({ ...plato, imagenURL: imagen });
        }}
      />
      <div className="grid grid-cols-2">
        <div className="flex flex-col px-4 gap-y-2 items-center py-2 mt-4 border-r-[1px] ">
          <h1 className="text-lg font-black w-full text-center border-b-[1px] border-primaryGreen">
            Datos genéricos del plato
          </h1>
          <div className="flex flex-col gap-y-[1px] w-full">
            <p className="">
              Nombre<span className="font-light">*</span>
            </p>
            <InputErrorEnvoltorio error={errorNombre}>
              <input
                type={"text"}
                id="nombre"
                defaultValue={plato.nombre}
                onChange={(e) => {
                  setPlato({ ...plato, nombre: e.target.value });
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
                value={plato.categoria}
                className="w-full"
                onChange={(e) => {
                  setPlato({ ...plato, categoria: e.target.value });
                }}
              >
                <option key={-1} value="">
                  Seleccione una categoría
                </option>
                {categorias?.map((categoria) => (
                  <option
                    key={categoria.id}
                    value={categoria.id}
                    selected={plato.categoria === categoria.id}
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
                defaultValue={plato.precio}
                onChange={(e) => {
                  setPlato({ ...plato, precio: parseFloat(e.target.value) });
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
              defaultValue={platoEditar?.descripcion}
              rows={3}
              className="px-6 border-[1px] h-auto w-full rounded-md resize-none border-primaryGreen"
              onChange={(e) => {
                setPlato({ ...plato, descripcion: e.target.value });
              }}
            ></textarea>
          </div>
        </div>
        {/* SELECCIONAR INGREDIENES */}
        <div className="flex flex-col px-4 gap-y-2 py-2 mt-4">
          <h1 className="text-lg font-black w-full text-center border-b-[1px] border-primaryGreen">
            Ingredientes del plato
          </h1>
          <div className="pt-[20px]">
            <SeleccionarIngredientes
              anyadirIngrediente={(ingrediente: Ingrediente) =>
                !plato.ingredientes.includes(ingrediente) &&
                setPlato({
                  ...plato,
                  ingredientes: plato.ingredientes.concat([ingrediente]),
                })
              }
            />
          </div>
          <div className="flex flex-col pt-2 relative ">
            <h1 className=" w-full text-center border-b-[1px] border-secondaryGreen font-bold">
              Mis ingredientes:
            </h1>
            <div className="overflow-y-auto max-h-[180px]">
              {plato.ingredientes?.map((ingrediente, index) => (
                <div
                  key={ingrediente.id}
                  className="flex flex-row border-b-[2px] border-primaryOrange border-dotted"
                >
                  <p className="w-full font-thin">
                    {index + 1}. {ingrediente.nombre}
                  </p>
                  <button
                    className="px-1"
                    onClick={() =>
                      setPlato({
                        ...plato,
                        ingredientes: plato.ingredientes.filter(
                          (value, i) => i !== index
                        ),
                      })
                    }
                  >
                    <BsTrashFill className="fill-primaryOrange" />
                  </button>
                </div>
              ))}
            </div>
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
export default PlatoFormulario;
