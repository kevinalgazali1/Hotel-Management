import React from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import LoginRegister from './components/LoginRegister/LoginRegister';
import ListBooking from './components/ListBooking';
import ListFacilities from './components/ListFacilities';
import ListReview from './components/ListReview';

// Pages
import Home from './pages/Home';
import RoomDetails from './pages/RoomDetails';
import Admin from './pages/Admin';
import Facilities from './pages/FacilityPages';
import Review from './pages/ReviewPages';

const App = () => {
  const location = useLocation();
  const isLoginRegisterPage = location.pathname === '/';
  const isAdminPage = location.pathname === '/admin';
  const isListBookingPage = location.pathname === '/list-booking';
  const isListFacilitiesPage = location.pathname === '/list-facilities';
  const isListReviewPage = location.pathname === '/list-review';

  return (
    <AuthProvider>
      <div>
        {!isLoginRegisterPage && !isAdminPage && !isListBookingPage && !isListFacilitiesPage && !isListReviewPage && <Header />}
        <Routes>
          <Route path="/" element={<LoginRegister />} />
          <Route path="/home" element={<ProtectedRoute role="user"><Home /></ProtectedRoute>} />
          <Route path="/rooms/:id" element={<ProtectedRoute role="user"><RoomDetails /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute role="admin"><Admin /></ProtectedRoute>} />
          <Route path="/facilities" element={<ProtectedRoute role="user"><Facilities /></ProtectedRoute>} />
          <Route path="/review" element={<ProtectedRoute role="user"><Review /></ProtectedRoute>} />
          <Route path="/list-booking" element={<ProtectedRoute role="admin"><ListBooking /></ProtectedRoute>} />
          <Route path="/list-facilities" element={<ProtectedRoute role="admin"><ListFacilities /></ProtectedRoute>} />
          <Route path="/list-review" element={<ProtectedRoute role="admin"><ListReview /></ProtectedRoute>} />
        </Routes>
        {!isLoginRegisterPage && !isAdminPage && !isListBookingPage && !isListFacilitiesPage && !isListReviewPage && <Footer />}
      </div>
    </AuthProvider>
  );
};

export default App;
