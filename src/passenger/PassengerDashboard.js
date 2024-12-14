import React, { useEffect, useState } from 'react';
import { 
  Train, Users, User, Calendar, CreditCard, 
  UserPlus, LayoutDashboard
} from 'lucide-react';
import { useNavigate } from "react-router-dom";
var nationalID = 101;
var reqID = nationalID;
const SidebarLink = ({ icon: Icon, text, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200
      ${isActive 
        ? 'bg-blue-600 text-white hover:bg-blue-700' 
        : 'text-gray-300 hover:bg-gray-700'
      }`}
  >
    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-300'}`} />
    <span className="font-medium">{text}</span>
  </button>
);

// Enhanced Dashboard Sidebar Component
const DashboardSidebar = ({ userType = 'passenger', activePage, onPageChange }) => {
  const navigation = [
    { icon: LayoutDashboard, text: 'Dashboard' },
    { icon: Train, text: 'Search for Trains' },
    { icon: Calendar, text: 'My Bookings' },
    { icon: UserPlus, text: 'Family Members' }
  ];

  const staffNavigation = [
    { icon: Users, text: 'Manage Passengers' },
    { icon: CreditCard, text: 'Process Refunds' }
  ];

  return (
    <div className="w-64 bg-gray-800 rounded-lg shadow-lg p-4">
      <nav className="space-y-2">
        {navigation.map((item) => (
          <SidebarLink
            key={item.text}
            icon={item.icon}
            text={item.text}
            isActive={activePage === item.text}
            onClick={() => onPageChange(item.text)}
          />
        ))}
        
        {userType === 'staff' && (
          <>
            <div className="my-4 border-t border-gray-700" />
            {staffNavigation.map((item) => (
              <SidebarLink
                key={item.text}
                icon={item.icon}
                text={item.text}
                isActive={activePage === item.text}
                onClick={() => onPageChange(item.text)}
              />
            ))}
          </>
        )}
      </nav>
    </div>
  );
};

// Stats Card Component
const StatsCard = ({ icon: Icon, title, value, description }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <p className="text-2xl font-bold mt-1 text-white">{value}</p>
        <p className="text-gray-500 text-sm mt-1">{description}</p>
      </div>
      <Icon className="w-12 h-12 text-blue-500 opacity-75" />
    </div>
  </div>
);

