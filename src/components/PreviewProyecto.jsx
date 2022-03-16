import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PreviewProyecto = ({ proyecto }) => {
  const { nombre, cliente, _id, creador } = proyecto;
  const { auth } = useAuth();
  return (
    <div className="border-b p-5 flex justify-between">
      <div className="flex items-center gap-2">
        <p className="flex-1">
          {nombre}
          <span className="text-xs text-gray-500"> {cliente}</span>
        </p>
        {auth._id !== creador && (
          <p className="text-xs p-1 rounded-md bg-green-500 font-bold text-white">
            Colaborador
          </p>
        )}
      </div>
      <Link
        to={`${_id}`}
        className="uppercase text-gray-600 hover:text-gray-900 text-sm font-bold"
      >
        Ver Proyecto
      </Link>
    </div>
  );
};

export default PreviewProyecto;
