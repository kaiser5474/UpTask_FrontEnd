import PreviewProyecto from "../../components/PreviewProyecto";
import useProyectos from "../../hooks/useProyectos";
import { Link } from "react-router-dom";

const Proyectos = () => {
  const { proyectos } = useProyectos();
  return (
    <>
      <div className="p-5 flex justify-between">
        <h1 className="font-black text-4xl">Proyectos</h1>
        <div className="flex items-center gap-2 text-gray-500 hover:text-gray-800">
          {/* <Link to={`/proyectos/editar/${id}`}>Editar</Link> */}
          <Link to={`crear-proyecto`} className="uppercase font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Crear
          </Link>
        </div>
      </div>
      <div className="bg-white shadow m-10 rounded-lg">
        {proyectos.length > 0 ? (
          proyectos.map((proyecto) => {
            return (
              <PreviewProyecto proyectoPreview={proyecto} key={proyecto._id} />
            );
          })
        ) : (
          <p className="uppercase p-5 text-gray-600 text-center">
            No hay proyectos aún, crea uno.
          </p>
        )}
      </div>
    </>
  );
};

export default Proyectos;
