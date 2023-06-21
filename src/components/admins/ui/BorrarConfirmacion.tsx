import { useState } from "react";
import { BsTrashFill } from "react-icons/bs";
import Popup from "reactjs-popup";

const BorrarCofirmacion = ({
  borrar,
  nombre,
  tipo,
  tipoArticulo,
  negro,
}: {
  borrar: Function;
  nombre: string;
  tipo: string;
  tipoArticulo: string;
  negro: boolean;
}) => {
  const [open, setOpen] = useState(false);

  function cancelHandler() {
    setOpen(false);
  }

  function AcceptHandler() {
    setOpen(false);
    borrar();
  }

  function confirmAction() {
    setOpen(true);
  }
  return (
    <>
      {negro ? (
        <BsTrashFill
          className="fill-black hover:fill-secondaryOrange  transition duration-150"
          onClick={confirmAction}
        />
      ) : (
        <BsTrashFill
          className="fill-white hover:fill-secondaryOrange transition duration-150"
          onClick={confirmAction}
        />
      )}

      <Popup open={open} modal closeOnDocumentClick onClose={cancelHandler}>
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-sm">
          <div className="w-11/12 rounded-md bg-white sm:w-2/5">
            <h1 className="rounded-t-md bg-secondaryGreen py-2 text-center text-lg font-bold text-white">
              Eliminar {tipo}
            </h1>
            <p className="m-3 text-center">
              <span className="font-bold">⚠️¡Atención!⚠️</span>
            </p>
            <p className="m-3 text-justify">
              Estás apunto de eliminar {tipoArticulo}{" "}
              <span className="font-medium italic">{nombre}</span> del sistema,
              esta acción es irreversible.
            </p>
            <p className="m-3 mt-4 text-center">
              ¿Estás seguro de que quieres continuar?
            </p>
            <div className="mb-3 mr-3 flex justify-end gap-2 font-bold">
              <button
                className=" ml-3 mt-3 rounded-full border border-base-content bg-transparent px-1 border-primaryOrange sm:mt-5 sm:px-3"
                onClick={cancelHandler}
              >
                Cancelar
              </button>
              <button
                className="btn-sm mt-3 rounded-full  text-white text-base-100 bg-primaryOrange sm:mt-5 sm:py-1 sm:px-4"
                onClick={AcceptHandler}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </Popup>
    </>
  );
};
export default BorrarCofirmacion;
