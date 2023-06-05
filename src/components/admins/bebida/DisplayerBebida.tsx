import CrearBebidaCard from "./CrearBebidaCard";
import BebidaCard from "./BebidaCard";
import { Bebida } from "@/types/Bebida";

const DisplayerBebida = ({ bebidas }: { bebidas: Bebida[] }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-1 sm:gap-3 ">
      {bebidas.map((bebida) => (
        <BebidaCard bebida={bebida} key={bebida.id} />
      ))}
      <CrearBebidaCard />
    </div>
  );
};
export default DisplayerBebida;
