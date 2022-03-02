import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Alerta from "../components/Alerta";

const NuevoPassword = () => {
  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState("");
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);

  const params = useParams();
  useEffect(() => {
    const comprobarToken = async () => {
      try {
        const respuesta = await axios(
          `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/olvide-password/${
            params.token
          }`
        );
        if (respuesta) {
          setTokenValido(true);
          setAlerta({});
        }
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    comprobarToken();
  }, []);

  //funciones
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === "" || password.length < 6) {
      setAlerta({
        msg: "El password debe ser mínimo de 6 caracteres",
        error: true,
      });
      return;
    }
    try {
      const respuesta = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/olvide-password/${
          params.token
        }`,
        {
          password,
        }
      );
      setTokenValido(false);
      setPasswordModificado(true);
      setAlerta({
        msg: respuesta.data.msg,
        error: false,
      });
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  return (
    <>
      <h1 className="text-sky-600 font-black text-4xl text-center">
        Reestablece tu password y no pierdas acceso a tus{" "}
        <span className="text-slate-700">Proyectos</span>
      </h1>
      {alerta.msg && <Alerta alerta={alerta} />}
      {tokenValido && (
        <form
          className="my-10 bg-white p-10 shadow rounded-md"
          onSubmit={handleSubmit}
        >
          <div className="my-5">
            <label
              htmlFor="password"
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Nuevo Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Escribe tu nuevo password"
              className="w-full mt-2 p-2 rounded-xl bg-gray-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Guardar nuevo password"
            className="bg-sky-700 w-full p-2 rounded-xl uppercase text-white font-bold hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
        </form>
      )}
      {passwordModificado && (
        <Link
          to="/"
          className="block text-center my-4 text-slate-500 text-sm uppercase"
        >
          Inicia sesión
        </Link>
      )}
    </>
  );
};

export default NuevoPassword;
