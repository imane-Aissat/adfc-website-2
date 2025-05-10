import React from 'react';
import '../../style/employee/Calendar.css';

const Calendar = ({ currentMonth, onNextMonth, onPrevMonth }) => {
  const days = [
    '', '', '', '1', '2', '3', '4',
    '5', '6', '7', '8', '9', '10', '11',
    '12', '13', '14', '15', '16', '17', '18',
    '19', '20', '21', '22', '23', '24', '25',
    '26', '27', '28', '29', '30', '31', '1',
  ];

  const statuses = {
    1: 'TRAVAIL', 2: 'TRAVAIL', 3: 'TRAVAIL', 4: 'TRAVAIL',
    5: 'TRAVAIL', 6: 'TRAVAIL', 7: 'TRAVAIL',
    16: 'REPOS', 17: 'REPOS', 18: 'REPOS',
    19: 'REPOS', 20: 'REPOS', 21: 'REPOS',
    22: 'REPOS', 23: 'REPOS', 24: 'REPOS', 25: 'REPOS',
    26: 'REPOS',
  };

  // Format currentMonth dynamically in French
  const monthFormatter = new Intl.DateTimeFormat('fr-FR', {
    month: 'long',
    year: 'numeric',
  });

  const translatedMonth = monthFormatter.format(new Date(currentMonth));
  const capitalizedMonth = translatedMonth.charAt(0).toUpperCase() + translatedMonth.slice(1);

  return (
    <div className="salah-calendar">
      <div className="salah-calendar-header">
        <button className="salah-prev-month" onClick={onPrevMonth}>Précédent</button>
        <h2>{capitalizedMonth}</h2>
        <button className="salah-next-month" onClick={onNextMonth}>Suivant</button>
      </div>
      <div className="salah-calendar-grid">
        {['LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM', 'DIM'].map(day => (
          <div className="salah-calendar-day-name" key={day}>{day}</div>
        ))}
        {days.map((day, index) => (
          <div className="salah-calendar-day" key={index}>
            {day}
            {day && statuses[parseInt(day)] && (
              <span className={`salah-shift-status ${statuses[parseInt(day)].toLowerCase()}`}>
                {statuses[parseInt(day)]}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
