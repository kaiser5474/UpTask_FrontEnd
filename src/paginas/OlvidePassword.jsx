import { Link } from "react-router-dom";

const OlvidePassword = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-4xl text-center">
        Recupera tu acceso y no pierdas tus{" "}
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

        <input
          type="submit"
          value="Enviar instrucciones"
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
          to="/registrar"
          className="block text-center my-4 text-slate-500 text-sm uppercase"
        >
          ¿No tienes una cuenta? Regístrate
        </Link>
      </nav>
    </>
  );
};

export default OlvidePassword;
