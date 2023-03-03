import supabase from "@/server/client";
import { Ingrediente } from "@/types/types";
import { useEffect, useState } from "react";

const SeleccionarIngredientes = () => {
  const [data, setData] = useState<Ingrediente[] | null>(null);
  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase.from("Ingrediente").select();
      setData(data as Ingrediente[]);
    };
    fetchPosts();
  }, []);
  return (
    <div className=" ">
      {data?.map((ingrediente) => (
        <p key={ingrediente.id}>{ingrediente.nombre}</p>
      ))}
    </div>
  );
};
export default SeleccionarIngredientes;
