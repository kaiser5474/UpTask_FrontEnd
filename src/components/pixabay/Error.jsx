import React from "react";

const Error = ({ mensaje }) => {
  return (
    <div className="my-3 p-3 text-center text-red-600 uppercase font-bold">{mensaje}</div>
  );
};

export default Error;
