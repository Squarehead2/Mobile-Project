import ReactWeather, { useOpenWeather } from "react-open-weather";
import * as React from "react";
const WeatherApp = () => {
  const { data, isLoading, errorMessage } = useOpenWeather({
    key: "YOUR-API-KEY",
    lat: "48.137154",
    lon: "11.576124",
    lang: "en",
    unit: "metric", // values are (metric, standard, imperial)
  });
  return (
    <ReactWeather
      isLoading={isLoading}
      errorMessage={errorMessage}
      data={data}
      lang="en"
      locationLabel="Munich"
      unitsLabels={{ temperature: "C", windSpeed: "Km/h" }}
      showForecast
    />
  );
};
export default WeatherApp;
