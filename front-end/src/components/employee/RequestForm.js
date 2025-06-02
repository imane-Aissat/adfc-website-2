import React, { useState } from "react";
import "../../style/employee/RequestLeaveModal.css";

const LeaveRequestModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fromDate: '',
    toDate: '',
    reason: '',
    file: null
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.fromDate || !formData.toDate) {
      setError('Veuillez sélectionner les dates de début et fin');
      return;
    }
    if (!formData.reason.trim()) {
      setError('Veuillez saisir une raison');
      return;
    }

    setIsSubmitting(true);

    try {
      const formPayload = new FormData();
      formPayload.append('from_date', formData.fromDate);
      formPayload.append('to_date', formData.toDate);
      formPayload.append('reason', formData.reason);
      formPayload.append('employee_id', 653); // Default as per your requirement
      if (formData.file) {
        formPayload.append('file', formData.file);
      }

      const response = await fetch('http://127.0.0.1:5000/api/shift-change', {
        method: 'POST',
        body: formPayload
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Échec de la soumission');
      }

      alert('Demande soumise avec succès!');
      onClose();
    } catch (err) {
      console.error('Submission error:', err);
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="salah-modal-overlay">
      <div className="salah-modal-content">
        <div className="salah-modal-header">
          <h3>Changement de shift</h3>
          <button 
            className="salah-close-btn" 
            onClick={onClose}
            disabled={isSubmitting}
          >
            ✖
          </button>
        </div>

        <div className="salah-modal-body">
          {error && <div className="salah-error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <label>Date de début</label>
            <input 
              type="date" 
              name="fromDate"
              value={formData.fromDate}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />

            <label>Date de fin</label>
            <input 
              type="date" 
              name="toDate"
              value={formData.toDate}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />

            <label>Raison</label>
            <textarea 
              placeholder="Entrez votre raison"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            ></textarea>

            <label>Télécharger un fichier (PDF, JPEG, PNG - max 5MB)</label>
            <input 
              type="file" 
              name="file"
              onChange={handleChange}
              accept=".pdf,.jpg,.jpeg,.png"
              disabled={isSubmitting}
            />

            <button 
              className="salah-done-btn" 
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Envoi en cours...' : 'Terminé'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeaveRequestModal;