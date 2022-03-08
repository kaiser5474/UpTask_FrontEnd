import { useEffect, useState } from "react";
import useProyectos from "../../hooks/useProyectos";
import { Link, useParams } from "react-router-dom";
import ModalFormularioTareas from "../../components/ModalFormularioTarea";
import Tarea from "../../components/Tarea";

const Proyecto = () => {
  const {
    proyecto,
    selectProyecto,
    cargando,
    cargandoTarea,
    handleModalTarea,
    selectTareasByProyecto,
    tareas,
  } = useProyectos();
  const { id } = useParams();

  useEffect(() => {
    selectProyecto(id);
    selectTareasByProyecto(id);
  }, []);

  const { nombre } = proyecto;
  console.log(tareas);

  return cargando && cargandoTarea ? (
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
        <h1 className="font-black text-4xl">{nombre}</h1>
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
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
          {/* <Link to={`/proyectos/editar/${params.id}`}>Editar</Link> */}
          <Link to={`../editar/${id}`} className="uppercase font-bold">
            Editar
          </Link>
        </div>
      </div>
      <button
        type="button"
        className="flex gap-2 items-center justify-center text-sm px-5 py-3 mt-5 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white "
        onClick={handleModalTarea}
      >
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
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Nueva Tarea
      </button>
      <p className="font-bold text-xl mt-10">Tareas del proyecto </p>
      <div className="bg-white shadow mt-10 rounded-lg">
        {tareas?.length > 0 ? (
          tareas.map((tarea) => <Tarea key={tarea._id} tarea={tarea} />)
        ) : (
          <p className="text-center my-5 p-10">
            No hay tareas en este proyecto
          </p>
        )}
      </div>
      <ModalFormularioTareas />
    </>
  );
};

export default Proyecto;
