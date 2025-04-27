import React from 'react';
import Topbar from '../../components/Topbar';
import HRSidebar from '../../components/HRSidebar';
import EvaluationTable from '../../components/EvaluationTable';


const Evaluation = () => {
  return (
    <div className="dashboard-container">
      <HRSidebar />
      <div className="main-content">
        <Topbar />
        <div className="content-area">
          <EvaluationTable />
        </div>
      </div>
    </div>
  );
};

export default Evaluation;
