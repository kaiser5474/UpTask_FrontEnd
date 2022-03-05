import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";

const ProyectosContext = createContext();

const ProyectosProvider = ({ children }) => {
  //hooks
  const [proyectos, setProyectos] = useState([]);
  const [proyecto, setProyecto] = useState({});
  const [alertaProyecto, setAlertaProyecto] = useState({});
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  //useEffect
  useEffect(() => {
    const selectProyectos = async () => {
      setProyectos([]);
      try {
        if (!token) return;
        const { data } = await clienteAxios("/proyectos", { headers });
        setProyectos(data.listadoProyectos);
      } catch (error) {
        setAlertaProyecto({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    selectProyectos();
  }, []);

  //funciones
  const createProyecto = async (proyecto) => {
    try {
      if (!token) return;
      const { data } = await clienteAxios.post("/proyectos", proyecto, {
        headers,
      });

      setProyectos([...proyectos, data.proyectoAlmadenado]);
      setAlertaProyecto({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => {
        setAlertaProyecto({});
        navigate("/proyectos");
      }, 5000);
    } catch (error) {
      setAlertaProyecto({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const selectProyecto = async (id) => {
    setCargando(true);
    try {
      if (!token) return;
      const { data } = await clienteAxios(`/proyectos/${id}`, { headers });
      console.log(data);
      setProyecto(data.proyecto);
    } catch (error) {
      setAlertaProyecto({
        msg: error.response.data.msg,
        error: true,
      });
    } finally {
      setCargando(false);
    }
  };

  return (
    <ProyectosContext.Provider
      value={{
        proyecto,
        proyectos,
        alertaProyecto,
        cargando,
        setProyectos,
        setAlertaProyecto,
        createProyecto,
        selectProyecto,
      }}
    >
      {children}
    </ProyectosContext.Provider>
  );
};

export { ProyectosProvider };
export default ProyectosContext;
