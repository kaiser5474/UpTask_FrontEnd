import PreviewProyecto from "../../components/PreviewProyecto";
import useProyectos from "../../hooks/useProyectos";

const Proyectos = () => {
  const { proyectos } = useProyectos();
  return (
    <>
      <h1 className="font-black text-4xl">Proyectos</h1>
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
