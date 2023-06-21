import { useContext } from "react";
import AdminHeader from "./AdminHeader";
import { UsuarioContext } from "@/context/UsuarioContext";

const Body = ({ children }: { children: React.ReactNode }) => {
  const { usuarioGlobal } = useContext(UsuarioContext);
  return (
    <>
      {usuarioGlobal &&
      usuarioGlobal.id &&
      usuarioGlobal.id != "" &&
      usuarioGlobal.rol === "Administrador" ? (
        <>
          <AdminHeader />
          <div className="bg-background  min-h-[calc(100vh-60px)]">
            <div className="mx-[36px] pt-6 ">{children}</div>
          </div>
        </>
      ) : (
        <>{children}</>
      )}
    </>
  );
};
export default Body;
