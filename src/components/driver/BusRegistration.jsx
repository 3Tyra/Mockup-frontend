import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import busService from '../../services/busService';

const BusRegistration = () => {
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    registrationNumber: '',
    model: '',
    capacity: '',
    amenities: [],
  });
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAmenityChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, value],
      });
    } else {
      setFormData({
        ...formData,
        amenities: formData.amenities.filter(item => item !== value),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      const busData = {
        ...formData,
        driver: user._id,
      };
      
      const newBus = await busService.registerBus(busData);
      setBuses([...buses, newBus]);
      setSuccess('Bus registered successfully!');
      setFormData({
        registrationNumber: '',
        model: '',
        capacity: '',
        amenities: [],
      });
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to register bus');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBus = async (busId) => {
    if (window.confirm('Are you sure you want to delete this bus?')) {
      try {
        await busService.deleteBus(busId);
        setBuses(buses.filter(bus => bus._id !== busId));
        setSuccess('Bus deleted successfully!');
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError(err.message || 'Failed to delete bus');
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Bus Registration</h1>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 animate-bounce">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 animate-pulse">
          {success}
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Registration Form */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Register New Bus</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Registration Number
              </label>
              <input
                type="text"
                id="registrationNumber"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              />
            </div>
            
            <div>
              <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
                Bus Model
              </label>
              <input
                type="text"
                id="model"
                name="model"
                value={formData.model}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              />
            </div>
            
            <div>
              <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
                Passenger Capacity
              </label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
              <div className="grid grid-cols-2 gap-2">
                {['AC', 'WiFi', 'TV', 'Charging Ports', 'Toilet', 'Refreshments'].map((amenity) => (
                  <div key={amenity} className="flex items-center">
                    <input
                      type="checkbox"
                      id={amenity}
                      value={amenity}
                      checked={formData.amenities.includes(amenity)}
                      onChange={handleAmenityChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor={amenity} className="ml-2 text-sm text-gray-700">
                      {amenity}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 ${
                  loading
                    ? 'bg-indigo-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 transform hover:scale-105'
                }`}
              >
                {loading ? 'Registering...' : 'Register Bus'}
              </button>
            </div>
          </form>
        </div>
        
        {/* Registered Buses */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Registered Buses</h2>
          
          {loading && buses.length === 0 ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : buses.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No buses registered yet</p>
          ) : (
            <div className="space-y-4">
              {buses.map((bus) => (
                <div key={bus._id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-300">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{bus.model}</h3>
                      <p className="text-sm text-gray-500">Reg: {bus.registrationNumber}</p>
                      <p className="text-sm text-gray-500">Capacity: {bus.capacity} passengers</p>
                      <div className="mt-2">
                        <span className="text-xs font-medium mr-2 px-2.5 py-0.5 rounded bg-blue-100 text-blue-800">
                          {bus.amenities.includes('AC') ? 'AC' : 'Non-AC'}
                        </span>
                        {bus.amenities.filter(a => a !== 'AC').map((amenity) => (
                          <span key={amenity} className="text-xs font-medium mr-2 px-2.5 py-0.5 rounded bg-gray-100 text-gray-800">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteBus(bus._id)}
                      className="text-red-600 hover:text-red-900 transition-colors duration-300 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusRegistration;