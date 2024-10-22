import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../utils/auth';

const UserProfile = () => {
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setUser(currentUser);

    // Retrieve bookings from localStorage
    const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const userBookings = storedBookings.filter(booking => booking.userId === currentUser.id);
    setBookings(userBookings);

    // Check if we've just confirmed a booking
    if (location.state && location.state.bookingConfirmed) {
      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 5000); // Hide after 5 seconds
    }
  }, [location, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {showConfirmation && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
          <p className="font-bold">Booking Confirmed!</p>
          <p>Your turf booking has been successfully confirmed.</p>
        </div>
      )}
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">User Profile</h1>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Booking History</h2>
          {bookings.length === 0 ? (
            <p>No bookings yet.</p>
          ) : (
            <ul>
              {bookings.map((booking, index) => (
                <li key={index} className="mb-4 p-4 border rounded">
                  <p><strong>Turf:</strong> {booking.turfName}</p>
                  <p><strong>Date:</strong> {booking.date}</p>
                  <p><strong>Time:</strong> {booking.time}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
