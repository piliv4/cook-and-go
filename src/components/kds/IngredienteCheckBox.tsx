import { cambiarStockIngrediente } from "@/api/ingrediente";
import { Ingrediente } from "@/types/Ingrediente";
import { useState } from "react";

export default function IngredienteCheckBox({
  ingrediente,
  setErrorPlato,
}: {
  setErrorPlato: Function;
  ingrediente: Ingrediente;
}) {
  const [activo, setActivo] = useState(ingrediente.stock > 0);
  setErrorPlato(!activo);
  return (
    <li key={ingrediente.id} className="flex justify-between pb-1">
      <input
        type="checkbox"
        defaultChecked={!activo}
        onChange={(e) => {
          setActivo(!e.target.checked);
          if (e.target.checked == true) {
            cambiarStockIngrediente(ingrediente.id, 0);
          } else {
            cambiarStockIngrediente(ingrediente.id, 2);
          }
        }}
      ></input>
      <p className={activo ? "text-sm flex-1" : "text-sm flex-1 line-through"}>
        {ingrediente.nombre}
      </p>
    </li>
  );
}
