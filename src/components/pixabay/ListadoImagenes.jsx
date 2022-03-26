import React from "react";
import Imagen from "./Imagen";

const ListadoImagenes = ({ imagenes }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {imagenes.map((imagen) => (
        <Imagen imagen={imagen} key={imagen.id} />
      ))}
    </div>
  );
};

export default ListadoImagenes;
