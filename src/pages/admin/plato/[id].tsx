import CabeceraPagina from "@/components/admins/ui/CabeceraPagina";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { BsFillPencilFill, BsTrashFill } from "react-icons/bs";
import CrearPlatoPopUp from "@/components/admins/plato/CrearPlatoPopUp";
import { useEffect, useState } from "react";
import router from "next/router";
import { Categoria } from "@/types/Categoria";
import { Plato } from "@/types/Plato";
import { eliminarPlato, getPlatoById } from "@/api/articulo";
import { getCategoriaById, getCategoriaTitulo } from "@/api/categoria";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  let plato = await getPlatoById(id as string);
  let categoria = await getCategoriaById(plato.categoria_id as string);
  return {
    props: {
      plato: plato,
      categoria: categoria,
    },
  };
};

const DetallesPlato = ({
  plato,
  categoria,
}: {
  plato: Plato;
  categoria: Categoria;
}) => {
  const [open, setOpen] = useState(false);

  async function borrarPlato() {
    try {
      await eliminarPlato(plato.id);
    } catch (e) {
      console.log("Error al eliminar el plato");
    }
    router.replace(router.asPath);
  }
  return (
    <div className="mx-48">
      <CabeceraPagina>
        <h1 className="text-2xl font-black uppercase col-span-2">
          {plato.nombre}
        </h1>
        <div className="w-full flex flex-row gap-2 justify-end">
          <BsFillPencilFill
            className="group fill-primaryOrange hover:fill-secondaryOrange transition duration-150"
            onClick={() => setOpen(true)}
          />
          <BsTrashFill
            className="fill-primaryOrange hover:fill-secondaryOrange transition duration-150"
            onClick={() => borrarPlato()}
          />
        </div>
      </CabeceraPagina>
      {/* Información general */}
      <div className="grid grid-cols-2 pt-2 gap-x-8">
        <div className="relative py-40">
          <Image
            src={plato.imagenURL}
            alt="imagen_plato.jpg"
            className="absolute rounded-md"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="rounded-md border-[1px] border-secondaryGreen overflow-hidden">
          <div className="w-full bg-secondaryGreen py-2 text-center text-lg font-black uppercase">
            Información general del plato
          </div>
          <div className="p-4 gap-8 flex flex-col h-full">
            <div className="flex flex-row border-b-[2px] border-primaryOrange border-dotted">
              <p className="font-black">Nombre:</p>
              <p className="w-full text-right">{plato.nombre}</p>
            </div>
            <div className="flex flex-row border-b-[2px] border-primaryOrange border-dotted">
              <p className="font-black">Descripción:</p>
              <p className="w-full text-right">{plato.descripcion}</p>
            </div>
            <div className="flex flex-row border-b-[2px] border-primaryOrange border-dotted">
              <p className="font-black">Categoria:</p>
              <p className="w-full text-right">{categoria.nombre}</p>
            </div>
            <div className="flex flex-row border-b-[2px] border-primaryOrange border-dotted">
              <p className="font-black">Precio:</p>
              <p className="w-full text-right">{plato.precio}€</p>
            </div>
          </div>
        </div>
      </div>
      {/* Mis ingredientes */}
      <div className="flex flex-col gap-y-4 mt-4">
        <div className="pb-1 border-primaryGreen border-b-[2px] text-xl font-black uppercase">
          Ingredientes:
        </div>
        {plato.ingredientes.length > 0 ? (
          plato.ingredientes.map((ingrediente, index) => (
            <div
              key={ingrediente.id}
              className="flex flex-row border-b-[2px] border-primaryOrange border-dotted"
            >
              <p className="w-full">
                {index + 1}. {ingrediente.nombre}
              </p>
            </div>
          ))
        ) : (
          <div className="w-full text-center">
            este plato no tiene ingredientes
          </div>
        )}
      </div>
      <CrearPlatoPopUp
        platoEditar={plato}
        cerrarPopUp={() => setOpen(false)}
        open={open}
      />
    </div>
  );
};

export default DetallesPlato;
