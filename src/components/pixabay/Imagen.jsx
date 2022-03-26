import React from "react";

const Imagen = ({ imagen }) => {
  const { comments, largeImageURL, likes, previewURL, views, tags, downloads } =
    imagen;
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <div className="card">
        <img src={previewURL} alt={tags} className="" />
      </div>
      <div className="card-body">
        <span className="card-text">{likes} Me gusta</span>
        <p className="card-text">{views} Vistas</p>
        <p className="card-text">{comments} Comentarios</p>
        <p className="card-text">{downloads} Descargas</p>
      </div>
      <div className="text-center mt-5 mb-5 ">
        <a
          href={largeImageURL}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-sky-600 w-full p-2 rounded-md text-white uppercase"
        >
          Ver Imagen
        </a>
      </div>
    </div>
  );
};

export default Imagen;
