import { editarStock, getIngredientesFaltantes } from "@/api/ingrediente";
import { Ingrediente } from "@/types/Ingrediente";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { AiFillSave } from "react-icons/ai";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { establecimientoId } = context.query;
  let ingredientes = await getIngredientesFaltantes(
    establecimientoId as string
  );
  return {
    props: {
      ingredientes: ingredientes,
    },
  };
};

const ListaCompra = ({ ingredientes }: { ingredientes: Ingrediente[] }) => {
  const [ingredientesFaltantes, setIngredientesFaltantes] =
    useState<Ingrediente[]>(ingredientes);

  const [ingredientesComprados, setIngredientesComprados] = useState<
    Ingrediente[]
  >([]);

  useEffect(() => {
    if (ingredientesComprados.length == ingredientes.length) {
      return () => {
        editarStock(ingredientesComprados);
      };
    }
  }, [
    ingredientes.length,
    ingredientesComprados,
    ingredientesComprados.length,
  ]);

  return (
    <div className="bg-background min-h-screen">
      <div className="mx-4 md:mx-44 lg:mx-96 py-8 flex flex-col gap-y-3  ">
        <div className="font-bold sm:font-black text-center text-lg sm:text-xl bg-primaryGreen rounded-md py-1 text-white relative">
          MI LISTA DE LA COMPRA
          <AiFillSave
            className="absolute fill-white right-2 bottom-2"
            onClick={() => editarStock(ingredientesComprados)}
          />
        </div>
        {ingredientesFaltantes.length > 0 && (
          <div>
            <h1 className="font-medium sm:font-bold  sm:text-xl mb-3 border-b-primaryGreen border-b-2  ">
              Pendiente:
            </h1>
            <div className="flex flex-col gap-2 ">
              {ingredientesFaltantes.map((ingrediente, index) => (
                <div
                  key={ingrediente.id}
                  className="w-full border-b-primaryOrange border-b-2 border-dotted sm:font-medium"
                  onDoubleClick={() => {
                    setIngredientesComprados(
                      ingredientesComprados.concat(ingrediente)
                    );
                    setIngredientesFaltantes(
                      ingredientesFaltantes.filter(
                        (item) => item.id !== ingrediente.id
                      )
                    );
                  }}
                >
                  {index + 1}. {ingrediente.nombre}
                </div>
              ))}
            </div>
          </div>
        )}
        {ingredientesComprados.length > 0 && (
          <div>
            <h1 className="font-medium sm:font-bold  sm:text-xl mb-3 border-b-primaryGreen border-b-2 ">
              Ya comprado:
            </h1>
            <div className="flex flex-col gap-2 ">
              {ingredientesComprados.map((ingrediente, index) => (
                <div
                  key={ingrediente.id}
                  className="w-full border-b-primaryOrange border-b-2 border-dotted sm:font-medium"
                >
                  <p className="w-full line-through">
                    {index + 1}. {ingrediente.nombre}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListaCompra;
