import { useState, useEffect } from "react";
import "./App.css";
import WeatherWidget from "./WeatherWidget";

const api = "https://api.open-meteo.com/v1/forecast";

function App() {
  const [coordinates, setCoordinates] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);

  function success(result) {
    setCoordinates({
      latitude: result.coords.latitude.toString(),
      longitude: result.coords.longitude.toString(),
    });
  }

  function error() {
    alert(
      "Sorry, no position available. Check your device's location settings and refresh the page."
    );
  }

  /* This IF condition is to ensure that devices that update coordinates every few seconds wont keep calling the getCurrentWeather function constantly, as this is probably not necessary. */

  if (!coordinates) {
    navigator.geolocation.getCurrentPosition(success, error);
  }

  useEffect(() => {
    async function getCurrentWeather() {
      try {
        const weather = await fetch(
          api +
            "?latitude=" +
            coordinates.latitude +
            "&longitude=" +
            coordinates.longitude +
            "&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code&timezone=auto&forecast_days=1"
        );
        const weatherJson = await weather.json();
        setCurrentWeather(weatherJson);
      } catch {
        alert(error);
      }
    }
    if (coordinates) {
      getCurrentWeather();
    }
  }, [coordinates]);

  return (
    <>
      <header>
        <h1 id="main-heading">Local Weather App</h1>
      </header>
      <main>
        <WeatherWidget currentWeather={currentWeather} />
      </main>
      <footer>
        <p>
          Created by{" "}
          <a id="author" href="https://github.com/heber737" target="_blank">
            Heber Villalobos
          </a>
        </p>
      </footer>
    </>
  );
}

export default App;
