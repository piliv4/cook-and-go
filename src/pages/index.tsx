import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="max-w-max min-w-full flex justify-center">
        <h1 className="text-3xl font-bold ">¡Bienvenido a cook and go!</h1>
      </div>
      <div>
        <Link href="/admin/">
          <p> Página del administrador</p>
        </Link>
        <Link href="/kds/">
          <p> Página de pantalla de cocina</p>
        </Link>
      </div>
    </div>
  );
}
