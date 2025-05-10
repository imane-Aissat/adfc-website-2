import React, { useState } from 'react';
import ShiftCard from '../../components/employee/ShiftCardS';
import Calendar from '../../components/employee/Calendar';
import RequestForm from '../../components/employee/RequestForm';
// import Navbar if needed
import '../../style/employee/ShiftPage.css';

const ShiftPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1)); // Jan 2025
  const [showForm, setShowForm] = useState(false);

  const formatMonthYear = (date) => {
    return new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }).format(date);
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => {
      const next = new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1);
      return next;
    });
  };

  return (
    <div className="salah-shift-page">
      <div className="salah-left-sidebar">
        <ShiftCard title="Poste actuel" state="Travail" from="18 novembre 2023" to="18 novembre 2023" />
        <ShiftCard title="Prochain poste" state="Repos" from="19 novembre 2023" to="19 novembre 2023" />
      </div>

      <div className="salah-main-content">
        <Calendar currentMonth={formatMonthYear(currentDate)} onNextMonth={handleNextMonth} />
        <button className="salah-request-changes-btn" onClick={() => setShowForm(true)}>
          Demander un changement
        </button>

        {showForm && <RequestForm onClose={() => setShowForm(false)} />}
      </div>
    </div>
  );
};

export default ShiftPage;
