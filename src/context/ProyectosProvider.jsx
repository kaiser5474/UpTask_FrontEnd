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
  const [colaborador, setColaborador] = useState({});
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    const selectProyectos = async () => {
      try {
        const { error, config } = configAndTokenToAxios();
        if (error) {
          return;
        }
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
      const { error, config } = configAndTokenToAxios();
      if (error) {
        return;
      }
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
      const { error, config } = configAndTokenToAxios();
      if (error) {
        return;
      }
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
      const { error, config } = configAndTokenToAxios();
      if (error) {
        return;
      }
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
      const { error, config } = configAndTokenToAxios();
      if (error) {
        return;
      }
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
      const { error, config } = configAndTokenToAxios();
      if (error) {
        return;
      }
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
    try {
      const { error, config } = configAndTokenToAxios();
      if (error) {
        return;
      }
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
    try {
      const { error, config } = configAndTokenToAxios();
      if (error) {
        return;
      }
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
    try {
      const { error, config } = configAndTokenToAxios();
      if (error) {
        return;
      }
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

  const submitColaborador = async (email) => {
    try {
      setCargando(true);
      const { error, config } = configAndTokenToAxios();
      if (error) {
        return;
      }
      const { data } = await clienteAxios.post(
        `/proyectos/colaboradores`,
        { email },
        config
      );
      setColaborador(data.usuario);
      setAlertaProyecto({});
    } catch (error) {
      setAlertaProyecto({
        msg: error.response.data.msg,
        error: true,
      });
      setColaborador({});
    } finally {
      setCargando(false);
    }
  };

  const createColaborador = async () => {
    const { _id } = colaborador;
    try {
      setCargando(true);
      const { error, config } = configAndTokenToAxios();
      if (error) {
        return;
      }
      const { data } = await clienteAxios.post(
        `/proyectos/colaborador/${proyecto._id}`,
        { _id },
        config
      );
      setAlertaProyecto({
        msg: data.msg,
        error: false,
      });
      setColaborador({});
      setTimeout(() => {
        setAlertaProyecto({});
      }, 3000);
    } catch (error) {
      setAlertaProyecto({
        msg: error.response.data.msg,
        error: true,
      });
    } finally {
      setCargando(false);
    }
  };

  const configAndTokenToAxios = () => {
    const token = localStorage.getItem("token");
    let error = false;
    if (!token) {
      error = true;
      return {
        config: "",
        error,
      };
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return {
      config,
      error,
    };
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
        colaborador,
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
        submitColaborador,
        setColaborador,
        createColaborador,
      }}
    >
      {children}
    </ProyectosContext.Provider>
  );
};

export { ProyectosProvider };
export default ProyectosContext;
