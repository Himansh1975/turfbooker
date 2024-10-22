import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { isAuthenticated, getCurrentUser } from '../utils/auth';
import { 
  Calendar, 
  Clock, 
  Users, 
  Coffee, 
  Droplets as ShowerHead, // Replacing ShowerHead with Droplets for shower icon
  Car, 
  Package, 
  Lightbulb,
  MapPin, 
  DollarSign 
} from 'lucide-react';

const Booking = () => {
  const [turf, setTurf] = useState(null);
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    // Simulate API call with loading state
    setLoading(true);
    setTimeout(() => {
      const mockTurfs = [
        {
          id: 1,
          name: 'Green Field Arena',
          location: 'Downtown',
          price: 50,
          image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e',
          amenities: ['Floodlights', 'Changing Rooms', 'Parking', 'Equipment Rental'],
          capacity: 22
        },
        // ... other turfs
      ];
      const selectedTurf = mockTurfs.find(t => t.id === parseInt(id));
      setTurf(selectedTurf);
      setLoading(false);
    }, 500);
  }, [id, navigate]);

  useEffect(() => {
    if (turf) {
      setTotalPrice(turf.price * duration);
    }
  }, [turf, duration]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = getCurrentUser();
    const bookingData = {
      userId: user.id,
      turfId: turf.id,
      turfName: turf.name,
      date,
      startTime,
      duration,
      totalPrice,
    };

    // Simulate booking submission
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push(bookingData);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    navigate('/profile', {
      state: { bookingConfirmed: true }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!turf) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Turf Not Found</h2>
          <p className="mt-2 text-gray-600">The turf you&apos;re looking for doesn&apos;t exist.</p>
          <button
            onClick={() => navigate('/turfs')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Browse Turfs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative h-64">
            <img
              className="w-full h-full object-cover"
              src={turf.image}
              alt={turf.name}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <h1 className="text-3xl font-bold text-white mb-2">{turf.name}</h1>
              <p className="text-white/90 flex items-center gap-2">
                <Users size={18} />
                <span>Capacity: {turf.capacity} players</span>
              </p>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">Book Your Slot</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="pl-10 w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Time
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="pl-10 w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration (hours)
                    </label>
                    <select
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    >
                      {[1, 2, 3, 4].map(hour => (
                        <option key={hour} value={hour}>{hour} hour{hour > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </form>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                      <span className="text-gray-600">Price per hour</span>
                      <span className="font-semibold">${turf.price}</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-semibold">{duration} hour{duration > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-lg font-semibold">Total Price</span>
                      <span className="text-2xl font-bold text-blue-600">${totalPrice}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <Calendar size={20} />
                    Confirm Booking
                  </button>
                </div>
              </div>
            </div>

            {/* Amenities Section */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {turf.amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                  >
                    {getAmenityIcon(amenity)}
                    <span className="text-sm text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location and Additional Info */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-gray-700 mb-2">
                  <MapPin size={18} />
                  <span className="font-semibold">Location</span>
                </div>
                <p className="text-gray-600">{turf.location}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-gray-700 mb-2">
                  <Users size={18} />
                  <span className="font-semibold">Capacity</span>
                </div>
                <p className="text-gray-600">{turf.capacity} players</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-gray-700 mb-2">
                  <DollarSign size={18} />
                  <span className="font-semibold">Price per Hour</span>
                </div>
                <p className="text-gray-600">${turf.price}</p>
              </div>
            </div>

            {/* Cancellation Policy */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Cancellation Policy</h3>
              <p className="text-blue-600 text-sm">
                Free cancellation up to 24 hours before your booking. After that, a cancellation fee may apply.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get amenity icons
const getAmenityIcon = (amenity) => {
  const iconProps = { size: 20, className: "text-gray-600" };
  switch (amenity.toLowerCase()) {
    case 'cafe':
      return <Coffee {...iconProps} />;
    case 'showers':
      return <ShowerHead {...iconProps} />;
    case 'parking':
      return <Car {...iconProps} />;
    case 'equipment rental':
      return <Package {...iconProps} />;
    case 'floodlights':
      return <Lightbulb {...iconProps} />;
    default:
      return <Package {...iconProps} />;
  }
};

export default Booking;