import { EstablecimientoProvider } from "@/context/EstablecimientoProvider";
import AdminHeader from "./AdminHeader";
import Body from "./Body";
import { UsuarioProvider } from "@/context/UsuarioProvider";
import { UsuarioContext } from "@/context/UsuarioContext";
import { useContext } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { usuarioGlobal } = useContext(UsuarioContext);
  console.log(usuarioGlobal);
  return (
    <EstablecimientoProvider>
      <UsuarioProvider>
        {usuarioGlobal ? (
          <>
            <AdminHeader />
            <Body>
              <main>{children}</main>
            </Body>
          </>
        ) : (
          <main>{children}</main>
        )}
      </UsuarioProvider>
    </EstablecimientoProvider>
  );
}
