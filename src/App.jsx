import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import ConfirmarCuenta from "./paginas/usuarios/ConfirmarCuenta";
import Login from "./paginas/usuarios/Login";
import NuevoPassword from "./paginas/usuarios/NuevoPassword";
import OlvidePassword from "./paginas/usuarios/OlvidePassword";
import Registrar from "./paginas/usuarios/Registrar";
import { AuthProvider } from "./context/AuthProvider";
import { ProyectosProvider } from "./context/ProyectosProvider";
import RutaProtegida from "./layouts/RutaProtegida";
import Proyectos from "./paginas/proyectos/Proyectos";
import Proyecto from "./paginas/proyectos/Proyecto";
import NuevoProyecto from "./paginas/proyectos/NuevoProyecto";
import EditarProyecto from "./paginas/proyectos/EditarProyecto";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProyectosProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<Registrar />} />
              <Route path="olvide-password" element={<OlvidePassword />} />
              <Route
                path="olvide-password/:token"
                element={<NuevoPassword />}
              />
              <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
            </Route>
            <Route path="/proyectos" element={<RutaProtegida />}>
              <Route index element={<Proyectos />} />
              <Route path="crear-proyecto" element={<NuevoProyecto />} />
              <Route path="editar/:id" element={<EditarProyecto />} />
              <Route path=":id" element={<Proyecto />} />
            </Route>
          </Routes>
        </ProyectosProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
