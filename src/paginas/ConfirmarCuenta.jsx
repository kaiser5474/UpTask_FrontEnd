import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import Alerta from "../components/Alerta";

const ConfirmarCuenta = () => {
  const [alerta, setAlerta] = useState({});
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const params = useParams();
  const { id } = params;
  useEffect(() => {
    const confirmaCuenta = async () => {
      try {
        const respuesta = await clienteAxios(
          `/usuarios/confirmar/${id}`
        );
        setAlerta({
          msg: respuesta.data.msg,
          error: false,
        });
        setCuentaConfirmada(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    confirmaCuenta();
  }, []);

  return (
    <>
      <h1 className="text-sky-600 font-black text-4xl text-center">
        Confirma tu cuenta y comienza a crear tus{" "}
        <span className="text-slate-700">Proyectos</span>
      </h1>
      <div className="bg-white mt-20 md:mt-10 shadow-lg px-8 py-10 rounded-xl">
        {alerta.msg && <Alerta alerta={alerta} />}
        {cuentaConfirmada && (
          <Link
            to="/"
            className="block text-center my-4 text-slate-500 text-sm uppercase"
          >
            Inicia sesión
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmarCuenta;
