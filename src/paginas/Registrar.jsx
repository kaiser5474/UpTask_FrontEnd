import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import axios from "axios";

const Registrar = () => {
  //hooks
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  //funciones
  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([nombre, email, password, repetirPassword].includes("")) {
      return setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
    }
    if (password !== repetirPassword) {
      return setAlerta({
        msg: "Los passwords no son iguales",
        error: true,
      });
    }
    if (password.length < 6) {
      return setAlerta({
        msg: "El password debe tener mas de 6 caracteres",
        error: true,
      });
    }
    //Crear el usuario en la API
    try {
      const { data } = await axios.post("http://localhost:4000/api/usuarios", {
        nombre,
        email,
        password,
      });
      setAlerta({
        msg: data.msg,
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
        Crea tu Cuenta y Administra tus{" "}
        <span className="text-slate-700">Proyectos</span>
      </h1>
      {alerta.msg && <Alerta alerta={alerta} />}
      <form
        className="my-10 bg-white p-10 shadow rounded-md"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            htmlFor="nombre"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            placeholder="Tu nombre"
            className="w-full mt-2 p-2 rounded-xl bg-gray-50"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
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
        </div>
        <div className="my-5">
          <label
            htmlFor="password2"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Repetir Password
          </label>
          <input
            id="password2"
            type="password"
            placeholder="Repetir password"
            className="w-full mt-2 p-2 rounded-xl bg-gray-50"
            value={repetirPassword}
            onChange={(e) => setRepetirPassword(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Crear Cuenta"
          className="bg-sky-700 w-full p-2 rounded-xl uppercase text-white font-bold hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          to="/"
          className="block text-center my-4 text-slate-500 text-sm uppercase"
        >
          ¿Ya tienes una cuenta? Inicia sesión
        </Link>
        <Link
          to="/olvide-password"
          className="block text-center my-4 text-slate-500 text-sm uppercase"
        >
          Olvidé mi password
        </Link>
      </nav>
    </>
  );
};

export default Registrar;
