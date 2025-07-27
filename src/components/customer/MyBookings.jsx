import { useEffect, useState } from 'react';
import { FaBus, FaCalendarAlt, FaMapMarkerAlt, FaRupeeSign, FaTicketAlt } from 'react-icons/fa';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchBookings = async () => {
      try {
        // In a real app, you would fetch from your API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockBookings = [
          {
            id: 'SWIFT123456',
            busName: 'Swift Deluxe',
            from: 'Mumbai',
            to: 'Pune',
            departure: '2023-06-15T08:00:00',
            arrival: '2023-06-15T12:30:00',
            seats: ['A1', 'A2'],
            totalPrice: 2400,
            status: 'confirmed',
          },
          {
            id: 'SWIFT789012',
            busName: 'Comfort Express',
            from: 'Bangalore',
            to: 'Chennai',
            departure: '2023-06-20T10:15:00',
            arrival: '2023-06-20T15:00:00',
            seats: ['B3'],
            totalPrice: 950,
            status: 'cancelled',
          },
        ];
        
        setBookings(mockBookings);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookings();
  }, []);

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  const formatTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString('en-IN', options);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-12">
        <FaTicketAlt className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">No bookings found</h3>
        <p className="mt-1 text-sm text-gray-500">You haven't made any bookings yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">My Bookings</h2>
      
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="bg-white p-6">
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-3 rounded-full">
                    <FaBus className="text-primary-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{booking.busName}</h3>
                    <p className="text-sm text-gray-600">Booking ID: {booking.id}</p>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${
                        booking.status === 'confirmed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {booking.status === 'confirmed' ? 'Confirmed' : 'Cancelled'}
                    </span>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-xl font-bold text-primary-600 flex items-center justify-end">
                    <FaRupeeSign className="mr-1" />
                    {booking.totalPrice}
                  </p>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">From</p>
                    <p className="text-sm text-gray-600">{booking.from}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">To</p>
                    <p className="text-sm text-gray-600">{booking.to}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <FaCalendarAlt className="text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Date</p>
                    <p className="text-sm text-gray-600">{formatDate(booking.departure)}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <FaClock className="text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Departure</p>
                    <p className="text-sm text-gray-600">{formatTime(booking.departure)}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <FaClock className="text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Arrival</p>
                    <p className="text-sm text-gray-600">{formatTime(booking.arrival)}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <FaTicketAlt className="text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Seats</p>
                    <p className="text-sm text-gray-600">{booking.seats.join(', ')}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                {booking.status === 'confirmed' && (
                  <button
                    type="button"
                    className="px-4 py-2 border border-red-500 text-red-600 rounded-md hover:bg-red-50"
                  >
                    Cancel Booking
                  </button>
                )}
                <button
                  type="button"
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  View Ticket
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;