import React from "react";
import useProyectos from "../../hooks/useProyectos";

const Proyectos = () => {
  const { proyectos } = useProyectos();
  console.log(proyectos );
  return (
    <>
      <h1 className="font-black text-4xl">Proyectos</h1>
      <div></div>
    </>
  );
};

export default Proyectos;
