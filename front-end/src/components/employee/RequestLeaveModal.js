
import React, { useState } from 'react';
import '../../style/employee/RequestForm.css';

const RequestForm = ({ onClose }) => {
  const [reason, setReason] = useState('');
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Basic validation
    if (!reason.trim()) {
      setError('Please enter a reason');
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append('reason', reason.trim());
    formData.append('employee_id', 653);
    
    if (file) {
      formData.append('file', file);
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/api/absence-request', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Request failed');
      }

      const result = await response.json();
      alert('Request submitted successfully!');
      onClose();
    } catch (err) {
      console.error('Submission error:', err);
      setError(err.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Basic file validation
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(selectedFile.type)) {
        setError('Please upload a PDF, JPEG, PNG, or Word document');
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
        setError('File size must be less than 5MB');
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  return (
    <div className="salah-overlay">
      <div className="salah-form-container">
        <div className="salah-form-header">
          <h3>Demande de absnece</h3>
          <button 
            type="button"
            className="salah-close-btn" 
            onClick={onClose}
            disabled={isSubmitting}
          >
            ✕
          </button>
        </div>

        {error && <div className="salah-error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label>Raison</label>
          <textarea 
            placeholder="Entrez votre raison"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            disabled={isSubmitting}
          />

          <label>Télécharger un fichier (PDF, JPEG, PNG, DOC - max 5MB)</label>
          <input 
            type="file" 
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
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
  );
};

export default RequestForm;


