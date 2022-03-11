import FormularioColaborador from "../../components/FormularioColaborador";

const NuevoColaborador = () => {
  return (
    <>
      <h1 className="font-black text-4xl">Añadir Colaborador(a)</h1>
      <div className="mt-10 flex justify-center">
        <FormularioColaborador />
      </div>
    </>
  );
};

export default NuevoColaborador;
