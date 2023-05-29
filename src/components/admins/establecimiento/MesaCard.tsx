import { Mesa } from "@/types/Establecimiento";
import { BsTrashFill } from "react-icons/bs";

const MesaCard = ({ index, mesa }: { index: number; mesa: Mesa }) => {
  return (
    <div className="flex flex-row border-b-2 border-dotted border-primaryOrange m-2 mt-4">
      <p>{index}. </p>
      <p>{mesa.tipo}</p>
      <p className="w-full text-center">{mesa.comensales} comensales</p>
      <BsTrashFill className="" />
    </div>
  );
};
export default MesaCard;
