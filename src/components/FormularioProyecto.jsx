import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";

const FormularioProyecto = () => {
  const {
    proyecto,
    alertaProyecto,
    setAlertaProyecto,
    createProyecto,
    updateProyecto,
  } = useProyectos();

  const params = useParams();
  //hooks
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaEntrega, setFechaEntrega] = useState("");
  const [cliente, setCliente] = useState("");

  useEffect(() => {
    if (typeof params.id !== "undefined" || params.id) {
      setNombre(proyecto.nombre);
      setDescripcion(proyecto.descripcion);
      setFechaEntrega(proyecto.fechaEntrega?.split("T")[0]);
      setCliente(proyecto.cliente);
    } else {
      setNombre("");
      setDescripcion("");
      setFechaEntrega("");
      setCliente("");
    }
  }, [params]);

  //funciones del CRUD
  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([nombre, descripcion, fechaEntrega, cliente].includes("")) {
      return setAlertaProyecto({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
    }
    await createProyecto({
      nombre,
      descripcion,
      fechaEntrega,
      cliente,
    });
    //Limpiando el formulario
    setNombre("");
    setCliente("");
    setDescripcion("");
    setFechaEntrega("");
  };

  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    if ([nombre, descripcion, fechaEntrega, cliente].includes("")) {
      return setAlertaProyecto({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
    }
    updateProyecto({
      _id: proyecto._id,
      nombre,
      descripcion,
      fechaEntrega,
      cliente,
      creador: proyecto.creador,
    });
  };

  return (
    <>
      <form
        className="mt-4 bg-white px-5 py-6 rounded-md lg:w-3/4"
        onSubmit={
          typeof params.id !== "undefined" || params.id
            ? handleSubmitUpdate
            : handleSubmit
        }
      >
        <div className="mb-10">
          {alertaProyecto.msg && <Alerta alerta={alertaProyecto} />}
        </div>
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
            value={fechaEntrega}
            onChange={(e) => setFechaEntrega(e.target.value)}
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
          value={
            typeof params.id !== "undefined" || params.id
              ? "Actualizar Proyecto"
              : "Crear Proyecto"
          }
          className="w-full p-2 bg-sky-600 mt-4 text-white font-bold uppercase rounded-md cursor-pointer hover:bg-sky-700 transition-colors"
        />
      </form>
    </>
  );
};

export default FormularioProyecto;
