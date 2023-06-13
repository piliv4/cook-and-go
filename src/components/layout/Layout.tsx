import { EstablecimientoProvider } from "@/context/EstablecimientoProvider";
import Body from "./Body";
import { UsuarioProvider } from "@/context/UsuarioProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <UsuarioProvider>
      <EstablecimientoProvider>
        <Body>
          <main>{children}</main>
        </Body>
      </EstablecimientoProvider>
    </UsuarioProvider>
  );
}
