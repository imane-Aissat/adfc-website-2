import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import '../../style/EmployeeRotation.css';

const EmployeeRotation = ({ employeeId }) => {
  const initialEmployeeData = {
    id: 1,
    name: "Ahmed Rashdan",
    position: "Director Sales",
    stats: {
      utilization: 75,
      absence: 25,
      evaluation: 75
    }
  };

  return (
    <Layout>
      <EmployeeRotationComponent 
        employeeData={initialEmployeeData}
      />
    </Layout>
  );
};

const EmployeeRotationComponent = ({ employeeData }) => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0));
  const [calendarData, setCalendarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const months = [
      "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", 
      "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];

    const fetchCalendarData = (date) => {
      try {
        setLoading(true);
        const month = date.getMonth();
        const year = date.getFullYear();
        
        const mockData = {
          month: months[month],
          year: year,
          weeks: generateWeeksForMonth(month, year)
        };
        
        setCalendarData(mockData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCalendarData(currentDate);
  }, [currentDate]);

  const prevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const nextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="employee-rotation-page">
      {/* Navigation Links */}
      <div className="navigation-links">
        <button onClick={() => navigate(-1)} className="back-link">
          <ChevronLeft size={16} />
          Ajout employe
        </button>
      </div>

      {/* Enhanced Employee Section */}
      <div className="employee-profile-card">
        <div className="employee-header">
          <h2>{employeeData.name}</h2>
          <p className="employee-position">{employeeData.position}</p>
        </div>
        
        <div className="employee-stats-grid">
          <div className="stat-card">
            <CircularProgress value={employeeData.stats.utilization} />
            <div className="stat-info">
              <div className="stat-label">Utilisation</div>
            </div>
          </div>
          
          <div className="stat-card">
            <CircularProgress value={employeeData.stats.absence} />
            <div className="stat-info">
              <div className="stat-label">Absence</div>
            </div>
          </div>
          
          <div className="stat-card">
            <CircularProgress value={employeeData.stats.evaluation} />
            <div className="stat-info">
              <div className="stat-label">Evaluation</div>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Section */}
      {calendarData && (
        <div className="calendar-section">
          <div className="calendar-header">
            <button onClick={prevMonth} className="nav-button">
              <ChevronLeft size={20} />
            </button>
            <h3>{calendarData.month} {calendarData.year}</h3>
            <button onClick={nextMonth} className="nav-button">
              <ChevronRight size={20} />
            </button>
          </div>
          
          <CalendarTable weeks={calendarData.weeks} />
        </div>
      )}

      {/* Export Button */}
      <div className="export-section">
        <button className="export-button">
          Export
        </button>
      </div>
    </div>
  );
};

const CircularProgress = ({ value }) => {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="progress-container">
      <svg className="progress-ring" width="80" height="80">
        <circle
          className="progress-ring-bg"
          stroke="#e0e0e0"
          strokeWidth="6"
          fill="transparent"
          r={radius}
          cx="40"
          cy="40"
        />
        <circle
          className="progress-ring-fg"
          stroke="#FFA500"
          strokeWidth="6"
          fill="transparent"
          r={radius}
          cx="40"
          cy="40"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 40 40)"
        />
      </svg>
      <div className="percentage-text">{value}%</div>
    </div>
  );
};

const CalendarTable = ({ weeks }) => {
  return (
    <table className="calendar-table">
      <thead>
        <tr>
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
            <th key={day}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {weeks.map((week, weekIndex) => (
          <React.Fragment key={weekIndex}>
            <tr>
              {week.days.map((day, dayIndex) => (
                <td key={`date-${dayIndex}`} className="date-cell">
                  {day?.date || ''}
                </td>
              ))}
            </tr>
            <tr>
              {week.days.map((day, dayIndex) => (
                <td 
                  key={`status-${dayIndex}`} 
                  className={`status-cell ${day?.status ? day.status.toLowerCase() : 'empty'}`}
                >
                  {day?.status || ''}
                </td>
              ))}
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

function generateWeeksForMonth(month, year) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  const weeks = [];
  let currentWeek = [];
  let currentDate = new Date(firstDay);

  // Add empty days for the first week if needed
  for (let i = 0; i < firstDay.getDay(); i++) {
    currentWeek.push({ date: null, status: null });
  }

  // Fill the calendar with days
  while (currentDate <= lastDay) {
    if (currentWeek.length === 7) {
      weeks.push({ days: [...currentWeek] });
      currentWeek = [];
    }

    const status = Math.random() > 0.3 ? "ON" : "OFF";
    currentWeek.push({
      date: currentDate.getDate(),
      status: status
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Add remaining days to the last week
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push({ date: null, status: null });
    }
    weeks.push({ days: currentWeek });
  }

  return weeks;
}

export default EmployeeRotation;