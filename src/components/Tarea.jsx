import { formatearFechaWeekDay } from "../helpers";

const Tarea = ({ tarea }) => {
  const { descripcion, nombre, prioridad, fechaEntrega, estado, _id } = tarea;
  //const nuevaFecha = fechaEntrega.split('T')[0].split('-')
  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div>
        <p className="mb-1 text-xl">{nombre}</p>
        <p className="mb-1 text-sm text-gray-500 uppercase">{descripcion}</p>
        <p className="mb-1 text-xl">{formatearFechaWeekDay(fechaEntrega)}</p>
        <p className="mb-1 text-gray-600">Prioridad: {prioridad}</p>
      </div>
      <div className="flex gap-2">
        <button className="bg-indigo-600 px-3 py-2 text-white font-bold uppercase rounded-md text-xs">
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
        <button className="bg-red-600 px-4 py-3 text-white font-bold uppercase rounded-md text-xs">
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Tarea;
