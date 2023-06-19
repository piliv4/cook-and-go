import {
  editarEstablecimiento,
  eliminarEstablecimiento,
  getEstablecimientoById,
} from "@/api/establecimiento";
import Image from "next/image";
import CabeceraPagina from "@/components/admins/ui/CabeceraPagina";
import { EstablecimientoContext } from "@/context/EstablecimientoContext";
import { Establecimiento } from "@/types/Establecimiento";
import { GetServerSideProps } from "next";
import router from "next/router";
import { useContext } from "react";
import { BsFillPencilFill, BsTrashFill } from "react-icons/bs";
import Link from "next/link";
import UsuarioAutorizado from "@/components/layout/UsuarioAutorizado";

export default function EditarEstablecimiento({
  establecimiento,
}: {
  establecimiento: Establecimiento;
}) {
  const { setEstablecimientoGlobal } = useContext(EstablecimientoContext);
  const { establecimientoGlobal } = useContext(EstablecimientoContext);

  async function borrarEstablecimiento() {
    await eliminarEstablecimiento(establecimiento.id);
    setEstablecimientoGlobal({} as Establecimiento);
    router.replace(router.asPath);
  }
  return (
    <UsuarioAutorizado>
      <div className="mx-48">
        <CabeceraPagina>
          <div className="col-span-3 flex -mb-3">
            <h1 className="text-2xl font-black uppercase w-full text-center">
              {establecimiento.nombre}
              <span className="text-xl font-extrabold normal-case col-span-2">
                {" - "}
                {establecimiento.descripcion}
              </span>
            </h1>
            <div className="flex flex-row gap-2 justify-end items-end pb-1">
              <BsFillPencilFill
                className="group fill-primaryOrange hover:fill-secondaryOrange transition duration-150"
                onClick={() =>
                  router.push(
                    "/admin/establecimiento/editar/" + establecimiento.id
                  )
                }
              />
              <BsTrashFill
                className="fill-primaryOrange hover:fill-secondaryOrange transition duration-150"
                onClick={() => borrarEstablecimiento()}
              />
            </div>
          </div>
        </CabeceraPagina>
        {/* Información general */}
        <div className="grid grid-cols-2 pt-2 gap-x-8">
          <div className="relative py-40">
            <Image
              src={establecimiento.imagenURL}
              alt="imagen_establecimiento.jpg"
              className="absolute rounded-md"
              sizes="400px"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="rounded-md border-[1px] border-primaryGreen overflow-hidden">
            <div className="w-full bg-primaryGreen text-white py-1 text-center text-lg font-black uppercase">
              Información general
            </div>
            {/* UBICACION */}
            <div className="px-6 flex flex-col gap-4 pt-4">
              <div>
                <h1 className="font-black text-center border-b-2 border-secondaryGreen">
                  Ubicación
                </h1>
                <p className="text-center pt-1">
                  {establecimiento.ciudad + "-" + establecimiento.direccion}
                </p>
              </div>
              {/* Contacto */}
              <div>
                <h1 className="font-black text-center border-b-2 border-secondaryGreen">
                  Contacto
                </h1>
                <div className="flex flex-col gap-3 pt-3 ">
                  <div className="flex border-b-[2px] border-primaryOrange border-dotted ">
                    <p className="w-full ">Teléfono:</p>
                    <p className=" ">{establecimiento.telefono}</p>
                  </div>
                  <div className="flex border-b-[2px] border-primaryOrange border-dotted ">
                    <p className="w-full ">Correo electrónico:</p>
                    <p className=" ">{establecimiento.correo}</p>
                  </div>
                  <div className="flex border-b-[2px] border-primaryOrange border-dotted">
                    <p className="w-full">Página web:</p>
                    <Link
                      className="hover:underline"
                      href={establecimiento.web}
                    >
                      {establecimiento.web}
                    </Link>
                  </div>
                  <button
                    className="w-full bg-primaryOrange rounded-full py-2 uppercase text-white font-black hover:bg-secondaryOrange"
                    onClick={() => setEstablecimientoGlobal(establecimiento)}
                  >
                    {establecimientoGlobal.id == establecimiento.id
                      ? "Administrando"
                      : "Administrar"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Mis ingredientes */}
        <div className="flex flex-col gap-y-4 mt-4">
          <div className="border-primaryGreen border-b-[2px] text-xl font-black uppercase">
            Secciones:
          </div>
          <div className="grid grid-cols-3 gap-3">
            {establecimiento.secciones.map((seccion) => (
              <div key={seccion.id}>
                <div className="flex flex-row ">
                  <p className="placeholder:font-normal bg-background placeholder:text-sm  px-2 font-black ml-2  inline-block border-2 rounded-md border-primaryGreen">
                    {seccion.nombre}
                  </p>
                </div>
                <div className="-mt-[12px] border-2  border-primaryGreen rounded-md p-2 ">
                  {seccion.mesas?.map((mesa, indexMesa) => (
                    <div
                      key={mesa.id}
                      className="flex flex-row border-b-2 border-dotted px-2 border-primaryGreen m-2 mt-4"
                    >
                      <p className="pr-2">{indexMesa + 1}. </p>
                      <p>{mesa.tipo}</p>
                      <p className="w-full text-end">
                        {mesa.comensales} comensales
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </UsuarioAutorizado>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  let establecimiento = await getEstablecimientoById(id as string);
  return {
    props: {
      establecimiento: establecimiento as Establecimiento,
    },
  };
};
