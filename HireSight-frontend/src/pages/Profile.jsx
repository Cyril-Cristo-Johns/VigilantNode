import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/authContext';
import apiClient from '../api/axiosConfig';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ oldPassword: '', newPassword: '' });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (form.newPassword.length < 6) {
      return setMessage({ type: 'error', text: 'New password must be at least 6 characters.' });
    }

    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await apiClient.put('/users/password', { 
        oldPassword: form.oldPassword, 
        newPassword: form.newPassword 
      });
      setMessage({ type: 'success', text: 'Password updated successfully!' });
      setForm({ oldPassword: '', newPassword: '' });
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.error || 'Failed to update password.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "DANGER: Are you absolutely sure you want to delete your account? This will permanently erase all your job applications. This action cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      await apiClient.delete('/users/account');
      logout(); 
      navigate('/register'); 
    } catch (err) {
      console.log(err.message);
      setMessage({ type: 'error', text: 'Failed to delete account. Please try again.' });
    }
  };

  const avatarLetter = user?.name ? user.name.charAt(0).toUpperCase() : '?';

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Your Profile</h2>

      {message.text && (
        <div style={{ 
          ...styles.alert, 
          backgroundColor: message.type === 'error' ? '#fef2f2' : '#f0fdf4', 
          color: message.type === 'error' ? '#991b1b' : '#166534',
          border: `1px solid ${message.type === 'error' ? '#fca5a5' : '#86efac'}`
        }}>
          {message.text}
        </div>
      )}

      <div style={styles.card}>

        <div style={styles.profileHeader}>
          <div style={styles.avatar}>{avatarLetter}</div>
          <div>
            <h3 style={styles.userName}>{user?.name || 'User'}</h3>
            <p style={styles.userEmail}>{user?.email || 'No email provided'}</p>
          </div>
        </div>

        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>Change Password</h4>
          <form onSubmit={handlePasswordChange} style={styles.form}>
            <div style={styles.inputGroup}>
              <input
                type="password"
                name="oldPassword"
                placeholder="Current Password"
                required
                value={form.oldPassword}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <input
                type="password"
                name="newPassword"
                placeholder="New Password (min 6 chars)"
                required
                value={form.newPassword}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            <button 
              type="submit" 
              disabled={isLoading} 
              style={{
                ...styles.primaryButton,
                opacity: isLoading ? 0.7 : 1,
                cursor: isLoading ? 'not-allowed' : 'pointer'
              }}
            >
              {isLoading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>

        <div style={{ ...styles.section, borderBottom: 'none', paddingBottom: 0 }}>
          <h4 style={styles.dangerTitle}>Danger Zone</h4>
          <p style={styles.dangerText}>
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <button 
            onClick={handleDeleteAccount} 
            style={styles.dangerButton}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#fef2f2'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            Delete Account Permanently
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px 20px',
    maxWidth: '550px',
    margin: '0 auto',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  heading: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: '24px',
  },
  alert: {
    padding: '12px 16px',
    marginBottom: '24px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '32px',
    borderRadius: '12px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
  },
  profileHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '32px',
  },
  avatar: {
    width: '56px',
    height: '56px',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '22px',
    fontWeight: '600',
  },
  userName: {
    margin: '0 0 4px 0',
    fontSize: '18px',
    fontWeight: '600',
    color: '#0f172a',
  },
  userEmail: {
    margin: 0,
    color: '#64748b',
    fontSize: '14px',
  },
  section: {
    borderTop: '1px solid #f1f5f9',
    paddingTop: '24px',
    paddingBottom: '24px',
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#334155',
    marginBottom: '16px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  inputGroup: {
    width: '100%',
  },
  input: {
    width: '100%',
    boxSizing: 'border-box', 
    padding: '10px 14px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  primaryButton: {
    alignSelf: 'flex-start',
    padding: '10px 18px',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background-color 0.2s',
  },
  dangerTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#dc2626',
    marginBottom: '8px',
  },
  dangerText: {
    color: '#64748b',
    fontSize: '14px',
    margin: '0 0 16px 0',
    lineHeight: '1.5',
  },
  dangerButton: {
    padding: '10px 18px',
    backgroundColor: 'transparent',
    color: '#dc2626',
    border: '1px solid #fca5a5',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
};

export default Profile;