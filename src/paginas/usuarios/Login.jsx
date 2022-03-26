import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../../components/Alerta";
import clienteAxios from "../../config/clienteAxios";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const { setAuth, cargando } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([email, password].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }
    try {
      const { data } = await clienteAxios.post(`/usuarios/login`, {
        email,
        password,
      });
      setAuth(data);
      if (checked) {
        localStorage.setItem("token", data.token);
      } else {
        sessionStorage.setItem("token", data.token);
      }
      navigate("/proyectos");
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };
  const handleChange = (e) => {
    setChecked(e.target.checked);
    //console.log(e.target.checked);
  };
  return (
    <>
      {cargando ? (
        <span className="flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
        </span>
      ) : (
        <>
          <h1 className="text-sky-600 font-black text-4xl text-center">
            Inicia Sesión y Administra tus{" "}
            <span className="text-slate-700">Proyectos</span>
          </h1>
          {alerta.msg && <Alerta alerta={alerta} />}
          <form
            className="my-10 bg-white p-10 shadow rounded-md"
            onSubmit={handleSubmit}
          >
            <div className="my-5">
              <label
                htmlFor="email"
                className="uppercase text-gray-600 block text-xl font-bold"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email de registro"
                className="w-full mt-2 p-2 rounded-xl bg-gray-50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="my-5">
              <label
                htmlFor="password"
                className="uppercase text-gray-600 block text-xl font-bold"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                className="w-full mt-2 p-2 rounded-xl bg-gray-50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="my-5">
                <input
                  type="checkbox"
                  id="conectado"
                  className="mr-2"
                  onChange={handleChange}
                />
                <label htmlFor="conectado" className="uppercase text-gray-600">
                  Desea permanecer conectado
                </label>
              </div>
            </div>
            <input
              type="submit"
              value="Iniciar Sesión"
              className="bg-sky-700 w-full p-2 rounded-xl uppercase text-white font-bold hover:cursor-pointer hover:bg-sky-800 transition-colors"
            />
          </form>
          <nav className="lg:flex lg:justify-between">
            <Link
              to="/registrar"
              className="block text-center my-4 text-slate-500 text-sm uppercase"
            >
              ¿No tienes una cuenta? Regístrate
            </Link>
            <Link
              to="/olvide-password"
              className="block text-center my-4 text-slate-500 text-sm uppercase"
            >
              Olvidé mi password
            </Link>
          </nav>
        </>
      )}
    </>
  );
};

export default Login;
