import { useState } from "react";
import Image from "next/image";
import supabase, { supabaseUrl } from "@/server/client";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { BiImageAdd } from "react-icons/bi";

const SubirImagen = ({
  imagen,
  setImagen,
}: {
  imagen: string;
  setImagen: Function;
}) => {
  const router = useRouter();
  const bucketRuta = router.pathname.split("/")[2];
  console.log(bucketRuta);
  async function subirImagen(e: HTMLInputElement) {
    let imagen = e.files && e.files[0];
    if (imagen) {
      const { data } = await supabase.storage
        .from("imagenes")
        .upload(bucketRuta + "/" + uuidv4(), imagen);
      if (data) {
        const imagenUrl = `${supabaseUrl}/storage/v1/object/public/imagenes/${data.path}`;
        setImagen(imagenUrl);
      }
    }
  }
  return (
    <div className="py-10 relative w-full group ">
      <Image
        src={
          imagen
            ? imagen
            : "https://www.subang.go.id/backend/images/default.png"
        }
        alt="imagen_categoria.jpg"
        className=""
        fill
        objectFit="cover"
      />
      <div className="absolute top-0 z-10 bg-white opacity-50 group-hover:opacity-40 duration-150 transition h-full  w-full" />
      <label className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-full flex justify-center">
        <input
          type={"file"}
          className="hidden "
          accept="image/png, image/jpg, image/jpeg"
          onChange={(e) => subirImagen(e.target)}
        />
        <BiImageAdd size={70} className="" />
      </label>
    </div>
  );
};
export default SubirImagen;
