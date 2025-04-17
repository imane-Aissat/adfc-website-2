import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/WeatherCard.css"; // Create this file for styling

const WeatherCard = () => {
    const [weather, setWeather] = useState(null);
    const API_KEY = "e2dfaf0085ece94a91f43d764e45f625"; // Replace with your API Key
    const CITY = "Paris"; // You can change this or make it dynamic

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
                );
                setWeather(response.data);
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };

        fetchWeather();
    }, []);

    return (
        <div className="weather-card">
            {weather ? (
                <>
                    <h2>{weather.name}</h2>
                    <p>{weather.weather[0].description}</p>
                    <p>🌡 {weather.main.temp}°C</p>
                    <p>💨 Wind: {weather.wind.speed} m/s</p>
                </>
            ) : (
                <p>Loading weather...</p>
            )}
        </div>
    );
};

export default WeatherCard;
