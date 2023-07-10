import { getIngredientesByPlato } from "@/api/ingrediente";
import { Ingrediente } from "@/types/Ingrediente";
import { useEffect, useState } from "react";
import { BsInfoCircle } from "react-icons/bs";

export default function ConsultarIngredientes({
  platoId,
  verIngredientes,
}: {
  platoId: string;
  verIngredientes: boolean;
}) {
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
  const [mostrarInfo, setMostrarInfo] = useState(false);

  useEffect(() => {
    const fetchIngredientes = async () => {
      let ingredientesAux = await getIngredientesByPlato(platoId);
      setIngredientes(ingredientesAux);
    };
    fetchIngredientes();
  }, [platoId]);

  return (
    <>
      {verIngredientes && (
        <div className="p-1 px-2">
          <div className="flex items-center">
            <p className="font-medium w-full">Ingredientes:</p>
            <BsInfoCircle onClick={() => setMostrarInfo(!mostrarInfo)} />
          </div>
          {mostrarInfo && (
            <div className="text-xs text-justify rounded-md border-[1px] p-1 border-black mb-2">
              En caso de faltar un ingrediente, puede indicarlo marcando la
              casilla.
            </div>
          )}
          {ingredientes.length > 0 ? (
            <ul className="pl-2">
              {ingredientes.map((ingrediente) => (
                <li key={ingrediente.id} className="flex justify-between pb-1">
                  <input type="checkbox"></input>
                  <p className="text-sm flex-1">{ingrediente.nombre}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-center">
              El plato no tiene ingredientes
            </p>
          )}
        </div>
      )}
    </>
  );
}
