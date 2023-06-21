import CabeceraPagina from "@/components/admins/ui/CabeceraPagina";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { BsFillPencilFill, BsTrashFill } from "react-icons/bs";
import router from "next/router";
import { Categoria } from "@/types/Categoria";
import { Bebida } from "@/types/Bebida";
import { eliminarBebida, getBebidaById } from "@/api/bebida";
import { getCategoriaById } from "@/api/categoria";
import UsuarioAutorizado from "@/components/layout/UsuarioAutorizado";
import VerificarEstablecimiento from "@/components/admins/ui/VerificarEstablecimiento";
import AdministradorAutorizado from "@/components/admins/ui/AdministradorAutorizado";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  let bebida = await getBebidaById(id as string);
  let categoria = await getCategoriaById(bebida.categoria_id as string);
  return {
    props: {
      bebida: bebida,
      categoria: categoria,
    },
  };
};

const DetallesBebida = ({
  bebida,
  categoria,
}: {
  bebida: Bebida;
  categoria: Categoria;
}) => {
  return (
    <UsuarioAutorizado>
      <AdministradorAutorizado>
        <VerificarEstablecimiento>
          <div className="mx-48">
            <CabeceraPagina>
              <h1 className="text-2xl font-black uppercase col-span-2">
                {bebida.nombre}
              </h1>
              <div className="w-full flex flex-row gap-2 justify-end">
                <BsFillPencilFill
                  className="group fill-primaryOrange hover:fill-secondaryOrange transition duration-150"
                  onClick={() =>
                    router.push("/admin/bebida/editar/" + bebida.id)
                  }
                />
                <BsTrashFill
                  className="fill-primaryOrange hover:fill-secondaryOrange transition duration-150"
                  onClick={() => eliminarBebida(bebida.id)}
                />
              </div>
            </CabeceraPagina>
            {/* Información general */}
            <div className="grid grid-cols-2 pt-2 gap-x-8">
              <div className="relative py-40">
                <Image
                  src={bebida.imagenURL}
                  alt="imagen_bebida.jpg"
                  className="absolute rounded-md"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="rounded-md border-[1px] border-secondaryGreen overflow-hidden">
                <div className="w-full bg-secondaryGreen py-2 text-center text-lg font-black uppercase">
                  Información general del bebida
                </div>
                <div className="p-4 gap-8 flex flex-col h-full">
                  <div className="flex flex-row border-b-[2px] border-primaryOrange border-dotted">
                    <p className="font-black">Nombre:</p>
                    <p className="w-full text-right">{bebida.nombre}</p>
                  </div>
                  <div className="flex flex-row border-b-[2px] border-primaryOrange border-dotted">
                    <p className="font-black">Descripción:</p>
                    <p className="w-full text-right">{bebida.descripcion}</p>
                  </div>
                  <div className="flex flex-row border-b-[2px] border-primaryOrange border-dotted">
                    <p className="font-black">Categoria:</p>
                    <p className="w-full text-right">{categoria.nombre}</p>
                  </div>
                  <div className="flex flex-row border-b-[2px] border-primaryOrange border-dotted">
                    <p className="font-black">Precio:</p>
                    <p className="w-full text-right">{bebida.precio}€</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </VerificarEstablecimiento>
      </AdministradorAutorizado>
    </UsuarioAutorizado>
  );
};

export default DetallesBebida;
