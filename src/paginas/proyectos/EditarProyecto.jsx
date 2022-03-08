import { useEffect } from "react";
import { useParams } from "react-router-dom";
import FormularioProyecto from "../../components/FormularioProyecto";
import ModalConfirm from "../../components/ModalConfirm";
import useProyectos from "../../hooks/useProyectos";

const EditarProyecto = () => {
  const {
    mostrarModalConfirm,
    proyecto,
    selectProyecto,
    cargando,
    setMostrarModalConfirm,
  } = useProyectos();
  const { id } = useParams();

  useEffect(() => {
    selectProyecto(id);
  }, []);

  const { nombre } = proyecto;

  const handleClick = () => {
    setMostrarModalConfirm(true);
  };

  return cargando ? (
    <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-slate-200 h-10 w-10"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-slate-200 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-200 rounded col-span-2"></div>
              <div className="h-2 bg-slate-200 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <>
      <div className="p-5 flex justify-between">
        <h1 className="font-black text-4xl">Editar proyecto: {nombre}</h1>
        <div className="flex items-center gap-2 text-gray-500 hover:text-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          {/* <Link to={`/proyectos/editar/${params.id}`}>Editar</Link> */}
          <button className="uppercase font-bold" onClick={handleClick}>
            Eliminar
          </button>
        </div>
      </div>
      <div className="mt-10 flex justify-center">
        <FormularioProyecto />
      </div>
      {mostrarModalConfirm && <ModalConfirm text={"¿Deseas eliminar este proyecto?"}/>}
    </>
  );
};

export default EditarProyecto;
