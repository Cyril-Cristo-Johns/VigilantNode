import { useState, useEffect } from 'react';
import apiClient from '../api/axiosConfig';
import Board from '../components/KanbanBoard/Board';
import { useAuth } from '../Auth/authContext';
import NewJobModal from '../components/KanbanBoard/NewJobModal';

const Dashboard = () => {

  const handleJobAdded = (newJob) => {
    setApplications(prevApps => [newJob, ...prevApps]);
  };
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await apiClient.get('/applications');
        setApplications(response.data.applications || []);
      } catch (err) {
        setError('Failed to load your job applications.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this application?')) {
      return;
    }

    try {
      await apiClient.delete(`/applications/${jobId}`);
      setApplications(prevApps => prevApps.filter(app => app._id !== jobId));
    } catch (err) {
      console.error('Failed to delete job:', err);
      alert('Failed to delete the application. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div style={styles.centerContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading your workspace...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.centerContainer}>
        <div style={styles.errorCard}>
          <p style={styles.errorText}>{error}</p>
          <button onClick={() => window.location.reload()} style={styles.retryButton}>
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.dashboardWrapper}>
      <div style={styles.mainContainer}>
        <header style={styles.header}>
          <div>
            <h2 style={styles.welcomeHeading}>Welcome back, {user?.name || 'User'}</h2>
            <p style={styles.subHeading}>Track and manage your application pipeline stages seamlessly.</p>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            style={styles.addButton}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#10b981'}
          >
            <span style={{ marginRight: '6px', fontSize: '16px' }}>+</span> Add Job
          </button>
        </header>
        
        <main style={styles.boardSection}>
          <Board 
            applications={applications} 
            setApplications={setApplications} 
            onDelete={handleDelete} 
          />
        </main>
      </div>

      <NewJobModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onJobAdded={handleJobAdded} 
      />
    </div>
  );
};

const styles = {
  dashboardWrapper: {
    minHeight: 'calc(100vh - 70px)',
    backgroundColor: '#f8fafc', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    boxSizing: 'border-box',
  },
  mainContainer: {
    maxWidth: '1400px', 
    margin: '0 auto',
    padding: '32px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
  },
  welcomeHeading: {
    fontSize: '26px',
    fontWeight: '700',
    color: '#0f172a',
    margin: '0 0 4px 0',
    letterSpacing: '-0.02em',
  },
  subHeading: {
    margin: 0,
    color: '#64748b',
    fontSize: '14px',
  },
  addButton: {
    padding: '10px 20px',
    backgroundColor: '#10b981',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
    boxShadow: '0 1px 2px 0 rgba(16, 185, 129, 0.2)',
    transition: 'background-color 0.15s ease',
    display: 'inline-flex',
    alignItems: 'center',
  },
  boardSection: {
    width: '100%',
    overflowX: 'auto', 
  },
  centerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  spinner: {
    width: '32px',
    height: '32px',
    border: '3px solid #e2e8f0',
    borderTop: '3px solid #2563eb',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '16px',
  },
  loadingText: {
    color: '#64748b',
    fontSize: '14px',
    fontWeight: '500',
  },
  errorCard: {
    textAlign: 'center',
    padding: '32px',
    backgroundColor: '#fef2f2',
    border: '1px solid #fca5a5',
    borderRadius: '12px',
    maxWidth: '400px',
  },
  errorText: {
    color: '#991b1b',
    fontSize: '14px',
    fontWeight: '500',
    margin: '0 0 16px 0',
  },
  retryButton: {
    padding: '8px 16px',
    backgroundColor: '#ffffff',
    color: '#991b1b',
    border: '1px solid #fca5a5',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
  },
};

export default Dashboard;