const DashboardOverview = ({ onPageChange, nationalID }) => {
  const [activeTrains, setActiveTrains] = useState("...");
  const [upcomingTrips, setUpcomingTrips] = useState("...");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingTrips, setIsLoadingTrips] = useState(true);

  useEffect(() => {
    // Fetch active trains
    const fetchActiveTrains = async () => {
      try {
        var response = await fetch('http://localhost:5000/active-trains');
        var data = await response.json();
        setActiveTrains(data.activeTrains.toString());
      } catch (error) {
        console.error('Failed to fetch active trains:', error);
        setActiveTrains("NaN"); // Fallback value
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch upcoming trips
    const fetchUpcomingTrips = async () => {
      try {
        const id = reqID;
        var response = await fetch(`http://localhost:5000/confirmed-reservations?nationalID=${id}`);
        var data = await response.json();
        setUpcomingTrips(data.upcomingTrips.toString());
      } catch (error) {
        console.error('Failed to fetch upcoming trips:', error);
        setUpcomingTrips("NaN"); // Fallback value
      } finally {
        setIsLoadingTrips(false);
      }
    };
    
    fetchActiveTrains();
    fetchUpcomingTrips();
  }, [nationalID]);

  const quickStats = [
    {
      icon: Train,
      title: "Active Trains",
      value: isLoading ? "..." : activeTrains,
      description: "Are in services"
    },
    {
      icon: Calendar,
      title: "Upcoming Trips",
      value: isLoadingTrips ? "..." : upcomingTrips,
      description: "Current reservations"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quickStats.map((stat, index) => (
          <StatsCard
            key={index}
            icon={stat.icon}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            isLoading={index === 0 ? isLoading : isLoadingTrips}
          />
        ))}
      </div>
      {/* Family Members Preview */}
      <MyBookings onPageChange={onPageChange} />
      <FamilyMembers onPageChange={onPageChange} />
    </div>
  );
};

// Search Trains Component
const SearchTrains = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: ''
  });
  const [showResults, setShowResults] = useState(false);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);

  // Helper function to format date as yyyy/MM/dd
  const formatDate = (date) => {
    const selectedDate = new Date(date);
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  };

  // Get today's date in yyyy-MM-dd format for the date input
  const today = new Date().toISOString().split("T")[0];

  // Fetch trips from the backend
  const fetchTrips = async (departingStation, destinationStation, selectedDate) => {
    setLoading(true);
    try {
      const formattedDate = formatDate(selectedDate);
      const response = await fetch(
        `http://localhost:5000/trips?departing_station=${encodeURIComponent(
          departingStation
        )}&destination=${encodeURIComponent(destinationStation)}&date=${encodeURIComponent(
          formattedDate
        )}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch trips");
      }
      const data = await response.json();
      setTrips(data);
    } catch (error) {
      console.error("Error fetching trips:", error);
      setTrips([]);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setShowResults(true);
    fetchTrips(searchParams.from, searchParams.to, searchParams.date);
  };

  const handleBuyTicket = (tripNo) => {
    console.log(`Buying ticket for Trip# ${tripNo}`);
    navigate('/pay', {
      state: {
        tripNo: tripNo,    // Replace with actual trip number
        nationalID: nationalID  // Replace with actual national ID
      }
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white">Search for Trains</h2>
      
      {/* Search Form */}
      <div className="bg-gray-800 p-6 rounded-lg shadow">
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">From</label>
              <select 
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"                value={searchParams.from}
                onChange={(e) => setSearchParams({...searchParams, from: e.target.value})}
                required
              >
                <option value="">Select Station</option>
                <option value="Dammam Station">Dammam Station</option>
                <option value="Riyadh Station">Riyadh Station</option>
                <option value="Jeddah Station">Jeddah Station</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">To</label>
              <select 
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                value={searchParams.to}
                onChange={(e) => setSearchParams({...searchParams, to: e.target.value})}
                required
              >
                <option value="">Select Station</option>
                <option value="Dammam Station">Dammam Station</option>
                <option value="Riyadh Station">Riyadh Station</option>
                <option value="Jeddah Station">Jeddah Station</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input 
                type="date"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                value={searchParams.date}
                onChange={(e) => setSearchParams({...searchParams, date: e.target.value})}
                min={today}
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button 
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search Trains
            </button>
          </div>
        </form>
      </div>

      {/* Search Results */}
      {showResults && (
        <div className="bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4 text-white">Available Trips</h3>
          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-400">Loading trips...</p>
            </div>
          ) : trips.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Trip#</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Train Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Departing Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Arrival Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Cost</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {trips.map((trip) => (
                    <tr key={trip.TripNo}>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">{trip.TripNo}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">{trip.English_Name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">{trip.Departing_Time}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">{trip.Arrival_Time}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">{trip.Cost}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                        <button
                          onClick={() => handleBuyTicket(trip.TripNo)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Book Now
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400">No trips available for the selected route and date.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// My Bookings Component
const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`http://localhost:5000/reservations?id=${reqID}`);
        const data = await response.json();
        setBookings(data); // Store the backend data directly
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white">My Bookings</h2>
      {bookings.length === 0 ? (
        <p className="text-gray-400 text-center">You don't have any bookings yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bookings.map((booking, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Reservation number:</span> {booking.Reservation_ID}
                  </p>
                  <h3 className="font-bold text-white mt-2">
                    Train - {booking.Train_Name}
                  </h3>
                  <p className="text-gray-400">
                    {booking.Origin} → {booking.Destination}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    <span className="font-medium">Departure:</span>{" "}
                    {new Date(booking.Departure_Date).toLocaleDateString()} - {booking.Departure_Time}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    booking.Reservation_Status === "C"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {booking.Reservation_Status === "C" ? "Confirmed" : "Unconfirmed"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};



// Family Members Component
const FamilyMembers = ({ onPageChange }) => {
  const [familyMembers, setFamilyMembers] = useState([]);
  useEffect(() => {
    const fetchFamilyMembers = async () => {
      try {
        const response = await fetch(`http://localhost:5000/dependent?id=${nationalID}`);
        const data = await response.json();
        setFamilyMembers(data);
      } catch (error) {
        console.error('Error fetching family members:', error);
      }
    };

    fetchFamilyMembers();
  }, []);

  return (
    <div className="bg-gray-800 rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Family Members</h2>
        <button
          onClick={() => onPageChange('Family Members')}
          className="text-blue-500 hover:text-blue-400"
        >
          Manage
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {familyMembers.map((member, index) => (
          <div key={index} className="border border-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-white">{member.Name}</h3>
                <p className="text-sm text-gray-500">{member.Relationship}</p>
              </div>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                25% Discount
              </span>
            </div>
          </div>
        ))}
        <button className="border border-gray-700 rounded-lg p-4 flex items-center justify-center text-blue-500 hover:text-blue-400 hover:bg-gray-700">
          + Add Family Member
        </button>
      </div>
    </div>
  );
};

// Main Dashboard Component
const PassengerDashboard = () => {
  const [activePage, setActivePage] = useState('Dashboard');

  const renderContent = () => {
    switch (activePage) {
      case 'Dashboard':
        return <DashboardOverview onPageChange={setActivePage} />;
      case 'Search for Trains':
        return <SearchTrains />;
      case 'My Bookings':
        return <MyBookings />;
      case 'Family Members':
        return <FamilyMembers />;
      default:
        return <DashboardOverview onPageChange={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Train className="w-6 h-6" />
            <span className="text-xl font-bold">Saudi Railways</span>
          </div>
          <div className="flex items-center space-x-4">
            <UserProfile />
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-4">
        <div className="flex gap-4">
          <DashboardSidebar 
            activePage={activePage} 
            onPageChange={setActivePage}
          />
          <main className="flex-1">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

// User Profile Component
const UserProfile = () => {
  const navigate = useNavigate(); // Correctly place the hook here

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
          <User className="w-5 h-5" />
        </div>
        <span>User</span>
      </div>
      <button
        className="flex items-center space-x-2 px-3 py-1 bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors duration-200"
        onClick={() => navigate("/")}
      >
        <span>Logout</span>
      </button>
    </div>
  );
};


export default function PassengerApp() {
  return <PassengerDashboard />;
}