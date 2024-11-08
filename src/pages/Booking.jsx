import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Calendar, Clock } from 'lucide-react';

const Booking = () => {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const bookingData = {
        user_id: 'user123', // Replace with actual user ID from your auth system
        turf_id: '1',
        turf_name: 'Sample Turf',
        booking_date: date,
        start_time: startTime,
        duration: duration,
        total_price: 50 * duration
      };

      const { data, error } = await supabase
        .from('bookings')
        .insert([bookingData])
        .select();

      if (error) throw error;

      navigate('/profile', {
        state: { 
          bookingConfirmed: true,
          bookingDetails: data[0]
        }
      });
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to create booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Book Your Slot</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-500 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="pl-10 w-full border rounded-lg p-2"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Start Time</label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="pl-10 w-full border rounded-lg p-2"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Duration (hours)</label>
          <select
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full border rounded-lg p-2"
          >
            {[1, 2, 3, 4].map(hour => (
              <option key={hour} value={hour}>{hour} hour{hour > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full ${
            isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
          } text-white py-2 px-4 rounded-lg transition-colors duration-300`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
              <span>Processing...</span>
            </div>
          ) : (
            'Confirm Booking'
          )}
        </button>
      </form>
    </div>
  );
};

export default Booking;