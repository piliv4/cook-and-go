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
        <ul>
          {ingredientes.map((ingrediente) => (
            <li key={ingrediente.id}>
              <span>-</span>
              {ingrediente.nombre}{" "}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
