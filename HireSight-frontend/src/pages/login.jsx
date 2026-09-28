import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../Auth/authContext';
import apiClient from '../api/axiosConfig';

const Login = () => {

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth(); 
  const navigate = useNavigate(); 

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError('');
    setIsLoading(true);

    try {
      const response = await apiClient.post('/users/login', {
        email: form.email,
        password: form.password
      });

      const userData = response.data.user;
      const token = response.data.user.token;

      login(userData, token);
      navigate('/dashboard');

    } catch (err) {
      console.error('Login error:', err);
      if (err.response && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Failed to connect to the server. Please try again later.');
      }
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.loginCard}>

        <div style={styles.headerArea}>
          <h2 style={styles.title}>Welcome back</h2>
          <p style={styles.subtitle}>Log in to manage your job applications</p>
        </div>

        {error && <div style={styles.errorAlert}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.formContainer}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input 
              type="email" 
              name="email"
              value={form.email} 
              onChange={handleInputChange} 
              placeholder="name@company.com"
              required 
              style={styles.input}
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input 
              type="password" 
              name="password"
              value={form.password} 
              onChange={handleInputChange} 
              placeholder="••••••••"
              required 
              style={styles.input}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            style={{
              ...styles.submitButton,
              backgroundColor: isLoading ? '#cbd5e1' : '#2563eb',
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div style={styles.footerText}>
          Don't have an account?{' '}
          <Link to="/register" style={styles.signupLink}>
            Sign up free
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    display: 'flex',
    justifyContent: 'center', 
    alignItems: 'center',      
    minHeight: 'calc(100vh - 70px)', 
    backgroundColor: '#f8fafc', 
    padding: '20px',
    boxSizing: 'border-box',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  loginCard: {
    backgroundColor: '#ffffff',
    padding: '40px 32px',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    width: '100%',
    maxWidth: '400px', 
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.05)',
    boxSizing: 'border-box',
  },
  headerArea: {
    textAlign: 'center',
    marginBottom: '28px',
  },
  title: {
    margin: '0 0 6px 0',
    fontSize: '24px',
    fontWeight: '700',
    color: '#0f172a',
    letterSpacing: '-0.02em',
  },
  subtitle: {
    margin: 0,
    fontSize: '14px',
    color: '#64748b',
  },
  errorAlert: {
    color: '#991b1b',
    marginBottom: '20px',
    padding: '12px 14px',
    backgroundColor: '#fef2f2',
    border: '1px solid #fca5a5',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '500',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px', 
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#334155',
  },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '10px 14px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    fontSize: '14px',
    outline: 'none',
  },
  submitButton: {
    width: '100%',
    padding: '12px',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    marginTop: '8px',
    transition: 'background-color 0.15s ease',
  },
  footerText: {
    textAlign: 'center',
    marginTop: '24px',
    fontSize: '14px',
    color: '#64748b',
  },
  signupLink: {
    color: '#2563eb',
    textDecoration: 'none',
    fontWeight: '500',
  }
};

export default Login;
