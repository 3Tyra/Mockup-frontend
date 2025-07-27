import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import busService from '../../services/busService';
import bookingService from '../../services/bookingService';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ScheduleTrip = () => {
  const { user } = useSelector((state) => state.auth);
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [scheduledTrips, setScheduledTrips] = useState([]);
  const [formData, setFormData] = useState({
    bus: '',
    route: '',
    departureTime: new Date(),
    arrivalTime: new Date(),
    price: '',
  });
  const [loading, setLoading] = useState({
    buses: false,
    routes: false,
    trips: false,
    submitting: false,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        setLoading(prev => ({ ...prev, buses: true, routes: true, trips: true }));
        
        // Fetch driver's buses
        const busesData = await busService.getDriverBuses(user._id);
        setBuses(busesData);
        
        // Fetch all routes
        const routesData = await busService.getAllRoutes();
        setRoutes(routesData);
        
        // Fetch scheduled trips
        const tripsData = await bookingService.getDriverScheduledTrips(user._id);
        setScheduledTrips(tripsData);
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(prev => ({ ...prev, buses: false, routes: false, trips: false }));
      }
    };
    
    if (user?._id) {
      fetchDriverData();
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // If route is selected, update the price from the route data
    if (name === 'route') {
      const selectedRoute = routes.find(r => r._id === value);
      if (selectedRoute) {
        setFormData(prev => ({
          ...prev,
          price: selectedRoute.price,
        }));
      }
    }
  };

  const handleDateChange = (date, field) => {
    setFormData({
      ...formData,
      [field]: date,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(prev => ({ ...prev, submitting: true }));
      setError('');
      setSuccess('');
      
      const tripData = {
        ...formData,
        driver: user._id,
      };
      
      const newTrip = await bookingService.scheduleTrip(tripData);
      setScheduledTrips([newTrip, ...scheduledTrips]);
      setSuccess('Trip scheduled successfully!');
      
      // Reset form (keep the bus selection)
      setFormData(prev => ({
        bus: prev.bus,
        route: '',
        departureTime: new Date(),
        arrivalTime: new Date(),
        price: '',
      }));
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to schedule trip');
    } finally {
      setLoading(prev => ({ ...prev, submitting: false }));
    }
  };

  const handleCancelTrip = async (tripId) => {
    if (window.confirm('Are you sure you want to cancel this trip? All bookings will be cancelled.')) {
      try {
        await bookingService.cancelScheduledTrip(tripId);
        setScheduledTrips(scheduledTrips.filter(trip => trip._id !== tripId));
        setSuccess('Trip cancelled successfully!');
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError(err.message || 'Failed to cancel trip');
      }
    }
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Schedule a Trip</h1>
      
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
        {/* Schedule Form */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">New Trip Schedule</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="bus" className="block text-sm font-medium text-gray-700 mb-1">
                Select Bus
              </label>
              <select
                id="bus"
                name="bus"
                value={formData.bus}
                onChange={handleChange}
                required
                disabled={loading.buses || buses.length === 0}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              >
                <option value="">-- Select Bus --</option>
                {buses.map((bus) => (
                  <option key={bus._id} value={bus._id}>
                    {bus.model} ({bus.registrationNumber})
                  </option>
                ))}
              </select>
              {loading.buses && <p className="text-xs text-gray-500 mt-1">Loading buses...</p>}
              {!loading.buses && buses.length === 0 && (
                <p className="text-xs text-red-500 mt-1">No buses registered. Please register a bus first.</p>
              )}
            </div>
            
            <div>
              <label htmlFor="route" className="block text-sm font-medium text-gray-700 mb-1">
                Select Route
              </label>
              <select
                id="route"
                name="route"
                value={formData.route}
                onChange={handleChange}
                required
                disabled={loading.routes || routes.length === 0}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              >
                <option value="">-- Select Route --</option>
                {routes.map((route) => (
                  <option key={route._id} value={route._id}>
                    {route.from} → {route.to} (${route.price})
                  </option>
                ))}
              </select>
              {loading.routes && <p className="text-xs text-gray-500 mt-1">Loading routes...</p>}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="departureTime" className="block text-sm font-medium text-gray-700 mb-1">
                  Departure Time
                </label>
                <DatePicker
                  selected={formData.departureTime}
                  onChange={(date) => handleDateChange(date, 'departureTime')}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="arrivalTime" className="block text-sm font-medium text-gray-700 mb-1">
                  Estimated Arrival Time
                </label>
                <DatePicker
                  selected={formData.arrivalTime}
                  onChange={(date) => handleDateChange(date, 'arrivalTime')}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price per Seat ($)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              />
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading.submitting || buses.length === 0 || routes.length === 0}
                className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 ${
                  loading.submitting || buses.length === 0 || routes.length === 0
                    ? 'bg-indigo-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 transform hover:scale-105'
                }`}
              >
                {loading.submitting ? 'Scheduling...' : 'Schedule Trip'}
              </button>
            </div>
          </form>
        </div>
        
        {/* Scheduled Trips */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Scheduled Trips</h2>
          
          {loading.trips && scheduledTrips.length === 0 ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : scheduledTrips.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No trips scheduled yet</p>
          ) : (
            <div className="space-y-4">
              {scheduledTrips.map((trip) => {
                const route = routes.find(r => r._id === trip.route);
                const bus = buses.find(b => b._id === trip.bus);
                
                return (
                  <div key={trip._id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-300">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {route ? `${route.from} → ${route.to}` : 'Unknown Route'}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {bus ? `${bus.model} (${bus.registrationNumber})` : 'Unknown Bus'} • ${trip.price}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-blue-100 text-blue-800">
                            Departure: {formatTime(trip.departureTime)}
                          </span>
                          <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-green-100 text-green-800">
                            Arrival: {formatTime(trip.arrivalTime)}
                          </span>
                          <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-purple-100 text-purple-800">
                            Seats: {trip.availableSeats} available
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleCancelTrip(trip._id)}
                        className="text-red-600 hover:text-red-900 transition-colors duration-300 text-sm font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleTrip;