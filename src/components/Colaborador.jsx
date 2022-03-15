import useProyectos from "../hooks/useProyectos";
import ModalConfirmColaborador from "./ModalConfirmColaborador";

const Colaborador = ({ colaborador, proyectoId }) => {
  const { _id, nombre, email } = colaborador;
  const {
    handleModalTarea,
    handleModalEditTarea,
    mostrarModalConfirmColaborador,
    setMostrarModalConfirm,
    setMostrarModalConfirmColaborador,
  } = useProyectos();

  const handleEditar = () => {
    //handleModalTarea();
    //handleModalEditTarea(tarea);
  };

  const handleEliminar = () => {
    setMostrarModalConfirmColaborador(true);
  };
  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div>
        <p className="mb-1 text-xl">{nombre}</p>
        <p className="mb-1 text-sm text-gray-500">{email}</p>
      </div>
      <div className="flex gap-2">
        {/* <button
          className="bg-indigo-600 px-3 py-2 text-white font-bold uppercase rounded-md text-xs"
          onClick={handleEditar}
        >
          Editar
        </button> */}
        <button
          className="bg-red-600 px-4 py-3 text-white font-bold uppercase rounded-md text-xs"
          onClick={handleEliminar}
        >
          Eliminar
        </button>
        {mostrarModalConfirmColaborador && (
          <ModalConfirmColaborador
            text={"Desea eliminar el colaborador"}
            colaboradorId={_id}
          />
        )}
      </div>
    </div>
  );
};

export default Colaborador;
