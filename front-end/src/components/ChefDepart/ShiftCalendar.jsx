import React, { useState } from 'react';
import '../../style/ShiftCalendar.css';

const sampleData = [
  {
    name: "HAMMOUDA Bouran",
    role: "Opératrice L1",
    team: "Équipe A",
    shifts: [
      { date: 1, status: "normal" },
      { date: 2, status: "normal" },
      { date: 3, status: "leave", label: "Congé" },
      { date: 4, status: "normal" },
      { date: 5, status: "normal" },
      { date: 6, status: "normal" },
      { date: 7, status: "normal" },
      { date: 15, status: "normal" },
      { date: 16, status: "leave", label: "Congé" },
      { date: 20, status: "normal" },
      { date: 21, status: "normal" }
    ]
  },
  {
    name: "Achour Mohammed madani",
    role: "Opérateur L1",
    team: "Équipe B",
    shifts: [
      { date: 1, status: "absent", label: "Absent" },
      { date: 2, status: "normal" },
      { date: 3, status: "leave", label: "Congé" },
      { date: 4, status: "normal" },
      { date: 5, status: "normal" },
      { date: 6, status: "normal" },
      { date: 7, status: "normal" },
      { date: 14, status: "normal" },
      { date: 15, status: "normal" },
      { date: 22, status: "leave", label: "Congé" }
    ]
  },
  {
    name: "HAMMOUDA Bouran",
    role: "Opérateur L2",
    team: "Équipe A",
    shifts: [
      { date: 2, status: "normal" },
      { date: 3, status: "normal" },
      { date: 4, status: "normal" },
      { date: 5, status: "leave", label: "Congé" },
      { date: 6, status: "normal" },
      { date: 7, status: "normal" },
      { date: 8, status: "normal" },
      { date: 12, status: "normal" },
      { date: 13, status: "normal" },
      { date: 19, status: "leave", label: "Congé" }
    ]
  },
  {
    name: "HAMMOUDA Bouran",
    role: "Superviseur",
    team: "Équipe B",
    shifts: [
      { date: 1, status: "normal" },
      { date: 2, status: "normal" },
      { date: 3, status: "normal" },
      { date: 4, status: "leave", label: "Congé" },
      { date: 5, status: "normal" },
      { date: 6, status: "normal" },
      { date: 7, status: "normal" },
      { date: 11, status: "normal" },
      { date: 12, status: "normal" },
      { date: 18, status: "leave", label: "Congé" }
    ]
  },
  {
    name: "HAMMOUDA Bouran",
    role: "Opérateur L1",
    team: "Équipe A",
    shifts: [
      { date: 1, status: "normal" },
      { date: 2, status: "normal" },
      { date: 3, status: "normal" },
      { date: 4, status: "normal" },
      { date: 5, status: "leave", label: "Congé" },
      { date: 6, status: "normal" },
      { date: 7, status: "normal" },
      { date: 10, status: "normal" },
      { date: 11, status: "normal" },
      { date: 17, status: "leave", label: "Congé" }
    ]
  },
  {
    name: "HAMMOUDA Bouran",
    role: "Opérateur L2",
    team: "Équipe B",
    shifts: [
      { date: 1, status: "normal" },
      { date: 2, status: "normal" },
      { date: 3, status: "normal" },
      { date: 4, status: "normal" },
      { date: 5, status: "normal" },
      { date: 6, status: "leave", label: "Congé" },
      { date: 7, status: "normal" },
      { date: 9, status: "normal" },
      { date: 10, status: "normal" },
      { date: 16, status: "leave", label: "Congé" }
    ]
  }
];

const daysOfWeek = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

const ShiftCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const changeMonth = (direction) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + direction);
      return newDate;
    });
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const getShiftForDate = (employee, date) => {
    return employee.shifts.find(shift => shift.date === date);
  };

  const renderCalendarHeader = () => {
    const daysInMonth = getDaysInMonth();
    const firstDay = getFirstDayOfMonth();
    
    // Adjust for Monday as first day of week (French convention)
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
    
    return (
      <thead>
        <tr>
          <th className="employee-header">Employé</th>
          <th className="employee-header">Rôle/Équipe</th>
          {Array.from({ length: daysInMonth }, (_, i) => {
            const date = i + 1;
            const dayOfWeek = daysOfWeek[(adjustedFirstDay + i) % 7];
            return (
              <th key={date} className="day-header">
                <div className="day-name">{dayOfWeek}</div>
                <div className="day-number">{date}</div>
              </th>
            );
          })}
        </tr>
      </thead>
    );
  };

  const renderEmployeeRows = () => {
    const daysInMonth = getDaysInMonth();
    
    return sampleData.map((employee, index) => (
      <tr key={index} className="employee-row">
        <td className="employee-cell">
          <div className="employee-name">{employee.name}</div>
        </td>
        <td className="employee-info">
          <div className="employee-role">{employee.role}</div>
          <div className="employee-team">{employee.team}</div>
        </td>
        {Array.from({ length: daysInMonth }, (_, i) => {
          const date = i + 1;
          const shift = getShiftForDate(employee, date);
          
          return (
            <td key={date} className="shift-cell">
              {shift ? (
                <div className={`shift-status ${shift.status}`} title={shift.label || 'Sur site'}>
                  {shift.status === 'normal' && 'S'}
                  {shift.status === 'leave' && 'C'}
                  {shift.status === 'absent' && 'A'}
                </div>
              ) : (
                <div className="shift-status empty" title="Non programmé">-</div>
              )}
            </td>
          );
        })}
      </tr>
    ));
  };

  const renderLegend = () => {
    return (
      <div className="legend-container">
        <div className="legend-title">Légende:</div>
        <div className="legend-item">
          <span className="legend-color normal"></span>
          <span>S = Sur site</span>
        </div>
        <div className="legend-item">
          <span className="legend-color leave"></span>
          <span>C = Congé</span>
        </div>
        <div className="legend-item">
          <span className="legend-color absent"></span>
          <span>A = Absent</span>
        </div>
        <div className="legend-item">
          <span className="legend-color empty"></span>
          <span>- = Non programmé</span>
        </div>
      </div>
    );
  };

  return (
    <div className="shift-calendar">
      <div className="calendar-header">
        <h2>Calendrier des horaires</h2>
        <div className="month-navigation">
          <button onClick={() => changeMonth(-1)}>Précédent</button>
          <h3>{currentDate.toLocaleString('fr-FR', { month: 'long', year: 'numeric' })}</h3>
          <button onClick={() => changeMonth(1)}>Suivant</button>
        </div>
      </div>

      {renderLegend()}

      <div className="calendar-table-container">
        <table className="calendar-table">
          {renderCalendarHeader()}
          <tbody>
            {renderEmployeeRows()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShiftCalendar;