import supabase from "@/server/client";
import { Ingrediente } from "@/types/types";
import { Console } from "console";
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
      const { data } = await supabase.from("Ingrediente").select();
      setIngredientes(data as Ingrediente[]);
    };
    fetchPosts();
  }, []);

  return (
    <div className=" flex flex-col group  ">
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
          .slice(0, 10)
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
                onClick={() => {
                  anyadirIngrediente((ingredientes: Ingrediente[]) => [
                    ...ingredientes,
                    ingrediente,
                  ]);
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
