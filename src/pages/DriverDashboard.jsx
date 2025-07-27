import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import MyBuses from '../components/driver/MyBuses';
import ScheduleTrip from '../components/driver/ScheduleTrip';

const DriverDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.role !== 'driver') {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'driver') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Driver Dashboard</h1>
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span className="font-medium text-gray-700">{user.name}</span>
          </div>
        </div>
        
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <Tab.List className="flex space-x-1 rounded-xl bg-indigo-900/20 p-1 mb-6">
            {['My Buses', 'Schedule Trip'].map((tab) => (
              <Tab
                key={tab}
                className={({ selected }) =>
                  `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-indigo-700
                  ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2
                  ${selected
                    ? 'bg-white shadow'
                    : 'text-indigo-600 hover:bg-white/[0.12] hover:text-white'
                  }`
                }
              >
                {tab}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            <Tab.Panel className="rounded-xl bg-white p-6 shadow">
              <MyBuses />
            </Tab.Panel>
            <Tab.Panel className="rounded-xl bg-white p-6 shadow">
              <ScheduleTrip />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default DriverDashboard;