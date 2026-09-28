import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Auth/authContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '15px 30px', 
      backgroundColor: '#ffffff', 
      borderBottom: '1px solid #e2e8f0',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
    }}>

      <div>
        <Link to="/dashboard" style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a' }}>
          Job<span style={{ color: '#2563eb' }}>Pipeline</span>
        </Link>
      </div>

      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        {user ? (
          <>
            <Link to="/profile" style={{ fontSize: '14px', color: '#64748b', fontWeight: '500', textDecoration: 'none' }}>
               {user.name}'s Profile
            </Link>
            <button 
              onClick={handleLogout}
              style={{ padding: '8px 16px', backgroundColor: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: '#475569', fontWeight: '500' }}>
              Log In
            </Link>
            <Link to="/register" style={{ padding: '8px 16px', backgroundColor: '#2563eb', color: 'white', borderRadius: '6px', fontWeight: '500' }}>
              Sign Up
            </Link>
          </>
        )}
      </div>

    </nav>
  );
};

export default Navbar;