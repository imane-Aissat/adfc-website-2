import React from 'react';
import ShiftCell from './ShiftCell';

const ShiftRow = ({ employee }) => {
  const shifts = employee.shifts || []; // fallback to empty array
  return (
    <div className="shift-row">
      <div className="employee-info">
        <p><strong>{employee.name}</strong></p>
        <p>{employee.role}</p>
        <p>{employee.team}</p>
        <p>{employee.salary}</p>
      </div>
      <div className="shift-cells">
        {shifts.map((shift, idx) => (
          <ShiftCell key={idx} shift={shift} />
        ))}
      </div>
    </div>
  );
};

export default ShiftRow;
