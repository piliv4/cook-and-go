import {
  getIngredientesByPlato,
  getIngredientesExtra,
} from "@/api/ingrediente";
import { Ingrediente } from "@/types/Ingrediente";
import { useEffect, useState } from "react";

export default function IngredientesExtra({
  articuloComandaId,
}: {
  articuloComandaId: string;
}) {
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
  useEffect(() => {
    const fetchIngredientes = async () => {
      let ingredientesAux = await getIngredientesExtra(articuloComandaId);
      setIngredientes(ingredientesAux);
    };
    fetchIngredientes();
  }, [articuloComandaId]);
  return (
    <>
      {ingredientes.length > 0 && (
        <div className="p-1 px-2">
          <p className="font-medium">Extras:</p>
          <ul className="pl-2">
            {ingredientes.map((ingrediente) => (
              <li key={ingrediente.id}>
                <p className="text-sm">- {ingrediente.nombre} </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
