import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../assets/css/Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate(); // Hook untuk navigasi
  const location = useLocation(); // Hook untuk mendapatkan lokasi saat ini

  const handleLogout = () => {
    // Hapus data sesi admin
    localStorage.removeItem('token');
    // Navigasi ke halaman login atau halaman utama
    navigate('/');
  };

  return (
    <div className="sidebar">
      <h1 className="sidebar-title">ADMIN DASHBOARD</h1>
      <ul className="sidebar-menu">
        <li className={`font-primary text-[25px] mb-4 ${location.pathname === '/admin' ? 'active' : ''}`}>
          <Link to="/admin">
            <i className="fas fa-bed"></i> List Room
          </Link>
        </li>
        <li className={`font-primary text-[25px] mb-4 ${location.pathname === '/list-booking' ? 'active' : ''}`}>
          <Link to="/list-booking">
            <i className="fas fa-calendar-alt"></i> List Booking
          </Link>
        </li>
        <li className={`font-primary text-[25px] mb-4 ${location.pathname === '/list-facilities' ? 'active' : ''}`}>
          <Link to="/list-facilities">
            <i className="fas fa-swimmer"></i> List Facilities
          </Link>
        </li>
        <li className={`font-primary text-[25px] mb-4 ${location.pathname === '/list-review' ? 'active' : ''}`}>
          <Link to="/list-review">
            <i className="fas fa-star"></i> List Review
          </Link>
        </li>
        <li className='font-primary text-[25px] mb-4'>
          <button onClick={handleLogout} className="sidebar-logout-button">
            <i className="fas fa-sign-out-alt"></i> Log Out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
