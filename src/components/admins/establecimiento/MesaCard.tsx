import { Establecimiento, Mesa } from "@/types/Establecimiento";
import { BsTrashFill } from "react-icons/bs";

const MesaCard = ({
  indexSeccion,
  indexMesa,
  establecimiento,
  setEstablecimiento,
}: {
  indexSeccion: number;
  indexMesa: number;
  establecimiento: Establecimiento;
  setEstablecimiento: Function;
}) => {
  const mesa = establecimiento.secciones[indexSeccion].mesas[indexMesa];
  function eliminarMesa() {
    let establecimientoCopia = { ...establecimiento };
    establecimientoCopia.secciones[indexSeccion].mesas.splice(indexMesa, 1);
    setEstablecimiento(establecimientoCopia);
  }
  return (
    <div className="flex flex-row border-b-2 border-dotted px-2 border-primaryGreen m-2 mt-4">
      <p className="pr-2">{indexMesa + 1}. </p>
      <p>{mesa.tipo}</p>
      <p className="w-full text-center">{mesa.comensales} comensales</p>
      <BsTrashFill className="" onClick={() => eliminarMesa()} />
    </div>
  );
};
export default MesaCard;
