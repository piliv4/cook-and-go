import { Ingrediente } from "@/types/Ingrediente";

const IngredienteListaCompra = ({
  ingrediente,
}: {
  ingrediente: Ingrediente;
}) => {
  return (
    <div
      key={ingrediente.id}
      className="w-full border-b-primaryOrange border-b-2 border-dotted sm:font-medium"
      onDoubleClick={() => {
        setIngredientesComprados(ingredientesComprados.concat(ingrediente));
        setIngredientesFaltantes(
          ingredientesFaltantes.filter((item) => item.id !== ingrediente.id)
        );
      }}
    >
      {index + 1}. {ingrediente.nombre}
    </div>
  );
};
export default IngredienteListaCompra;
