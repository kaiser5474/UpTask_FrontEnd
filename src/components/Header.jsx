import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useProyectos from "../hooks/useProyectos";
import Busqueda from "./Busqueda";

const Header = () => {
  const { cerrarSesion } = useAuth();
  const { cerrarSesionProyectos, buscador, handleBuscador } = useProyectos();

  const handleCerrarSesion = () => {
    cerrarSesion();
    cerrarSesionProyectos();
  };
  return (
    <header className="px-4 py-5 border-b bg-white w-full">
      <div className="md:flex md:justify-between">
        <h2 className="text-4xl text-sky-600 font-black text-center mb-5 md:mb-0">
          UpTask{" "}
        </h2>
        <div>
          {/* <input
            type="search"
            placeholder="Buscar Proyecto"
            className="text-center rounded-lg lg:w-96 block p-2 border mb-5 md:mb-0 "
          /> */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <button
              className="font-bold uppercase"
              type="button"
              onClick={handleBuscador}
            >
              Buscar Proyecto
            </button>
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
      </div>
      <Busqueda />
    </header>
  );
};

export default Header;
