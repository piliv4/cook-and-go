import Image from "next/image";
import supabase, { supabaseUrl } from "@/server/client";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { BiImageAdd } from "react-icons/bi";

const SubirImagenCircular = ({
  imagen,
  setImagen,
}: {
  imagen: string;
  setImagen: Function;
}) => {
  const router = useRouter();
  const bucketRuta = router.pathname.split("/")[2];
  //Si no tenemos una imagen (estamos en modo crear nueva imagen)
  //Le asignamos una imagen por defecto
  !imagen && setImagen("https://www.subang.go.id/backend/images/default.png");
  async function subirImagen(e: HTMLInputElement) {
    let imagenSubida = e.files && e.files[0];
    if (imagenSubida) {
      const { data } = await supabase.storage
        .from("imagenes")
        .upload(bucketRuta + "/" + uuidv4(), imagenSubida);
      if (data) {
        const imagenUrl = `${supabaseUrl}/storage/v1/object/public/imagenes/${data.path}`;
        setImagen(imagenUrl);
      }
    }
  }
  return (
    <div className="w-32 h-32 relative group ">
      <Image
        src={imagen}
        alt="imagen_categoria.jpg"
        className="rounded-full"
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
export default SubirImagenCircular;
