import AdminHeader from "./AdminHeader";
import Body from "./Body";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminHeader />
      <Body>
        <main>{children}</main>
      </Body>
    </>
  );
}
