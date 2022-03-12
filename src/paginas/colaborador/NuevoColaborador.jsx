import CargandoDocumento from "../../components/CargandoDocumento";
import FormularioColaborador from "../../components/FormularioColaborador";
import useProyectos from "../../hooks/useProyectos";
// import { MemoryRouter } from "react-router-dom"

const NuevoColaborador = () => {
  const { proyecto, colaborador, cargando, createColaborador } = useProyectos();
  return (
    <>
      <h1 className="font-black text-4xl">
        Añadir Colaborador(a) al Proyecto: {proyecto.nombre}
      </h1>
      <div className="mt-10 flex justify-center">
        <FormularioColaborador />
      </div>
      {cargando ? (
        <div className="mt-5">
          <CargandoDocumento />
        </div>
      ) : (
        colaborador._id && (
          <div className="flex justify-center mt-10 ">
            <div className="bg-white py-10 px-5 md:w-2/3 rounded-md shadow">
              <h2 className="text-center mb-10 text-2xl font-bold">
                Resultado:
              </h2>
              <div className="flex justify-between items-center">
                <p>{colaborador.nombre}</p>
                <button
                  className="bg-slate-500 px-5 py-2 rounded-md text-white font-bold uppercase text-sm"
                  onClick={() => createColaborador()}
                >
                  {" "}
                  Agregar al proyecto
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default NuevoColaborador;
