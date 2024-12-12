import React, { useState } from 'react';
import {
  Bell,
  Train,
  Users,
  User,
  Calendar,
  Clock,
  CreditCard,
  List,
  Search,
} from 'lucide-react';

// Layout Component
const Layout = ({ children, userType, setUserType }) => {
  const [currentUser, setCurrentUser] = useState({ name: 'John Doe' });

  return (
    
  
         
       
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Train className="w-6 h-6" />
            <span className="text-xl font-bold">Saudi Railways
            </span>
          </div>
          <div className="flex items-center space-x-4">
            {userType !== 'guest' && (
              <>
                <Bell className="w-5 h-5 cursor-pointer" />
                <span className="cursor-pointer">{currentUser?.name}</span>
              </>
            )}
            <button
              onClick={() => setUserType(userType === 'guest' ? 'passenger' : 'guest')}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              {userType === 'guest' ? 'Login' : 'Logout'}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Layout */}
      <div className="container mx-auto p-4">
        <div className="flex gap-4">
          {/* Sidebar */}
          <Sidebar userType={userType} />

          {/* Content */}
          <div className="flex-1 bg-white rounded-lg shadow-lg p-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// Sidebar Component
const Sidebar = ({ userType }) => {
  return (
    <div className="w-64 bg-white rounded-lg shadow-lg p-4 h-fit">
      <nav className="space-y-2">
        <SidebarLink icon={Train} text="Trains" />
        <SidebarLink icon={Calendar} text="Schedules" />
        <SidebarLink icon={User} text="My Bookings" />
        {userType === 'staff' && (
          <>
            <SidebarLink icon={Users} text="Manage Passengers" />
            <SidebarLink icon={List} text="Waiting Lists" />
          </>
        )}
      </nav>
    </div>
  );
};


{/* Define routes for your pages */}
<Router>
      <div>
        <nav>
          {/* Add Navigation Links here */}
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/staff-dashboard">Staff Dashboard</a></li>
          </ul>
        </nav>

        <Switch>
          {/* Define routes for your pages */}
          <Route exact path="/" component={FirstPage} />
          <Route path="/staff-dashboard" component={StaffDashboard} />
        </Switch>
      </div>
    </Router>
// Sidebar Link Component
const SidebarLink = ({ icon: Icon, text }) => (
  <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
    <Icon className="w-5 h-5 text-blue-600" />
    <span>{text}</span>
  </div>
);

// Search Bar Component
const SearchBar = ({ onSearch }) => {
  return (
    <div className="relative mb-4">
      <input
        type="text"
        placeholder="Search for trains or stations..."
        className="w-full p-2 pl-10 rounded-md border border-gray-300 shadow-sm focus:ring focus:ring-blue-300"
        onChange={(e) => onSearch(e.target.value)}
      />
      <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
    </div>
  );
};

// Home Page Component
const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Welcome to Saudi Railways</h1>
      <SearchBar onSearch={(term) => setSearchTerm(term)} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatsCard icon={Train} title="Active Trains" value="24" description="Currently in service" />
        <StatsCard icon={Users} title="Daily Passengers" value="15,000+" description="Average daily ridership" />
        <StatsCard icon={Clock} title="On-Time Rate" value="98%" description="Last 30 days" />
      </div>
    </div>
  );
};

// Stats Card Component
const StatsCard = ({ icon: Icon, title, value, description }) => (
  <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
        <p className="text-gray-600 text-sm mt-1">{description}</p>
      </div>
      <Icon className="w-12 h-12 text-blue-600 opacity-75" />
    </div>
  </div>
);

// Booking Form Component
const BookingForm = () => {
  const [booking, setBooking] = useState({
    from: '',
    to: '',
    date: '',
    class: 'economy',
    passengers: 1,
  });
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Book Your Journey</h2>
      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* From & To */}
          <InputField label="From" value={booking.from} options={['Riyadh', 'Jeddah', 'Dammam']} onChange={(val) => setBooking({ ...booking, from: val })} />
          <InputField label="To" value={booking.to} options={['Riyadh', 'Jeddah', 'Dammam']} onChange={(val) => setBooking({ ...booking, to: val })} />
        </div>
        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Search Trains
        </button>
      </form>
    </div>
  );
};

const InputField = ({ label, value, options, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <select
      className="mt-1 block w-full p-2 border-gray-300 rounded shadow-sm"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Select {label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

export default function App() {
  const [userType, setUserType] = useState('guest');
  return (
    <Layout userType={userType} setUserType={setUserType}>
      <HomePage />
      <BookingForm />
    </Layout>
  );
}
