import { useEffect, useState } from "react";
import styles from "./WeatherWidget.module.css";
import Spinner from "../Spinner/Spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Input from "../Input/Input";
import Button from "../Button/Button";
import WeatherItem from "../WeatherItem/WeatherItem";

const WeatherWidget = () => {
  // State variables
  const [searchQuery, setSearchQuery] = useState("");
  const [weatherForecastData, setweatherForecastData] = useState(null);
  const [currentDate, setCurrentDate] = useState("");
  const [error, setError] = useState("");
  const [isFetchingWeather, setisFetchingWeather] = useState(false);

  // Fetch weather data
  const fetchWeatherCondition = async () => {
    try {
      setisFetchingWeather(true);
      const response = await fetch(
        `http://localhost:3001/weather?q=${searchQuery}`
      );
      const result = await response.json();
      if (result.error || !result.location) {
        console.log(result);
        throw new Error(result.error?.message);
      }
      console.log(result);

      setweatherForecastData(result);
      setError("");
    } catch (error) {
      setError(error.message);
      setweatherForecastData(null);
    } finally {
      setisFetchingWeather(false);
    }
  };

  useEffect(() => {
    fetchWeatherCondition();
  }, []);

  const handleSearchClick = () => {
    if (searchQuery) {
      fetchWeatherCondition();
    }
    setSearchQuery("");
  };

  const formatCurrentDate = () => {
    const date = new Date();
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
    setCurrentDate(formattedDate);
  };
  useEffect(() => {
    formatCurrentDate();
  }, []);
  return (
    <div className={styles.weatherWidgetContainer}>
      {isFetchingWeather && <Spinner />}
      {/* Search section */}
      <div className={styles.searchContainer}>
        <Input
          type="search"
          placeHolder="Enter the city name"
          id="search"
          className={styles.weatherInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearchClick()}
        ></Input>
        <Button className={styles.searchButton} onClick={handleSearchClick}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Button>
      </div>
      {/* ------------------------------------------------------------------------ */}
      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          <h4 className={styles.currentDate}>
            Current forecast for the {currentDate}
          </h4>
          <div className={styles.weahterBasicInfo}>
            <div className={styles.locationDetails}>
              <span className={styles.locationIcon}>
                <FontAwesomeIcon icon={faLocationDot} size="2xl" />
              </span>
              <p className={styles.cityName}>
                {weatherForecastData?.location?.name}
              </p>
              <p className={styles.countryName}>
                {weatherForecastData?.location?.country}
              </p>
            </div>
            {/* ------------------------------------------------------------------------ */}
            <div className={styles.tempDetails}>
              <span className={styles.currentWeatherIcon}>
                <img
                  src={weatherForecastData?.current?.condition?.icon}
                  alt="icon for the current weather"
                />
              </span>
              <p className={styles.temperature}>
                {weatherForecastData?.current?.temp_c
                  ? Math.round(weatherForecastData.current.temp_c)
                  : "Waiting for temperature"}{" "}
                &deg;C
              </p>
              <p className={styles.currentCondition}>
                {weatherForecastData?.current?.condition?.text}
              </p>
            </div>{" "}
          </div>
          <hr className={styles.divider} />
          {/* ------------------------------------------------------------------------ */}
          <div className={styles.forecast}>
            <h4 className={styles.forecastHeading}>
              3-day Temperature Overview
            </h4>
            <ul className={styles.forecastContainer}>
              {weatherForecastData &&
                weatherForecastData?.forecast?.forecastday?.map((day) => {
                  return <WeatherItem day={day} key={day.date_epoch} />;
                })}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherWidget;
