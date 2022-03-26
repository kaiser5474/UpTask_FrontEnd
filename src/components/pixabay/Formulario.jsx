import React, { useState } from "react";
import Error from "./Error";

const Formulario = ({ setBusqueda, setImageType, setBotonBuscar }) => {
  const [termino, setTermino] = useState("");
  const [error, setError] = useState(false);
  //const [imageType, setImageType] = useState("all");
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (termino.trim() === "") {
      setError(true);
      return;
    }
    setBusqueda(termino);
    setBotonBuscar(true);
    setError(false);
  };
  return (
    <>
      <form onSubmit={(e) => handleOnSubmit(e)}>
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex-1">
            <input
              type="text"
              className="px-8 py-3 rounded-md w-full"
              placeholder="Busca una imagen, ejemplo: futbol o cafe"
              onChange={(e) => {
                setTermino(e.target.value);
              }}
            />
          </div>
          <div className="">
            <select
              className="px-8 py-3 rounded-md text-center text-gray-500"
              onChange={(e) => setImageType(e.target.value)}
            >
              <option value="all">Imagen</option>
              <option value="photo">Foto</option>
              <option value="illustration">Ilustrate</option>
              <option value="vector">Vector</option>
            </select>
          </div>
          <div className="">
            <input
              type="submit"
              className="bg-sky-700 px-8 py-3 rounded-md uppercase text-white font-bold hover:cursor-pointer "
              value="Buscar"
            />
          </div>
        </div>
        {error && <Error mensaje="Agrega un término de búsqueda" />}
      </form>
    </>
  );
};

export default Formulario;
