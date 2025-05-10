import React, { useState } from "react";
import RequestCard from "../../components/employee/RequestCard";
import RequestDetailsModal from "../../components/employee/RequestDetailsModal";
import "../../style/employee/RequestPage.css";

const RequestPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const requests = [
    { status: "ACCEPTÉ" },
    { status: "EN-ATTENTE" },
    { status: "REJETÉ" },
  ];

  const handleDetailsClick = () => {
    setModalOpen(true);
  };

  return (
    <div className="salah-request-page">
      {requests.map((request, index) => (
        <RequestCard
          key={index}
          status={request.status}
          onDetailsClick={handleDetailsClick}
        />
      ))}

      <RequestDetailsModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default RequestPage;
