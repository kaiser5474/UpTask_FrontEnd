import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";
import io from "socket.io-client";

let socket;

const ProyectosContext = createContext();

const ProyectosProvider = ({ children }) => {
  //hooks
  const [proyectos, setProyectos] = useState([]);
  const [proyecto, setProyecto] = useState({});
  const [alertaProyecto, setAlertaProyecto] = useState({});
  const [cargando, setCargando] = useState(false);
  const [cargandoTarea, setCargandoTarea] = useState(false);
  const [mostrarModalConfirm, setMostrarModalConfirm] = useState(false);
  const [mostrarModalConfirmTarea, setMostrarModalConfirmTarea] =
    useState(false);
  const [mostrarModalConfirmColaborador, setMostrarModalConfirmColaborador] =
    useState(false);
  const [mostrarModalFormularioTarea, setMostrarModalFormularioTarea] =
    useState(false);
  const [tareas, setTareas] = useState([]);
  const [tarea, setTarea] = useState({});
  const [colaborador, setColaborador] = useState({});
  const [colaboradores, setColaboradores] = useState([]);
  const [buscador, setBuscador] = useState(false);

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

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
  }, []);

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
        `/proyectos/${proyecto._id}`,
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

  //funciones de Tareas
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
      setTimeout(() => {
        setAlertaProyecto({});
      }, 3000);

      //SOCKET IO
      socket.emit("nueva tarea", data.tarea);
      setTarea({});
    } catch (error) {}
  };

  const handleModalEditTarea = (tarea) => {
    setTarea(tarea);
  };

  const editTarea = async (tarea) => {
    try {
      const { _id } = tarea;
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
      setAlertaProyecto({
        msg: data.msg,
        error: false,
      });

      //SOCKET IO
      socket.emit("editar tarea", data.tarea);
      setTimeout(() => {
        setAlertaProyecto({});
      }, 3000);
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
      setMostrarModalConfirmTarea(false);
      const { data } = await clienteAxios.delete(`/tareas/${id}`, config);

      setAlertaProyecto({
        msg: data.msg,
        error: false,
      });

      //SOCKET IO
      socket.emit("eliminar tarea", data.tarea);
      setTimeout(() => {
        setAlertaProyecto({});
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const completarTarea = async (_id) => {
    try {
      const { error, config } = configAndTokenToAxios();
      if (error) {
        return;
      }
      const { data } = await clienteAxios.post(
        `tareas/estado/${_id}`,
        {},
        config
      );
      //SOCKET IO
      socket.emit("completar tarea", data.tareaActualizada);
    } catch (error) {
      console.log(error);
    }
  };
  //Fin de funciones de tareas

  //Funciones de Colaboradores
  const submitColaborador = async (email) => {
    try {
      setCargando(true);
      const { error, config } = configAndTokenToAxios();
      if (error) {
        return;
      }
      const { data } = await clienteAxios.post(
        `/proyectos/colaborador`,
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

  const selectColaboradoresByProyecto = async (id) => {
    setCargandoTarea(true);
    try {
      const { error, config } = configAndTokenToAxios();
      if (error) {
        return;
      }
      const { data } = await clienteAxios(
        `/proyectos/colaboradores/${id}`,
        config
      );
      setColaboradores(data.colaboradores);
    } catch (error) {
      setAlertaProyecto({
        msg: error.response.data.msg,
        error: true,
      });
    } finally {
      setCargandoTarea(false);
      setTimeout(() => {
        setAlertaProyecto({});
      }, 3000);
    }
  };

  const deleteColaborador = async (id, idColaborador) => {
    try {
      const { error, config } = configAndTokenToAxios();
      if (error) {
        return;
      }
      //${id} se refiere al Proyecto
      const { data } = await clienteAxios.post(
        `/proyectos/eliminar-colaborador/${id}`,
        { idColaborador },
        config
      );
      const colaboradoresActualizados = colaboradores.filter((colaborador) =>
        colaborador._id !== idColaborador ? colaborador : null
      );
      setColaboradores(colaboradoresActualizados);
      setAlertaProyecto({
        msg: data.msg,
        error: false,
      });
      setTimeout(() => {
        setAlertaProyecto({});
      }, 3000);
    } catch (error) {
      setAlertaProyecto({
        msg: error.response.data.msg,
        error: true,
      });
    } finally {
      setCargandoTarea(false);
      setTimeout(() => {
        setAlertaProyecto({});
      }, 3000);
    }
  };
  //Fin de funciones de Colaboradores

  const handleBuscador = () => {
    setBuscador(!buscador);
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

  //Funciones SOCKET IO
  const submitTareaSocket = (tareaInsertada) => {
    setTareas([...tareas, tareaInsertada]);
  };

  const deleteTareaSocket = (tareaEliminada) => {
    const tareasActualizadas = tareas.filter((tareaState) =>
      tareaEliminada._id !== tareaState._id ? tareaState : null
    );
    setTareas(tareasActualizadas);
  };

  const updateTareaSocket = (tareaEditada) => {
    const tareasActualizadas = tareas.map((tareaState) =>
      tareaEditada._id === tareaState._id ? tareaEditada : tareaState
    );
    setTareas(tareasActualizadas);
  };

  const completarTareaSocket = (tareaCompletada) => {
    const tareasActualizadas = tareas.map((tarea) =>
      tarea._id === tareaCompletada._id ? tareaCompletada : tarea
    );
    setTareas(tareasActualizadas);
  };

  //Funcion para cerrar sesion
  const cerrarSesionProyectos = () => {
    setProyectos([]);
    setProyecto({});
    setTareas([]);
    setColaboradores([]);
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
        mostrarModalConfirmColaborador,
        mostrarModalFormularioTarea,
        mostrarModalConfirmTarea,
        tareas,
        tarea,
        colaborador,
        colaboradores,
        buscador,
        setProyectos,
        setProyecto,
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
        selectColaboradoresByProyecto,
        deleteColaborador,
        completarTarea,
        setMostrarModalConfirmColaborador,
        handleBuscador,
        submitTareaSocket,
        setMostrarModalConfirmTarea,
        setColaboradores,
        deleteTareaSocket,
        updateTareaSocket,
        completarTareaSocket,
      }}
    >
      {children}
    </ProyectosContext.Provider>
  );
};

export { ProyectosProvider };
export default ProyectosContext;
