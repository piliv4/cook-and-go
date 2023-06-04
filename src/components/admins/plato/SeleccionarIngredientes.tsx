import { getAllIngredientes } from "@/api/ingrediente";
import { Ingrediente } from "@/types/Ingrediente";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";

const SeleccionarIngredientes = ({
  anyadirIngrediente,
}: {
  anyadirIngrediente: Function;
}) => {
  const [ingredientes, setIngredientes] = useState<Ingrediente[] | null>(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      let ingredientes = await getAllIngredientes();
      setIngredientes(ingredientes as Ingrediente[]);
    };
    fetchPosts();
  }, []);

  return (
    <div className=" flex flex-col group min-h-[100px] ">
      <div className="bg-white grid grid-cols-[90%_10%] rounded-[30px] border-neutral  border-[1px] overflow-hidden">
        <div className="px-2 py-1">
          <input
            className="input  w-full bg-transparent text-sm text-neutral focus:outline-0 sm:h-full"
            autoComplete="off"
            id="searchBar"
            type="text"
            value={value}
            placeholder="Buscador de ingredientes..."
            onChange={(e) => {
              setValue(e.target.value);
            }}
          ></input>
        </div>
        <div className="flex items-center justify-center">
          <BiSearch className="stroke-primaryOrange stroke-[2px]" />
        </div>
      </div>

      <div className="hidden group-hover:flex hover:flex z-10 flex-col border-x-[1px] border-b-[1px]  mx-3 rounded-b-md bg-white ">
        {ingredientes
          ?.filter((ingrediente) => {
            return (
              ingrediente &&
              (ingrediente.nombre
                .toLowerCase()
                .startsWith(value.toLowerCase()) ||
                ingrediente.nombre
                  .toLowerCase()
                  .includes(" " + value.toLowerCase())) &&
              ingrediente.nombre.toLowerCase() !== value.toLowerCase()
            );
          })
          .slice(0, 3)
          .map((ingrediente) => (
            <div
              className="grid grid-cols-[80%_20%] cursor-pointer pl-4  text-sm hover:bg-terciaryIntermediate"
              key={ingrediente.id}
              onClick={() =>
                setValue(
                  ingrediente.nombre.charAt(0).toUpperCase() +
                    ingrediente.nombre.slice(1)
                )
              }
            >
              <p>
                {ingrediente.nombre.charAt(0).toUpperCase() +
                  ingrediente.nombre.slice(1)}
              </p>
              <p
                className="rounded-full border font-bold text-sm px-4 bg-primaryOrange text-white hover:scale-105 transition duration-100 "
                onClick={() => {
                  anyadirIngrediente(ingrediente);
                }}
              >
                Añadir
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};
export default SeleccionarIngredientes;
