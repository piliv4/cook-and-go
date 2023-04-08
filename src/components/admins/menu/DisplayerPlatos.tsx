import { Plato } from "@/types/types";

const DisplayerPlatos = ({
  titulo,
  platos,
}: {
  titulo: string;
  platos: Plato[];
}) => {
  return (
    <div className="flex justify-center flex-col">
      <div className="font-black pt-4  border-b-[1px] border-primaryGreen flex flex-row">
        <h1 className="w-full capitalize">{titulo}</h1>
      </div>
      <div>
        {platos.map((plato, index) => (
          <div
            key={plato.id}
            className="flex flex-row py-1 border-b-[2px] border-primaryOrange border-dotted "
          >
            <p className="w-full">
              {index + 1}. {plato.nombre}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default DisplayerPlatos;
