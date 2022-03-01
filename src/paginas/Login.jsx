import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-4xl text-center">
        Inicia Sesión y Administra tus{" "}
        <span className="text-slate-700">Proyectos</span>
      </h1>
      <form className="my-10 bg-white p-10 shadow rounded-md">
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
          />
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
  );
};

export default Login;
