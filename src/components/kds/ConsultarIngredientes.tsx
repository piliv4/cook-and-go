import { getIngredientesByPlato } from "@/api/ingrediente";
import { Ingrediente } from "@/types/Ingrediente";
import { useEffect, useState } from "react";

export default function ConsultarIngredientes({
  platoId,
}: {
  platoId: string;
}) {
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);

  useEffect(() => {
    const fetchIngredientes = async () => {
      let ingredientesAux = await getIngredientesByPlato(platoId);
      setIngredientes(ingredientesAux);
    };
    fetchIngredientes();
  }, [platoId]);

  return (
    <div className="">
      <ul>
        {ingredientes.map((ingrediente) => (
          <li key={ingrediente.id}>{ingrediente.nombre}</li>
        ))}
      </ul>
    </div>
  );
}
