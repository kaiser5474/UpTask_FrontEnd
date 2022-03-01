import React from "react";

const Alerta = ({ alerta }) => {
  return (
    <div
      className={`${
        alerta.error ? "from-red-400 to-red-600" : "from-sky-400 to-sky-600"
      } p-2 text-white font-bold text-center mt-5 bg-gradient-to-br uppercase rounded-md`}
    >
      {alerta.msg}
    </div>
  );
};

export default Alerta;
