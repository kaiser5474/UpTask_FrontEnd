import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";

const ProyectosContext = createContext();

const ProyectosProvider = ({ children }) => {
  //hooks
  const [proyectos, setProyectos] = useState([]);
  const [proyecto, setProyecto] = useState({});
  const [alertaProyecto, setAlertaProyecto] = useState({});
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    const selectProyectos = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await clienteAxios("/proyectos", config);
        setProyectos(data.listadoProyectos);
      } catch (error) {
        setAlertaProyecto({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    selectProyectos();
  }, [auth]);

  //funciones
  const createProyecto = async (proyecto) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post("/proyectos", proyecto, config);

      setProyectos([...proyectos, data.proyectoAlmadenado]);
      setAlertaProyecto({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => {
        setAlertaProyecto({});
        navigate("/proyectos");
      }, 2000);
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
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios(`/proyectos/${id}`, config);
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

  const cerrarSesionProyectos = () => {
    setProyectos([]);
    setProyecto({});
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
        cerrarSesionProyectos,
      }}
    >
      {children}
    </ProyectosContext.Provider>
  );
};

export { ProyectosProvider };
export default ProyectosContext;
