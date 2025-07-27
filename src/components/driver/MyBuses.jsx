import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import busService from '../../services/busService';

const MyBuses = () => {
  const { user } = useSelector((state) => state.auth);
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDriverBuses = async () => {
      try {
        setLoading(true);
        const data = await busService.getDriverBuses(user._id);
        setBuses(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch buses');
      } finally {
        setLoading(false);
      }
    };
    
    if (user?._id) {
      fetchDriverBuses();
    }
  }, [user]);

  const handleDeleteBus = async (busId) => {
    if (window.confirm('Are you sure you want to delete this bus? Any scheduled trips will be cancelled.')) {
      try {
        await busService.deleteBus(busId);
        setBuses(buses.filter(bus => bus._id !== busId));
      } catch (err) {
        setError(err.message || 'Failed to delete bus');
      }
    }
  };

  if (loading && buses.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Buses</h1>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      {buses.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-gray-500 mb-4">You haven't registered any buses yet.</p>
          <a 
            href="/driver/register-bus" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105"
          >
            Register Your First Bus
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {buses.map((bus) => (
            <div key={bus._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{bus.model}</h3>
                    <p className="text-sm text-gray-500 mb-2">Reg: {bus.registrationNumber}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    bus.amenities.includes('AC') ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {bus.amenities.includes('AC') ? 'AC' : 'Non-AC'}
                  </span>
                </div>
                
                <div className="mt-4">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                    Capacity: {bus.capacity} passengers
                  </div>
                  
                  <div className="mt-3">
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Amenities:</h4>
                    <div className="flex flex-wrap gap-1">
                      {bus.amenities.map((amenity) => (
                        <span key={amenity} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-between items-center">
                  <button
                    onClick={() => handleDeleteBus(bus._id)}
                    className="text-sm font-medium text-red-600 hover:text-red-900 transition-colors duration-300"
                  >
                    Delete Bus
                  </button>
                  <a
                    href={`/driver/schedule-trip?bus=${bus._id}`}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105"
                  >
                    Schedule Trip
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBuses;