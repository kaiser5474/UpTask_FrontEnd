import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useProyectos from "../hooks/useProyectos";

const Header = () => {
  const { cerrarSesion } = useAuth();
  const { cerrarSesionProyectos } = useProyectos();

  const handleCerrarSesion = () => {
    cerrarSesion();
    cerrarSesionProyectos();
  };
  return (
    <header className="px-4 py-5 border-b bg-white w-full">
      <div className="md:flex md:justify-between">
        <h2 className="text-4xl text-sky-600 font-black text-center">
          UpTask{" "}
        </h2>
        <input
          type="search"
          placeholder="Buscar Proyecto"
          className="text-center rounded-lg lg:w-96 block p-2 border"
        />
        <div className="flex items-center gap-4">
          <Link to="/proyectos" className="font-bold uppercase">
            Proyectos
          </Link>
          <button
            type="button"
            className="text-white text-sm bg-sky-600 p-3 rounded-md font-bold uppercase"
            onClick={handleCerrarSesion}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
