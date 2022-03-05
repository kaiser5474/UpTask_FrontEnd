import { useState } from "react";
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";

const FormularioProyecto = () => {
  const { alertaProyecto, setAlertaProyecto, createProyecto } =
    useProyectos();
  //hooks
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [cliente, setCliente] = useState("");

  //funciones
  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([nombre, descripcion, fecha, cliente].includes("")) {
      return setAlertaProyecto({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
    }
    await createProyecto({
      nombre,
      descripcion,
      fecha,
      cliente,
    });
    //Limpiando el formulario
    setNombre("");
    setCliente("");
    setDescripcion("");
    setFecha("");
  };
  return (
    <>
      <div className="lg:w-3/4">
        {alertaProyecto.msg && <Alerta alerta={alertaProyecto} />}
      </div>
      <form
        className="mt-5 bg-white px-5 py-10 rounded-md lg:w-3/4"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="uppercase font-bold text-gray-700" htmlFor="nombre">
            Nombre Proyecto
          </label>
          <input
            type="text"
            id="nombre"
            placeholder="Nombre del proyecto"
            className="bg-gray-50 w-full p-2 mt-2 mb-2 border-2"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div>
          <label
            className="uppercase font-bold text-gray-700"
            htmlFor="descripcion"
          >
            Descripción
          </label>
          <textarea
            id="descripcion"
            placeholder="Descripción del proyecto"
            className="bg-gray-50 w-full p-2 mt-2 mb-2 border-2"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>
        <div>
          <label className="uppercase font-bold text-gray-700" htmlFor="fecha">
            Fecha de entrega
          </label>
          <input
            type="date"
            id="fecha"
            className="bg-gray-50 w-full p-2 mt-2 mb-2 border-2"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        <div>
          <label
            className="uppercase font-bold text-gray-700"
            htmlFor="cliente"
          >
            Cliente
          </label>
          <input
            type="text"
            id="cliente"
            placeholder="Cliente del proyecto"
            className="bg-gray-50 w-full p-2 mt-2 mb-2 border-2"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Crear Proyecto"
          className="w-full p-2 bg-sky-600 mt-4 text-white font-bold uppercase rounded-md cursor-pointer hover:bg-sky-700 transition-colors"
        />
      </form>
    </>
  );
};

export default FormularioProyecto;
