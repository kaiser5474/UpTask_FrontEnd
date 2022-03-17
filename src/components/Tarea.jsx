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
      <div className="border-b p-5 flex justify-between items-center">
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
          {admin && (
            <button
              className="bg-indigo-600 px-3 py-2 text-white font-bold uppercase rounded-md text-xs"
              onClick={handleEditar}
            >
              Editar
            </button>
          )}
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
              className="bg-red-600 px-4 py-3 text-white font-bold uppercase rounded-md text-xs"
              onClick={handleEliminar}
            >
              Eliminar
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
