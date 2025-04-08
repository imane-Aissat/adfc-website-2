import React, { useState, useEffect } from "react";
import "./ShiftCard.css";
import WeatherCard from "./WeatherCard"; // Import the WeatherCard component

const ShiftCard = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatDate = (date) => {
        const options = { day: "numeric", month: "long", year: "numeric" };
        return date.toLocaleDateString("en-GB", options);
    };

    return (
        <div className="shift-card">
            <div className="time">{time.toLocaleTimeString()}</div>
            <div className="insight">Realtime Insight</div>
            
            {/* Weather Widget */}
            <WeatherCard />

            <div className="date-section">
                <p className="date-label">Today:</p>
                <p className="date">{formatDate(time)}</p>
            </div>
            <button className="shift-button">View my shift</button>
        </div>
    );
};

export default ShiftCard;
