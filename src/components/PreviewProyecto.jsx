import React from "react";
import { Link } from "react-router-dom";

const PreviewProyecto = ({ proyecto }) => {
  const { nombre, cliente, _id } = proyecto;
  return (
    <div className="border-b p-5 flex">
      <p className="flex-1">
        {nombre}
        <span className='text-xs text-gray-500'> {cliente}</span>
      </p>
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
