import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);
  let navigate = useNavigate();
  useEffect(() => {
    const autenticarUsuario = async () => {
      const token =
        //localStorage.getItem("token") || sessionStorage.getItem("token");
        localStorage.getItem("token");
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
        const respuesta = await clienteAxios(`/usuarios/perfil`, config);
        setAuth(respuesta.data);
        navigate("/proyectos");
      } catch (error) {
        console.log(error.response.data.msg);
        setAuth({});
      }
      setCargando(false);
    };
    autenticarUsuario();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        cargando,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
