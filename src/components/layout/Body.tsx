import { useContext } from "react";
import AdminHeader from "./AdminHeader";
import { UsuarioContext } from "@/context/UsuarioContext";
import { useRouter } from "next/router";

const Body = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { usuarioGlobal } = useContext(UsuarioContext);

  let admin = router.pathname.split("/")[1];
  return (
    <>
      {usuarioGlobal &&
      usuarioGlobal.id &&
      usuarioGlobal.id != "" &&
      usuarioGlobal.rol === "Administrador" &&
      admin == "admin" ? (
        <>
          <AdminHeader />
          <div className="bg-background  min-h-[calc(100vh-60px)]">
            <div className="mx-[18px] sm:mx-[36px] pt-6 ">{children}</div>
          </div>
        </>
      ) : (
        <>{children}</>
      )}
    </>
  );
};
export default Body;
