import React from 'react';
import Header from '../components/ChefDepart/Header';
import Sidebar from '../components/ChefDepart/Sidebar';
import ShiftCalendar from '../components/ChefDepart/ShiftCalendar';

const ShiftsPage = () => {
  return (
    <div className="app-container">
        <ShiftCalendar />
    </div>
  );
};

export default ShiftsPage;
