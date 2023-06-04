import { Plato } from "@/types/Plato";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";

const SeleccionarPlatos = ({
  titulo,
  platos,
  platosAnyadidos,
  anyadirPlato,
  eliminarPlatoPorIndice,
  eliminarPlatos,
}: {
  titulo: string;
  platos: Plato[];
  platosAnyadidos: Plato[];
  anyadirPlato: Function;
  eliminarPlatos: Function;
  eliminarPlatoPorIndice: Function;
}) => {
  const [incluido, setIncluido] = useState(platosAnyadidos.length > 0);
  const [value, setValue] = useState("");
  function desincluirPlatos(valor: boolean) {
    setValue("");
    !valor && eliminarPlatos(titulo);
    setIncluido(valor);
  }

  return (
    <div className="flex justify-center flex-col ">
      <div className="font-black pt-4  border-b-[1px] border-primaryGreen flex flex-row">
        <h1 className="w-full capitalize">{titulo}</h1>
        <label className="font-light pr-1">Incluir</label>
        <input
          className="accent-primaryOrange "
          type="checkbox"
          defaultChecked={incluido}
          onChange={(e) => {
            desincluirPlatos(e.target.checked);
          }}
        />
      </div>
      {/* SI MARCAMOS INCLUIDO ENTONCES MOSTRAREMOS LAS OPCIONES DE AÑADRI PLATO */}
      {incluido && (
        <div>
          <div>
            {platosAnyadidos.map((plato, index) => (
              <div
                key={plato.id}
                className="flex flex-row py-1 border-b-[2px] border-primaryOrange border-dotted "
              >
                <p className="w-full">{plato.nombre}</p>
                <BsTrash
                  className=" self-end"
                  onClick={() => eliminarPlatoPorIndice(index, titulo)}
                />
              </div>
            ))}
          </div>

          {/* SELECTOR DE PLATOS */}
          <div className=" flex flex-col  mt-2 ">
            <div className="bg-white  flex flex-row rounded-[30px] border-neutral  border-[1px] overflow-hidden">
              <div className="px-2 py-1 w-full">
                <input
                  className=" w-full bg-transparent text-sm text-neutral focus:outline-0 sm:h-full"
                  autoComplete="off"
                  id="searchBar"
                  type="text"
                  value={value}
                  placeholder="Buscador de platos..."
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                ></input>
              </div>
              <div className="flex items-center justify-center px-4">
                <BiSearch className="stroke-primaryOrange stroke-[2px]" />
              </div>
            </div>

            <div className=" z-10 flex-col border-x-[1px] border-b-[1px]  mx-3 rounded-b-md bg-white ">
              {Object.values(platos)
                .filter((plato) => {
                  return (
                    plato &&
                    (plato.nombre
                      ?.toLowerCase()
                      .startsWith(value.toLowerCase()) ||
                      plato.nombre
                        ?.toLowerCase()
                        .includes(" " + value.toLowerCase())) &&
                    plato.nombre.toLowerCase() !== value.toLowerCase()
                  );
                })
                .slice(0, 3)
                .map((plato) => (
                  <div
                    className="flex flex-row cursor-pointer pl-4  text-sm hover:bg-terciaryIntermediate"
                    key={plato.id}
                  >
                    <p className="w-full">
                      {plato.nombre.charAt(0).toUpperCase() +
                        plato.nombre.slice(1)}
                    </p>
                    <p
                      className="rounded-full border font-bold text-sm px-4 bg-primaryOrange text-white hover:scale-105 transition duration-100 "
                      onClick={() => {
                        setValue("");
                        anyadirPlato(plato, titulo);
                      }}
                    >
                      Añadir
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default SeleccionarPlatos;
