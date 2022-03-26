import { useEffect, useState } from "react";
import useProyectos from "../../hooks/useProyectos";
import useAdmin from "../../hooks/useAdmin";
import { Link, useParams } from "react-router-dom";
import ModalFormularioTareas from "../../components/ModalFormularioTarea";
import Tarea from "../../components/Tarea";
import Alerta from "../../components/Alerta";
import CargandoDocumento from "../../components/CargandoDocumento";
import Colaborador from "../../components/Colaborador";
import io from "socket.io-client";
import DnD from "../../components/DnD";

let socket;

const Proyecto = () => {
  const {
    proyecto,
    selectProyecto,
    cargando,
    cargandoTarea,
    handleModalTarea,
    tareas,
    alertaProyecto,
    colaboradores,
    submitTareaSocket,
    deleteTareaSocket,
    updateTareaSocket,
    completarTareaSocket,
    selectTareasByProyecto,
    selectColaboradoresByProyecto,
  } = useProyectos();

  const admin = useAdmin();
  const { id } = useParams();

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.emit("abrir proyecto", id);
    selectProyecto(id);
    selectTareasByProyecto(id);
    selectColaboradoresByProyecto(id);
  }, []);

  useEffect(() => {
    socket.on("tarea agregada", (tareaNueva) => {
      if (tareaNueva.proyecto === proyecto._id) {
        submitTareaSocket(tareaNueva);
      }
    });

    socket.on("tarea eliminada", (tareaEliminada) => {
      if (tareaEliminada.proyecto === proyecto._id) {
        deleteTareaSocket(tareaEliminada);
      }
    });

    socket.on("tarea editada", (tareaEditada) => {
      if (tareaEditada.proyecto === proyecto._id) {
        updateTareaSocket(tareaEditada);
      }
    });

    socket.on("tarea completada", (tareaCompletada, msg) => {
      if (tareaCompletada.proyecto === proyecto._id) {
        completarTareaSocket(tareaCompletada);
      }
    });
  });

  const { nombre } = proyecto;

  const handleClick = () => {
    handleModalTarea();
  };

  return cargando && cargandoTarea ? (
    <CargandoDocumento />
  ) : (
    <>
      <DnD className="" />
      <div className="p-5 flex justify-between">
        <h1 className="font-black text-4xl">{nombre}</h1>
        {admin && (
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
            {/* <Link to={`/proyectos/editar/${id}`}>Editar</Link> */}
            <Link to={`../editar/${id}`} className="uppercase font-bold">
              Editar
            </Link>
          </div>
        )}
      </div>
      {admin && (
        <button
          type="button"
          className="flex gap-2 items-center justify-center text-sm px-5 py-3 mt-5 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white "
          onClick={handleClick}
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
      )}
      <p className="font-bold text-xl mt-10">Tareas del proyecto </p>
      {alertaProyecto.msg && <Alerta alerta={alertaProyecto} />}
      <div className="bg-white shadow mt-10 rounded-lg">
        {tareas?.length > 0 ? (
          tareas.map(
            (tarea) =>
              proyecto?._id === tarea?.proyecto && (
                <Tarea key={tarea._id} tarea={tarea} />
              )
          )
        ) : (
          <p className="text-center my-5 p-10">
            No hay tareas en este proyecto
          </p>
        )}
      </div>

      {admin && (
        <>
          <div className="flex items-center justify-between mt-8 ">
            <p className="font-bold text-xl mt-10">Colaboradores </p>
            <Link
              to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
              className="text-gray-400 uppercase font-bold hover:text-black"
            >
              Añadir
            </Link>
          </div>
          <div className="bg-white shadow mt-10 rounded-lg">
            {colaboradores?.length > 0 ? (
              colaboradores.map((colaborador) => (
                <Colaborador
                  key={colaborador._id}
                  colaborador={colaborador}
                  proyectoId={id}
                />
              ))
            ) : (
              <p className="text-center my-5 p-10">
                No hay colaboradores en este proyecto
              </p>
            )}
          </div>
        </>
      )}
      <ModalFormularioTareas />
    </>
  );
};

export default Proyecto;
