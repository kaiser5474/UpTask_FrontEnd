import { useState } from "react";
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";

const FormularioColaborador = () => {
  //hooks
  const [email, setEmail] = useState("");
  const { alertaProyecto, setAlertaProyecto, submitColaborador } =
    useProyectos();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "") {
      setAlertaProyecto({
        msg: "Por favor ingresar email",
        error: true,
      });
      return;
    }
    submitColaborador(email);
  };

  const { msg } = alertaProyecto;
  return (
    <form
      className="bg-white py-10 px-5 md:w-2/3 rounded-md shadow"
      onSubmit={handleSubmit}
    >
      {msg && <Alerta alerta={alertaProyecto} />}
      <div className="mb-5">
        <label className="text-gray-700 uppercase" htmlFor="email">
          Email Colaborador
        </label>
        <input
          type="email"
          placeholder="Email del usuario"
          id="email"
          className="p-2 border-2 w-full mt-2 placeholder-gray-600 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <input
        type="submit"
        value="Buscar Colaborador"
        className="bg-sky-600 hover:bg-sky-700 w-full p-3 font-bold text-center text-white uppercase rounded-md cursor-pointer transition-colors"
      />
    </form>
  );
};

export default FormularioColaborador;
