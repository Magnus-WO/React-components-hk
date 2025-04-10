import { useEffect, useState } from "react";
import styles from "./WeatherItem.module.css";

const WeatherItem = ({ day }) => {
  const [forecastDay, setForecastDay] = useState("");
  useEffect(() => {
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date = new Date(day?.date);
    const weekday = weekdays[date.getDay()];
    const dayOfMonth = date.getDate();

    let suffix = "th";
    if (dayOfMonth === 1 || dayOfMonth === 21 || dayOfMonth === 31) {
      suffix = "st";
    } else if (dayOfMonth === 2 || dayOfMonth === 22) {
      suffix = "nd";
    } else if (dayOfMonth === 3 || dayOfMonth === 23) {
      suffix = "thd";
    }
    const formattedDate = `${weekday} ${dayOfMonth}${suffix}`;
    setForecastDay(formattedDate);
  });

  return (
    <li className={styles.weatherItemContainer}>
      <h4>{forecastDay}</h4>
      <span>
        <img src={day?.day?.condition?.icon} alt="" />
      </span>
      <p>Max: {Math.round(day?.day?.maxtemp_c)}&deg;C</p>
      <p>Min: {Math.round(day?.day?.mintemp_c)}&deg;C</p>
    </li>
  );
};

export default WeatherItem;
