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
  const [cargandoTarea, setCargandoTarea] = useState(false);
  const [mostrarModalConfirm, setMostrarModalConfirm] = useState(false);
  const [mostrarModalFormularioTarea, setMostrarModalFormularioTarea] =
    useState(false);
  const [tareas, setTareas] = useState([]);
  const [tarea, setTarea] = useState({});
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

      setProyectos([...proyectos, data.proyectoAlmacenado]);
      setAlertaProyecto({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => {
        setAlertaProyecto({});
        navigate("/proyectos");
      }, 2500);
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

  const updateProyecto = async (proyecto) => {
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
      const { data } = await clienteAxios.put(
        `/proyectos/${proyecto}`,
        proyecto,
        config
      );
      const proyectosActualizados = proyectos.map((proyectoIter) =>
        proyectoIter._id === proyecto._id ? proyecto : proyectoIter
      );
      setProyectos(proyectosActualizados);
      setAlertaProyecto({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => {
        setAlertaProyecto({});
        navigate("/proyectos");
      }, 2500);
    } catch (error) {
      setAlertaProyecto({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const deleteProyecto = async (id) => {
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
      const { data } = await clienteAxios.delete(`/proyectos/${id}`, config);
      const proyectosActualizados = proyectos.filter((proyectoIter) =>
        proyectoIter._id !== id ? proyectoIter : null
      );
      setProyectos(proyectosActualizados);
      setAlertaProyecto({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => {
        setAlertaProyecto({});
        navigate("/proyectos");
      }, 2500);
    } catch (error) {
      setAlertaProyecto({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const selectTareasByProyecto = async (id) => {
    setCargandoTarea(true);
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
      const { data } = await clienteAxios(`/tareas/proyecto/${id}`, config);
      setTareas(data.tareas);
    } catch (error) {
      setAlertaProyecto({
        msg: error.response.data.msg,
        error: true,
      });
    } finally {
      setCargandoTarea(false);
    }
  };

  const handleModalTarea = () => {
    setMostrarModalFormularioTarea(!mostrarModalFormularioTarea);
    setTarea({});
  };

  const createTarea = async (tarea) => {
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
    try {
      const { data } = await clienteAxios.post(`/tareas`, tarea, config);
      setAlertaProyecto({
        msg: data.msg,
        error: false,
      });
      setTareas([...tareas, data.tarea]);
      setTimeout(() => {
        setAlertaProyecto({});
      }, 2500);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalEditTarea = (tarea) => {
    setTarea(tarea);
  };

  const editTarea = async (tarea) => {
    const token = localStorage.getItem("token");
    const { _id } = tarea;
    if (!token) {
      return;
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await clienteAxios.put(`/tareas/${_id}`, tarea, config);
      const tareasActualizadas = tareas.map((tareaState) =>
        tarea._id === tareaState._id ? tarea : tareaState
      );
      setTareas(tareasActualizadas);
      handleModalTarea();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTarea = async (id) => {
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
    try {
      const { data } = await clienteAxios.delete(`/tareas/${id}`, config);
      const tareasActualizadas = tareas.filter((tareaState) =>
        id !== tareaState._id ? tareaState : null
      );
      setTareas(tareasActualizadas);
      setMostrarModalConfirm(false);
      setAlertaProyecto({
        msg: data.msg,
        error: false,
      });
      setTimeout(() => {
        setAlertaProyecto({});
      }, 2500);
      //handleModalTarea();
    } catch (error) {
      console.log(error);
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
        cargandoTarea,
        mostrarModalConfirm,
        mostrarModalFormularioTarea,
        tareas,
        tarea,
        setProyectos,
        setAlertaProyecto,
        createProyecto,
        selectProyecto,
        cerrarSesionProyectos,
        updateProyecto,
        deleteProyecto,
        setMostrarModalConfirm,
        handleModalTarea,
        createTarea,
        selectTareasByProyecto,
        setTareas,
        handleModalEditTarea,
        editTarea,
        deleteTarea,
      }}
    >
      {children}
    </ProyectosContext.Provider>
  );
};

export { ProyectosProvider };
export default ProyectosContext;
