import React from 'react';
import classNames from 'classnames';

const ShiftCell = ({ shift }) => {
  if (!shift || shift.status === 'none') return <div className="shift-cell empty"></div>;

  const cellClass = classNames('shift-cell', {
    'leave': shift.status === 'leave',
    'absent': shift.status === 'absent',
    'normal': shift.status === 'normal'
  });

  return (
    <div className={cellClass}>
      <p>{shift.label || shift.time}</p>
    </div>
  );
};

export default ShiftCell;
