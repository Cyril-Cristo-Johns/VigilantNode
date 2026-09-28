import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import ProtectedRoute from './components/Shared/ProtectedRoutes';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import Navbar from './components/Shared/Navbar';
import Profile from './pages/Profile';
import Footer from './components/Shared/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/register' element={<Register/>} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route path='/profile' element={<ProtectedRoute>
          <Profile />
        </ProtectedRoute>}/>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;