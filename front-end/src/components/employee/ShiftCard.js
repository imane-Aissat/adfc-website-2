import React, { useState, useEffect } from "react";
import "../../style/employee/ShiftCard.css";
import { useNavigate } from "react-router-dom";

const ShiftCard = () => {
    const [time, setTime] = useState(new Date());
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatDate = (date) => {
        const options = { day: "numeric", month: "long", year: "numeric" };
        return date.toLocaleDateString("fr-FR", options);
    };

    const handleViewShift = () => {
        navigate("/shift");
    };

    return (
        <div className="salah-shift-card">
            <div className="salah-time">{time.toLocaleTimeString()}</div>
            <div className="salah-insight">Aperçu en temps réel</div>

            <div className="salah-date-section">
                <p className="salah-date-label">Aujourd'hui :</p>
                <p className="salah-date">{formatDate(time)}</p>
            </div>

            <button className="salah-shift-button" onClick={handleViewShift}>
                Voir mon poste
            </button>
        </div>
    );
};

export default ShiftCard;
