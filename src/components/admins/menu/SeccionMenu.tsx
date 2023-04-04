import { Plato } from "@/types/types";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
const SeccionMenu = ({
  titulo,
  platos,
  platosAnyadidos,
  setPlatosAnyadidos,
}: {
  titulo: string;
  platos: Plato[];
  platosAnyadidos: Plato[];
  setPlatosAnyadidos: Function;
}) => {
  const [incuido, setIncluido] = useState(false);
  const [value, setValue] = useState("");
  function desincluirPlatos(valor: boolean) {
    setValue("");
    !valor && setPlatosAnyadidos([]);
    setIncluido(valor);
  }

  function anyadirPlato(plato: Plato) {
    !platosAnyadidos.includes(plato) &&
      setPlatosAnyadidos(platosAnyadidos.concat([plato]));
  }

  return (
    <div className="flex justify-center flex-col">
      <div className="font-black pt-4  border-b-[1px] border-primaryGreen flex flex-row">
        <h1 className="w-full">{titulo}</h1>
        <label className="font-light pr-1">Incluir</label>
        <input
          className="accent-primaryOrange "
          type="checkbox"
          onChange={(e) => {
            desincluirPlatos(e.target.checked);
          }}
        />
      </div>
      {/* SI MARCAMOS INCLUIDO ENTONCES MOSTRAREMOS LAS OPCIONES DE AÑADRI PLATO */}
      {incuido && (
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
                  onClick={() =>
                    setPlatosAnyadidos((platosAnyadidos: Plato[]) => {
                      return platosAnyadidos.filter((value, i) => i !== index);
                    })
                  }
                />
              </div>
            ))}
          </div>

          {/* SELECTOR DE PLATOS */}
          <div className=" flex flex-col group   pt-2 ">
            <div className="bg-white  flex flex-row rounded-[30px] border-neutral  border-[1px] overflow-hidden">
              <div className="px-2 py-1 w-full">
                <input
                  className="input  w-full bg-transparent text-sm text-neutral focus:outline-0 sm:h-full"
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

            <div className="hidden group-hover:flex hover:flex z-10 flex-col border-x-[1px] border-b-[1px]  mx-3 rounded-b-md bg-white ">
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
                .slice(0, 10)
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
                      className="px-4"
                      onClick={() => {
                        setValue("");
                        anyadirPlato(plato);
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
export default SeccionMenu;
