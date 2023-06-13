import { BiSearch } from "react-icons/bi";
import InputErrorEnvoltorio from "./admins/ui/InputErrorEnvoltorio";
import MensajeError from "./admins/ui/MensajeError";
import { FaUtensils } from "react-icons/fa";
import { contraseñaValida, correoExiste, iniciarSesion } from "@/api/empleado";
import { useContext, useState } from "react";
import { UsuarioContext } from "@/context/UsuarioContext";
import { useRouter } from "next/router";
const IniciarSesionComp = () => {
  const [correo, setCorreo] = useState("");
  const [errorCorreo, setErrorCorreo] = useState("");
  const [errorContraseña, setErrorContraseña] = useState("");
  const [contraseña, setContraseña] = useState("");
  const router = useRouter();
  const { setUsuarioGlobal } = useContext(UsuarioContext);

  const validarCampos = async () => {
    // Validar el campo de correo electrónico
    if (!correo) {
      setErrorCorreo("Debe ingresar un correo electrónico");
    } else {
      const correoValido = await correoExiste(correo);
      setErrorCorreo(correoValido);
    }
    // Validar el campo de contraseña
    if (!contraseña) {
      setErrorContraseña("Debe ingresar una contraseña");
    } else {
      if (errorCorreo == "") {
        const contrasenyaValida = await contraseñaValida(correo, contraseña);
        setErrorContraseña(contrasenyaValida);
      }
    }

    return errorContraseña == "" && errorCorreo == "";
  };

  const inicio = async () => {
    console.log();
    const valido = await validarCampos();
    if (valido) {
      const usuario = await iniciarSesion(correo, contraseña);
      if (usuario != null) {
        setUsuarioGlobal(usuario);
        router.push("/");
      }
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
          <h1 className="text-center text-2xl font-black">¡Bienvenido!</h1>
          <h2 className="text-sm font-medium text-center mt-1 text-gray-900">
            Inicie sesión para empezar a gestionar
          </h2>
          <div className="py-4 flex flex-col gap-2">
            <InputErrorEnvoltorio error={errorCorreo}>
              <input
                type="correo"
                placeholder="Correo electrónico"
                className="w-full rounded-md py-1"
                id="correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </InputErrorEnvoltorio>
            <MensajeError texto={errorCorreo} />
            <InputErrorEnvoltorio error={errorContraseña}>
              <input
                type="contraseña"
                className="w-full rounded-md py-1"
                placeholder="Contraseña"
                id="contraseña"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
              />
            </InputErrorEnvoltorio>
            <MensajeError texto={errorContraseña} />
          </div>
          <button
            className="rounded-md w-full py-1 bg-primaryOrange font-black text-white"
            onClick={() => inicio()}
          >
            Iniciar sesión
          </button>
        </div>
      </div>
    </div>
  );
};
export default IniciarSesionComp;
