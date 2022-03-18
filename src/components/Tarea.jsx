import { formatearFechaWeekDay } from "../helpers";
import useProyectos from "../hooks/useProyectos";
import useAdmin from "../hooks/useAdmin";
import ModalConfirmTarea from "./ModalConfirmTarea";
import { useState } from "react";

const Tarea = ({ tarea }) => {
  //hooks
  const [eliminarTarea, setEliminarTarea] = useState("");

  const {
    descripcion,
    nombre,
    prioridad,
    fechaEntrega,
    estado,
    _id,
    completado,
  } = tarea;
  const {
    handleModalTarea,
    handleModalEditTarea,
    mostrarModalConfirmTarea,
    setMostrarModalConfirmTarea,
    completarTarea,
  } = useProyectos();
  const admin = useAdmin();

  const handleEditar = () => {
    handleModalTarea();
    handleModalEditTarea(tarea);
  };

  const handleEliminar = () => {
    setEliminarTarea(tarea._id);
    setMostrarModalConfirmTarea(true);
  };
  return (
    <>
      <div className="border-b p-5 flex justify-between items-center gap-2">
        <div className="flex flex-col items-start">
          <p className="mb-1 text-xl">{nombre}</p>
          <p className="mb-1 text-sm text-gray-500 uppercase">{descripcion}</p>
          <p className="mb-1 text-sm">{formatearFechaWeekDay(fechaEntrega)}</p>
          <p className="mb-1 text-gray-600">Prioridad: {prioridad}</p>
          {estado ? (
            <p className="text-xs bg-green-500 text-white p-1 rounded-md">
              Completada por {completado.nombre}
            </p>
          ) : (
            <p className="text-xs bg-red-500 text-white p-1 rounded-md">
              Por Completar
            </p>
          )}
        </div>
        <div className="flex flex-col lg:flex-row gap-2">
          <button
            className={`${
              estado ? "bg-sky-600" : "bg-gray-600"
            } px-4 py-3 text-white font-bold uppercase rounded-md text-xs`}
            onClick={() => completarTarea(_id)}
          >
            {estado ? "Completa" : "Incompleta"}
          </button>
          {admin && (
            <button
              className="bg-indigo-600 px-3 py-2 text-white font-bold uppercase rounded-md text-xs"
              onClick={handleEditar}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-pencil-square"
                viewBox="0 0 16 16"
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path
                  fillRule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                />
              </svg>
            </button>
          )}

          {admin && (
            <button
              className="bg-red-600 px-4 py-3 text-white font-bold uppercase rounded-md text-xs"
              onClick={handleEliminar}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                <path
                  fillRule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      {mostrarModalConfirmTarea && eliminarTarea === tarea._id && (
        <ModalConfirmTarea text={"Desea eliminar la tarea"} id={_id} />
      )}
    </>
  );
};

export default Tarea;
