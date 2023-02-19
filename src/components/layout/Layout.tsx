import AdminHeader from "./AdminHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminHeader />
      <main>{children}</main>
    </>
  );
}
