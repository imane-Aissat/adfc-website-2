import React from 'react';
import '../../style/employee/ShiftCardS.css';

const ShiftCard = ({ title, state, from, to }) => {
  return (
    <div className="salah-shift-cards">
      <h3>{title}</h3>
      <p>État : <span className={`state ${state.toLowerCase()}`}>{state}</span></p>
      <p>De : {from}</p>
      <p>À : {to}</p>
    </div>
  );
};

export default ShiftCard;
