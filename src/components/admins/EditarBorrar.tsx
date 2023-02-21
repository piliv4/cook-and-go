import { BsFillPencilFill, BsTrashFill } from "react-icons/bs";
const EditarBorrar = () => {
  return (
    <div className="grid grid-cols-2 absolute right-2 top-2 gap-1">
      <BsFillPencilFill className="fill-white" />
      <BsTrashFill className="fill-white" />
    </div>
  );
};
export default EditarBorrar;
