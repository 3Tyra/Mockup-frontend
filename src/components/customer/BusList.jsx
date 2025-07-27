import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBus, FaStar, FaChair, FaClock } from 'react-icons/fa';

const BusList = ({ searchParams }) => {
  // Mock data - doesn't need state since it never changes
  const buses = [
    {
      id: 1,
      name: 'Swift Deluxe',
      operator: 'Swift Travels',
      departure: '08:00 AM',
      arrival: '12:30 PM',
      duration: '4h 30m',
      price: 1200,
      seats: 32,
      available: 15,
      rating: 4.5,
      amenities: ['AC', 'WiFi', 'Charging Ports', 'Water Bottle'],
    },
    {
      id: 2,
      name: 'Comfort Express',
      operator: 'Comfort Lines',
      departure: '10:15 AM',
      arrival: '03:00 PM',
      duration: '4h 45m',
      price: 950,
      seats: 40,
      available: 22,
      rating: 4.2,
      amenities: ['AC', 'Reclining Seats'],
    },
    {
      id: 3,
      name: 'Premium Sleeper',
      operator: 'Luxury Buses',
      departure: '11:30 PM',
      arrival: '05:00 AM',
      duration: '5h 30m',
      price: 1500,
      seats: 20,
      available: 8,
      rating: 4.8,
      amenities: ['AC', 'WiFi', 'Sleeper Seats', 'Blanket', 'Snacks'],
    },
  ];

  const [sortBy, setSortBy] = useState('departure');

  const sortedBuses = [...buses].sort((a, b) => {
    if (sortBy === 'departure') {
      return a.departure.localeCompare(b.departure);
    } else if (sortBy === 'price') {
      return a.price - b.price;
    } else if (sortBy === 'duration') {
      return a.duration.localeCompare(b.duration);
    } else if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return 0;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-700">
          {buses.length} buses found
        </h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
          >
            <option value="departure">Departure Time</option>
            <option value="price">Price</option>
            <option value="duration">Duration</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {sortedBuses.map((bus) => (
        <div
          key={bus.id}
          className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <div className="p-4 bg-white">
            <div className="flex justify-between items-start">
              <div className="flex items-start space-x-4">
                <div className="bg-primary-100 p-3 rounded-full">
                  <FaBus className="text-primary-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{bus.name}</h3>
                  <p className="text-sm text-gray-600">{bus.operator}</p>
                  <div className="flex items-center mt-1 space-x-2">
                    <span className="flex items-center text-sm text-gray-600">
                      <FaStar className="text-yellow-400 mr-1" />
                      {bus.rating}
                    </span>
                    <span className="text-sm text-gray-600">•</span>
                    <span className="flex items-center text-sm text-gray-600">
                      <FaChair className="text-gray-500 mr-1" />
                      {bus.available} seats left
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-xl font-bold text-primary-600">₹{bus.price}</p>
                <p className="text-sm text-gray-500">per seat</p>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <FaClock className="text-gray-400 mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Departure</p>
                  <p className="text-sm text-gray-600">{bus.departure}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <FaClock className="text-gray-400 mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Arrival</p>
                  <p className="text-sm text-gray-600">{bus.arrival}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <FaClock className="text-gray-400 mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Duration</p>
                  <p className="text-sm text-gray-600">{bus.duration}</p>
                </div>
              </div>
            </div>
            
            {bus.amenities && bus.amenities.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Amenities:</p>
                <div className="flex flex-wrap gap-2">
                  {bus.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-6 flex justify-end">
              <Link
                to={`/booking/${bus.id}`}
                state={{ bus, searchParams }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-transform duration-200 hover:scale-105"
              >
                View Seats & Book
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BusList;