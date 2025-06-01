import React, { useState } from "react";
import '..//../style/RoomReservationForm.css';
import Header from '..//../components/ChefDepart/Header';
import SidebarChefBase from '..//../components/SideBarChefBase';


function ReservationChambreForm() {
    const [room, setRoom] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [comment, setComment] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ room, startDate, endDate, comment });
    };
    return <div id="chambres-view-chef-de-base">
        <div className="side-bar-space">
            <SidebarChefBase></SidebarChefBase>
        </div>
        <div className="navigation-bar-header-space">
                <Header></Header>
        </div>
            <div id="form-divider-room">
               <form className="reservation-form" onSubmit={handleSubmit}>
                <div className="header">
                <h2>Réserver une chambre</h2>
                <button type="button" className="close-btn">×</button>
                </div>

                <label>
                Chambre
                <select value={room} onChange={(e) => setRoom(e.target.value)}>
                    <option value="">Sélectionner une chambre</option>
                    <option value="Chambre 1">Chambre 1</option>
                    <option value="Chambre 2">Chambre 2</option>
                </select>
                </label>

                <label>
                Date de début
                <div className="input-with-icon">
                    <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    />
                    <span className="calendar-icon">📅</span>
                </div>
                </label>

                <label>
                Date de fin
                <div className="input-with-icon">
                    <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    />
                    <span className="calendar-icon">📅</span>
                </div>
                </label>

                <label>
                Commentaire
                <textarea
                    rows="3"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                ></textarea>
                </label>

                <button type="submit" className="confirm-button">Confirmer</button>
            </form> 
            </div>

    </div>
}

export default ReservationChambreForm;