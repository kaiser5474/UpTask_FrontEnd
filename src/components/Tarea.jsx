import { formatearFechaWeekDay } from "../helpers";
import useProyectos from "../hooks/useProyectos";
import ModalConfirmTarea from "./ModalConfirmTarea";

const Tarea = ({ tarea }) => {
  const { descripcion, nombre, prioridad, fechaEntrega, estado, _id } = tarea;
  const {
    handleModalTarea,
    handleModalEditTarea,
    mostrarModalConfirm,
    setMostrarModalConfirm,
  } = useProyectos();

  const handleEditar = () => {
    handleModalTarea();
    handleModalEditTarea(tarea);
  };

  const handleEliminar = () => {
    setMostrarModalConfirm(true);
  };
  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div>
        <p className="mb-1 text-xl">{nombre}</p>
        <p className="mb-1 text-sm text-gray-500 uppercase">{descripcion}</p>
        <p className="mb-1 text-sm">{formatearFechaWeekDay(fechaEntrega)}</p>
        <p className="mb-1 text-gray-600">Prioridad: {prioridad}</p>
      </div>
      <div className="flex gap-2">
        <button
          className="bg-indigo-600 px-3 py-2 text-white font-bold uppercase rounded-md text-xs"
          onClick={handleEditar}
        >
          Editar
        </button>
        {estado ? (
          <button className="bg-sky-600 px-4 py-3 text-white font-bold uppercase rounded-md text-xs">
            Completa
          </button>
        ) : (
          <button className="bg-gray-600 px-4 py-3 text-white font-bold uppercase rounded-md text-xs">
            Incompleta
          </button>
        )}
        <button
          className="bg-red-600 px-4 py-3 text-white font-bold uppercase rounded-md text-xs"
          onClick={handleEliminar}
        >
          Eliminar
        </button>
        {mostrarModalConfirm && (
          <ModalConfirmTarea text={"Desea eliminar la tarea"} id={_id} />
        )}
      </div>
    </div>
  );
};

export default Tarea;
