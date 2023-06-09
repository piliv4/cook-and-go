import { FormEvent, FormEventHandler, useState } from "react";
import { useRouter } from "next/router";
import { FaUtensils } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignIn = async (email: string, password: string) => {};

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSignIn(email, password);
    try {
      router.push("/");
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-terciaryIntermediate">
      <div className="rounded-lg bg-background shadow-xl grid grid-cols-[45%_55%]">
        <div className="m-3 bg-primaryGreen rounded-lg flex justify-center items-center flex-col px-4 py-10">
          <FaUtensils size={46} className="fill-white" />

          <p className="font-black text-5xl px-6 text-white">Cook&Go</p>
        </div>
        <div className="my-10 mr-3 px-3 flex flex-col">
          <form onSubmit={handleSubmit}>
            <h1 className="text-center text-2xl font-black">¡Bienvenido!</h1>
            <h2 className="text-sm font-medium text-center mt-1 text-gray-900">
              Inicie sesión para empezar a gestionar
            </h2>
            <div className="py-4 flex flex-col gap-2">
              <input
                type="email"
                className="w-full rounded-md py-1"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                className="w-full rounded-md py-1"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="rounded-md w-full py-1 bg-primaryOrange font-black text-white"
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
