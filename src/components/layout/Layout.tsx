import { EstablecimientoProvider } from "@/context/EstablecimientoProvider";
import AdminHeader from "./AdminHeader";
import Body from "./Body";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <EstablecimientoProvider>
      <AdminHeader />
      <Body>
        <main>{children}</main>
      </Body>
    </EstablecimientoProvider>
  );
}
