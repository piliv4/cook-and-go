import { EstablecimientoProvider } from "@/context/EstablecimientoProvider";
import Body from "./Body";
import { UsuarioProvider } from "@/context/UsuarioProvider";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <UsuarioProvider>
      <EstablecimientoProvider>
        <Body>
          <main>{children}</main>
          <ToastContainer autoClose={3000}></ToastContainer>
        </Body>
      </EstablecimientoProvider>
    </UsuarioProvider>
  );
}
