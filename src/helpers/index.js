export const paraId = () => {
  const paraId =
    Date.now().toString() + Math.random(36).toString().substring(2);
  return paraId;
};

export const formatearFecha = (fecha) => {
  const fechaNueva = new Date(fecha);
  const opciones = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };
  return fechaNueva.toLocaleString("es-Es", opciones);
};

export const formatearFechaWeekDay = (fecha) => {
  const fechaNueva = new Date(fecha);
  const opciones = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  fechaNueva.setMinutes(
    fechaNueva.getMinutes() + fechaNueva.getTimezoneOffset()
  );
  return fechaNueva.toLocaleString("es-Es", opciones);
};

export const formatearNumero = (cantidad, currency = "USD") => {
  let text = cantidad.toLocaleString("en-US", {
    style: "currency",
    currency: currency,
  });
  return text;
};

export const obtenerDiferenciaYear = (year) => {
  return new Date().getFullYear() - year;
};

export const convertirEnteroToFloat2Decimales = (numero) => {
  return parseFloat(numero).toFixed(2);
};

export const PaisesSelect = () => {
  const OPCIONESPAISES = [
    { value: "ae", label: "Emiratos Arabes" },
    { value: "ar", label: "Argentina" },
    { value: "br", label: "Brasil" },
    { value: "ca", label: "Canadá" },
    { value: "co", label: "Colombia" },
    { value: "cu", label: "Cuba" },
    { value: "de", label: "Alemania" },
    { value: "fr", label: "Francia" },
    { value: "gb", label: "Reino Unido" },
    { value: "it", label: "Italia" },
    { value: "jp", label: "Japón" },
    { value: "mx", label: "México" },
    { value: "ru", label: "Rusia" },
    { value: "us", label: "Estados Unidos" },
    { value: "ve", label: "Venezuela" },
  ];
  return OPCIONESPAISES;
};
