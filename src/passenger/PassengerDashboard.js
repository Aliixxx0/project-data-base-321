import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { 
  Train, Users, User, Calendar, CreditCard, 
  List, Award, UserPlus, Package, AlertCircle 
} from 'lucide-react';
// Dashboard Layout Component
const DashboardLayout = ({ children, userType = 'passenger' }) => {
  const [notifications, setNotifications] = useState([]);
  const [loyaltyInfo, setLoyaltyInfo] = useState({
    miles: 75000,
    tier: 'Silver',
    discount: 10
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Train className="w-6 h-6" />
            <span className="text-xl font-bold">Saudi Railways</span>
            <span className="text-lg mr-4">قطار السعودية</span>
          </div>
          <div className="flex items-center space-x-4">
            <LoyaltyBadge tier={loyaltyInfo.tier} miles={loyaltyInfo.miles} />
            <NotificationBell count={notifications.length} />
            <UserProfile />
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-4">
        <div className="flex gap-4">
          <DashboardSidebar userType={userType} />
          <main className="flex-1 space-y-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

// Loyalty Badge Component
const LoyaltyBadge = ({ tier, miles }) => (
  <div className="flex items-center bg-blue-700 rounded-full px-3 py-1">
    <Award className="w-4 h-4 mr-2" />
    <span className="text-sm">{tier} ({miles.toLocaleString()} miles)</span>
  </div>
);

// Notification Bell Component
const NotificationBell = ({ count }) => (
  <div className="relative">
    <div className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 text-xs flex items-center justify-center">
      {count}
    </div>
    <AlertCircle className="w-5 h-5" />
  </div>
);

// User Profile Component
const UserProfile = () => (
  <div className="flex items-center space-x-2">
    <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
      <User className="w-5 h-5" />
    </div>
    <span>Abdullah</span>
  </div>
);

// Dashboard Sidebar Component
const DashboardSidebar = ({ userType }) => (
  <div className="w-64 bg-white rounded-lg shadow-lg p-4">
    <nav className="space-y-2">
    <SidebarLink icon={Train} text="Search for Trips" to="/passenger/tripsearch" />
      <SidebarLink icon={Calendar} text="My Bookings" />
      <SidebarLink icon={Package} text="Luggage Status" />
      <SidebarLink icon={UserPlus} text="Family Members" />
      <SidebarLink icon={Award} text="Loyalty Program" />
      <SidebarLink icon={List} text="Waiting List" />
      {userType === 'staff' && (
        <>
          <SidebarLink icon={Users} text="Manage Passengers" />
          <SidebarLink icon={CreditCard} text="Process Refunds" />
        </>
      )}
    </nav>
  </div>
);

// Booking Card Component
const BookingCard = ({ booking }) => (
  <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-bold text-lg">{booking.trainName}</h3>
        <p className="text-gray-600">{booking.trainNameAr}</p>
      </div>
      <span className={`px-2 py-1 rounded text-sm ${
        booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
        booking.status === 'Waiting' ? 'bg-yellow-100 text-yellow-800' :
        'bg-red-100 text-red-800'
      }`}>
        {booking.status}
      </span>
    </div>
    <div className="mt-4 grid grid-cols-2 gap-4">
      <div>
        <p className="text-sm text-gray-500">From</p>
        <p className="font-medium">{booking.from}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">To</p>
        <p className="font-medium">{booking.to}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Date</p>
        <p className="font-medium">{booking.date}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Class</p>
        <p className="font-medium">{booking.class}</p>
      </div>
    </div>
    <div className="mt-4 flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-500">Seat</p>
        <p className="font-medium">{booking.seatNumber}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Price</p>
        <p className="font-medium">SAR {booking.price}</p>
      </div>
      <button className="text-red-600 hover:text-red-800">
        Cancel Booking
      </button>
    </div>
  </div>
);

// Passenger Dashboard Main Content
const PassengerDashboard = () => {
  const [activeBookings, setActiveBookings] = useState([
    {
      id: 1,
      trainName: 'HHR100',
      trainNameAr: 'قطار الحرمين السريع',
      status: 'Confirmed',
      from: 'Riyadh',
      to: 'Jeddah',
      date: '2024-12-15',
      class: 'Business',
      seatNumber: '12A',
      price: 450
    },
    {
      id: 2,
      trainName: 'DMM200',
      trainNameAr: 'قطار الدمام',
      status: 'Waiting',
      from: 'Dammam',
      to: 'Riyadh',
      date: '2024-12-20',
      class: 'Economy',
      seatNumber: 'Pending',
      price: 250
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatsCard
          icon={Train}
          title="Active Bookings"
          value={activeBookings.length}
          description="Current reservations"
        />
        <StatsCard
          icon={Award}
          title="Loyalty Miles"
          value="75,000"
          description="Silver Tier Member"
        />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Your Bookings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeBookings.map(booking => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Family Members</h2>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FamilyMemberCard
              name="Sara Ahmed"
              relation="Spouse"
              discount={25}
              id="1234567890"
            />
            <FamilyMemberCard
              name="Youssef Ahmed"
              relation="Child"
              discount={25}
              id="0987654321"
            />
          </div>
          <button className="mt-4 text-blue-600 hover:text-blue-800">
            + Add Family Member
          </button>
        </div>
      </div>
    </div>
  );
};

// Family Member Card Component
const FamilyMemberCard = ({ name, relation, discount, id }) => (
  <div className="border rounded-lg p-4">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-medium">{name}</h3>
        <p className="text-sm text-gray-500">{relation}</p>
        <p className="text-sm text-gray-500">ID: {id}</p>
      </div>
      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
        {discount}% Discount
      </span>
    </div>
  </div>
);

// Stats Card Component (reused from your original code)
const StatsCard = ({ icon: Icon, title, value, description }) => (
  <div className="bg-white p-6 rounded-lg shadow">
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

// Sidebar Link Component (reused from your original code)
const SidebarLink = ({ icon: Icon, text, to }) => (
  <Link to={to} className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
  <Icon className="w-5 h-5 text-blue-600" />
  <span>{text}</span>
  </Link>
  );

// Export the main component
export default function Passenger() {
  return (
    <DashboardLayout>
      <PassengerDashboard />
    </DashboardLayout>
  );
}