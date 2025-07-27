import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import { FaBus, FaSignOutAlt, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 animate-fade-in">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <FaBus className="text-primary-500 text-2xl" />
          <span className="text-xl font-bold text-gray-800">Matatu Go</span>
        </Link>

        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-600 hover:text-primary-500 transition-colors duration-300">
            Home
          </Link>
          {user?.role === 'customer' && (
            <Link to="/customer" className="text-gray-600 hover:text-primary-500 transition-colors duration-300">
              My Bookings
            </Link>
          )}
          {user?.role === 'driver' && (
            <Link to="/driver" className="text-gray-600 hover:text-primary-500 transition-colors duration-300">
              My Buses
            </Link>
          )}
          {user?.role === 'admin' && (
            <Link to="/admin" className="text-gray-600 hover:text-primary-500 transition-colors duration-300">
              Admin Dashboard
            </Link>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-3">
              <span className="hidden sm:inline text-gray-600">Welcome, {user.name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 bg-red-50 text-red-600 px-3 py-1 rounded-md hover:bg-red-100 transition-colors duration-300"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex space-x-2">
              <Link
                to="/login"
                className="flex items-center space-x-1 bg-primary-50 text-primary-600 px-3 py-1 rounded-md hover:bg-primary-100 transition-colors duration-300"
              >
                <FaSignInAlt />
                <span>Login</span>
              </Link>
              <Link
                to="/register"
                className="flex items-center space-x-1 bg-secondary-50 text-secondary-600 px-3 py-1 rounded-md hover:bg-secondary-100 transition-colors duration-300"
              >
                <FaUserPlus />
                <span>Register</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;