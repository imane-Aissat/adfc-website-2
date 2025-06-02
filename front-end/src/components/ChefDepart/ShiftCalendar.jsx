import React, { useState, useEffect } from 'react';
import '../../style/ShiftCalendar.css';
import axios from 'axios';

const daysOfWeek = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

const ShiftCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [scheduleData, setScheduleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/genetic');
      if (response.data.success) {
        setScheduleData(response.data.schedule.employees);
        setError(null);
      } else {
        setError(response.data.error || 'Échec de la génération de l\'horaire');
      }
    } catch (err) {
      setError(err.message || 'Erreur lors de la récupération des données');
    } finally {
      setLoading(false);
    }
  };

  const changeMonth = (direction) => {
    setCurrentDate((prev) => {
      const updated = new Date(prev);
      updated.setMonth(prev.getMonth() + direction);
      return updated;
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

  const getDayIndex = (date) => {
    const start = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const diff = Math.floor((date - start) / (1000 * 60 * 60 * 24));
    return diff + 1; // Day index from 1 to 63
  };

  const getShiftForDate = (employee, date) => {
    const dayIndex = getDayIndex(date);
    return employee.shifts.find((shift) => shift.date === dayIndex);
  };

  const renderCalendarHeader = () => {
    const daysInMonth = getDaysInMonth();
    const firstDay = getFirstDayOfMonth();
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

    return (
      <thead>
        <tr>
          <th className="-header"></th>
          <th className="-header"></th>
          {Array.from({ length: daysInMonth }, (_, i) => {
            const dayOfWeek = daysOfWeek[(adjustedFirstDay + i) % 7];
            return (
              <th key={i} className="day-header">
                <div className="day-name">{dayOfWeek}</div>
                <div className="day-number">{i + 1}</div>
              </th>
            );
          })}
        </tr>
      </thead>
    );
  };

  const renderEmployeeRows = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan={getDaysInMonth() + 2} className="loading-cell">
            Chargement en cours...
          </td>
        </tr>
      );
    }

    if (error) {
      return (
        <tr>
          <td colSpan={getDaysInMonth() + 2} className="error-cell">
            Erreur: {error}
          </td>
        </tr>
      );
    }

    const daysInMonth = getDaysInMonth();

    return scheduleData.map((employee, empIndex) => (
      <tr key={empIndex} className="employee-row">
        <td className="employee-cell">
          <div className="employee-name">{employee.name}</div>
        </td>
        <td className="employee-info">
          <div className="employee-role">{employee.role}</div>
          <div className="employee-team">{employee.team}</div>
        </td>
        {Array.from({ length: daysInMonth }, (_, i) => {
          const date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            i + 1
          );
          const shift = getShiftForDate(employee, date);

          return (
            <td key={i} className="shift-cell">
              {shift ? (
                <div className={`shift-status ${shift.status}`} title={`Puit ${shift.room}`}>
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

  const renderLegend = () => (
    <div className="legend-container">
      <div className="legend-title">Légende:</div>
      <div className="legend-item">
        <span className="legend-color normal"></span>
        <span>S = Sur site (hover pour voir la salle)</span>
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

  const handleGenerateSchedule = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/run-algo');
      console.log('Horaire généré:', response.data);
      if (response.data.success) {
        setScheduleData(response.data.schedule.employees);
        setError(null);
      } else {
        setError(response.data.error || 'Échec de la génération');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
        <button className="generate-btn" onClick={handleGenerateSchedule}>
          Générer un nouvel horaire
        </button>
      </div>

      {renderLegend()}

      <div className="calendar-table-container">
        <table className="calendar-table">
          {renderCalendarHeader()}
          <tbody>{renderEmployeeRows()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default ShiftCalendar;
