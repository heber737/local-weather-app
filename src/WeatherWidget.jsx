/* eslint-disable react/prop-types */
import { useState } from "react";
import weatherCodes from "./weatherCodes";

function WeatherWidget({ currentWeather }) {
  const [tempUnit, setTempUnit] = useState("°C");
  function handleUnitChange(e) {
    if (e.target.value === "°C" && tempUnit === "°F") {
      setTempUnit("°C");
    }
    if (e.target.value === "°F" && tempUnit === "°C") {
      setTempUnit("°F");
    }
  }

  if (currentWeather) {
    const {
      time,
      temperature_2m: temp,
      relative_humidity_2m: humidity,
      apparent_temperature: feel,
      is_day,
      weather_code: code,
    } = currentWeather.current;

    const celsiusTemp = Math.floor(temp);
    const celsiusFeel = Math.floor(feel);
    const fahrenheitTemp = Math.floor((9 / 5) * temp + 32);
    const fahrenheitFeel = Math.floor((9 / 5) * feel + 32);
    const localTime = new Date(time).toLocaleString();

    return (
      <div id="widget">
        <div id="temp-conditions-wrapper">
          <div id="temp-wrapper">
            <div id="icon-wrapper">
              <img
                id="weather-icon"
                height="48"
                width="48"
                alt={weatherCodes[code].description}
                src={weatherCodes[code][is_day]}
              />
            </div>
            <div id="temp-buttons-wrapper">
              {tempUnit === "°C" ? celsiusTemp : fahrenheitTemp}{" "}
              <div id="temp-buttons">
                <button
                  type="button"
                  id="c-button"
                  value="°C"
                  onClick={(e) => handleUnitChange(e)}
                  style={{ color: tempUnit === "°C" ? "#FFFFFF" : "#BBBBBB" }}
                >
                  °C
                </button>
                <span id="temp-divisor">|</span>
                <button
                  type="button"
                  id="f-button"
                  value="°F"
                  onClick={(e) => handleUnitChange(e)}
                  style={{ color: tempUnit === "°F" ? "#FFFFFF" : "#BBBBBB" }}
                >
                  °F
                </button>
              </div>
              <p id="day-night">{is_day ? "Day" : "Night"}</p>
            </div>
          </div>
          <div id="conditions-wrapper">
            <h2>Current Conditions</h2>
            <p>{weatherCodes[code].description}</p>
            <p>
              Feels like:{" "}
              <span>
                {tempUnit === "°C" ? celsiusFeel : fahrenheitFeel} {tempUnit}
              </span>
            </p>
            <p>
              Humidity: <span>{humidity}%</span>
            </p>
          </div>
        </div>
        <div id="time-wrapper">
          <p>Updated on {localTime}</p>
          <p className="smaller-text">
            * The source is updated every 15 minutes. Refresh to get the latest
            available data.
          </p>
        </div>
      </div>
    );
  } else {
    return <p id="loading">Acquiring data</p>;
  }
}

export default WeatherWidget;
