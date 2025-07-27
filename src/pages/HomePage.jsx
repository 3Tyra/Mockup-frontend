import { useState } from 'react';
import BusList from '../components/customer/BusList';

const HomePage = () => {
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: '',
    passengers: 1,
  });
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    await new Promise((resolve) => setTimeout(resolve, 500)); // simulate API delay
    setShowResults(true);
    setIsSearching(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-500 to-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center animate-slide-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Matatu Go</h1>
            <p className="text-xl mb-8">Book your bus tickets with ease</p>

            {/* Search Form */}
            <form
              onSubmit={handleSubmit}
              className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-6 animate-fade-in"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">From</label>
                  <input
                    type="text"
                    name="from"
                    value={searchParams.from}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Departure city"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">To</label>
                  <input
                    type="text"
                    name="to"
                    value={searchParams.to}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Destination city"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={searchParams.date}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Passengers</label>
                  <select
                    name="passengers"
                    value={searchParams.passengers}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Passenger' : 'Passengers'}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-md transition duration-300 transform hover:scale-105 disabled:opacity-50"
                    disabled={isSearching}
                  >
                    {isSearching ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Searching...
                      </span>
                    ) : (
                      'Search Buses'
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>

        {/* Results Section */}
        {showResults && (
          <section id="results" className="container mx-auto px-4 py-12 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Available Buses from {searchParams.from} to {searchParams.to}
              </h2>
              <button
                onClick={() => setShowResults(false)}
                className="text-primary-600 hover:text-primary-800 font-medium"
              >
                Modify Search
              </button>
            </div>
            <BusList searchParams={searchParams} />
          </section>
        )}

        {/* Features Section */}
        {!showResults && (
          <section className="container mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Why Choose Matatu Go?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Easy Booking',
                  description:
                    'Book your tickets in just a few clicks with our user-friendly interface.',
                  icon: '🚀',
                },
                {
                  title: 'Affordable Prices',
                  description:
                    'Get the best deals and discounts on bus tickets across the country.',
                  icon: '💰',
                },
                {
                  title: 'Safe Travel',
                  description:
                    'Travel with trusted operators and well-maintained buses for a safe journey.',
                  icon: '🛡️',
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default HomePage;
