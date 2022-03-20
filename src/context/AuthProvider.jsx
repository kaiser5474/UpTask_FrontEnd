import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(false);
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  let navigate = useNavigate();

  useEffect(() => {
    const autenticarUsuario = async () => {
      setCargando(true);
      if (!token) {
        setCargando(false);
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await clienteAxios(`/usuarios/perfil`, config);
        setAuth(data);
        navigate("/proyectos");
      } catch (error) {
        console.log(error.response.data.msg);
      } finally {
        setCargando(false);
      }
    };
    autenticarUsuario();
  }, []);

  const cerrarSesion = () => {
    setAuth({});
    setCargando(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        cargando,
        setAuth,
        cerrarSesion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
