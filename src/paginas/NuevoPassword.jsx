import { Link } from "react-router-dom";

const NuevoPassword = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-4xl text-center">
        Reestablece tu password y no pierdas acceso a tus{" "}
        <span className="text-slate-700">Proyectos</span>
      </h1>
      <form className="my-10 bg-white p-10 shadow rounded-md">
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
          />
        </div>
        <input
          type="submit"
          value="Guardar nuevo password"
          className="bg-sky-700 w-full p-2 rounded-xl uppercase text-white font-bold hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
    </>
  );
};

export default NuevoPassword;
