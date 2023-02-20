import { Ingrediente } from "@/types/types";

const IngredienteCard = ({ ingrediente }: { ingrediente: Ingrediente }) => {
  return (
    <div className="grid grid-cols-[10%_40%_10%_10%_10%_10%_10%] w-full hover:bg-blue-200 px-2">
      <p>{ingrediente.nombre}</p>
      <p>{ingrediente.descripcion}</p>
      <p>{ingrediente.precioSuplemento}</p>
      <p>stock</p>
      <p>unidad</p>
      <button>guardad</button>
      <button>eliminar</button>
    </div>
  );
};
export default IngredienteCard;
