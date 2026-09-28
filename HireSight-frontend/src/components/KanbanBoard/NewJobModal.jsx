import { useState } from 'react';
import apiClient from '../../api/axiosConfig';

const NewJobModal = ({ isOpen, onClose, onJobAdded }) => {
  const [form, setForm] = useState({ company: '', role: '', jobDescription: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      let aiData = {};

      if (form.jobDescription.trim().length > 0) {
        const aiResponse = await apiClient.post('/ai/analyze-job', { 
          jobDescription: form.jobDescription 
        });
        aiData = aiResponse.data.data;
      }

      const dbResponse = await apiClient.post('/applications', {
        company: form.company,
        role: form.role,
        status: 'Wishlist', 
        jobDescription: form.jobDescription,
        requiredSkills: aiData.requiredSkills || [],
        prepChecklist: aiData.prepChecklist || []
      });

      console.log(dbResponse.data);
      onJobAdded(dbResponse.data.rsps);

      setForm({ company: '', role: '', jobDescription: '' });
      onClose();
    } catch (err) {
      console.error('Failed to create job:', err);
      setError('An error occurred while creating the job or generating AI insights.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.overlay} onClick={onClose}>

      <div style={styles.modalWindow} onClick={(e) => e.stopPropagation()}>

        <div style={styles.header}>
          <div>
            <h3 style={styles.title}>Add New Application</h3>
            <p style={styles.subtitle}>Track a position or paste text to generate preparation tasks.</p>
          </div>
          <button onClick={onClose} style={styles.closeButton}>✕</button>
        </div>

        {error && <div style={styles.errorAlert}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Company <span style={styles.required}>*</span></label>
            <input 
              type="text" 
              name="company"
              value={form.company} 
              onChange={handleInputChange} 
              placeholder="e.g. Google, Stripe"
              required 
              style={styles.input} 
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Role <span style={styles.required}>*</span></label>
            <input 
              type="text" 
              name="role"
              value={form.role} 
              onChange={handleInputChange} 
              placeholder="e.g. Frontend Engineer"
              required 
              style={styles.input} 
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Job Description <span style={styles.aiTag}>✨ AI Insights</span></label>
            <textarea 
              name="jobDescription"
              value={form.jobDescription} 
              onChange={handleInputChange} 
              rows="5" 
              placeholder="Paste the JD text details here. Our system will extract key skill demands and construct an interactive roadmap..."
              style={styles.textarea} 
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading} 
            style={{
              ...styles.submitButton,
              backgroundColor: isLoading ? '#6366f1' : '#2563eb',
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? (
              <span style={styles.loadingFlex}>
                <span style={styles.miniSpinner}></span>
                Analyzing with AI & Saving...
              </span>
            ) : 'Save Application'}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.4)', 
    backdropFilter: 'blur(4px)', 
    zIndex: 2000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    boxSizing: 'border-box',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  modalWindow: {
    backgroundColor: '#ffffff',
    padding: '32px',
    borderRadius: '16px',
    width: '100%',
    maxWidth: '520px',
    maxHeight: 'calc(100vh - 60px)',
    overflowY: 'auto',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
    border: '1px solid #e2e8f0',
    boxSizing: 'border-box',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '24px',
  },
  title: {
    margin: '0 0 4px 0',
    fontSize: '20px',
    fontWeight: '700',
    color: '#0f172a',
  },
  subtitle: {
    margin: 0,
    fontSize: '13px',
    color: '#64748b',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '16px',
    color: '#94a3b8',
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: '6px',
    transition: 'background-color 0.2s',
  },
  errorAlert: {
    padding: '12px 16px',
    backgroundColor: '#fef2f2',
    border: '1px solid #fca5a5',
    color: '#991b1b',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '500',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    width: '100%',
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#334155',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  required: {
    color: '#ef4444',
  },
  aiTag: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#4f46e5',
    backgroundColor: '#eeedf6',
    padding: '2px 6px',
    borderRadius: '4px',
  },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '14px',
    outline: 'none',
    color: '#0f172a',
    transition: 'border-color 0.15s ease',
  },
  textarea: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '12px 14px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '14px',
    outline: 'none',
    color: '#0f172a',
    resize: 'vertical',
    fontFamily: 'inherit',
    transition: 'border-color 0.15s ease',
  },
  submitButton: {
    width: '100%',
    padding: '12px',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)',
    transition: 'all 0.2s ease',
    marginTop: '6px',
  },
  loadingFlex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  miniSpinner: {
    width: '14px',
    height: '14px',
    border: '2px solid rgba(255,255,255,0.3)',
    borderTop: '2px solid #ffffff',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  }
};

export default NewJobModal;
