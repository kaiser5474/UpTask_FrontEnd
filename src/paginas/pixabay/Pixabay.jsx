import { useEffect, useState } from "react";
import Formulario from "../../components/pixabay/Formulario";
import ListadoImagenes from "../../components/pixabay/ListadoImagenes";

const pixabay = () => {
  //hooks
  const [busqueda, setBusqueda] = useState("");
  const [imagenes, setImagenes] = useState([]);
  const [imageType, setImageType] = useState("all");
  const [botonBuscar, setBotonBuscar] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPagina, setTotalPagina] = useState(1);
  useEffect(() => {
    // if (busqueda === "" || !botonBuscar) return;
    if (busqueda === "") return;
    const consultarApi = async () => {
      const imagenesXPagina = 30;
      const key = "16062309-ec3637ebed45675de2b6022a9";
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&image_type=${imageType}&pretty=true&per_page${imagenesXPagina}&page=${paginaActual}`;
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      const totalHits = Math.ceil(resultado.totalHits / imagenesXPagina);
      setTotalPagina(totalHits);
      setImagenes(resultado.hits);

      const jumbotron = document.querySelector(".jumbotron");
      jumbotron.scrollIntoView({ behavior: "smooth" });
    };
    consultarApi();
    setBotonBuscar(false);
  }, [botonBuscar, paginaActual]);

  useEffect(() => {
    if (busqueda !== "") {
      const docNext = document.getElementById("next");
      const docPrev = document.getElementById("previous");
      // manejando el elemento next del paginador
      if (paginaActual == totalPagina) {
        docNext.classList.add(["disabled"]);
      } else {
        docNext.classList.remove(["disabled"]);
      }
      //manejando el elemento previos del paginador
      if (paginaActual == 1) {
        docPrev.classList.add(["disabled"]);
      } else {
        docPrev.classList.remove(["disabled"]);
      }
    }
  }, [paginaActual, totalPagina]);

  useEffect(() => {
    setPaginaActual(1);
    setTotalPagina(1);
  }, [botonBuscar]);

  //funciones
  const paginaAnterior = () => {
    setPaginaActual(paginaActual - 1);
  };

  const paginaSiguiente = () => {
    setPaginaActual(paginaActual + 1);
  };
  return (
    <div className="container mb-5 jumbotron">
      <div className="mb-10">
        <p className="text-center text-2xl font-bold uppercase mb-4">
          Buscador de imagenes
        </p>
        <Formulario
          setBusqueda={setBusqueda}
          setImageType={setImageType}
          setBotonBuscar={setBotonBuscar}
        />
      </div>
      <div className="mb-10">
        <ListadoImagenes imagenes={imagenes} />
      </div>
      {/*Botones previous and next */}
      {
        busqueda != "" && (
          <div className="flex gap-2 justify-center">
            <div className="page-item disabled" id="previous">
              <a
                className="uppercase font-bold border-2 border-gray-500 p-2 rounded-md hover:cursor-pointer hover:bg-sky-600 hover:text-white hover:border-gray-400"
                tabIndex="-1"
                onClick={paginaAnterior}
                disabled
              >
                Anterior
              </a>
            </div>
            <div className="page-item" id="next">
              <a
                className="uppercase font-bold border-2 border-gray-500 p-2 rounded-md hover:cursor-pointer hover:transition hover:bg-sky-600 hover:text-white hover:border-gray-400"
                onClick={paginaSiguiente}
              >
                Siguiente
              </a>
            </div>
          </div>
        )
        /*Fin de Botones previous and next */
      }
    </div>
  );
};

export default pixabay;
