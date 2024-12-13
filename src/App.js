import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Train, Calendar, User } from 'lucide-react';
import Login from "./Login";
import TripSearch from "./passenger/TripSearch";
import PassengerDashboard from "./passenger/PassengerDashboard";
import StaffDashboard from "./staff/StaffDashboard";
import TrainImage from "./assets/train.webp";
// Homepage Component
const Homepage = () => (
  <div className="min-h-screen bg-gray-900 flex flex-col">
    {/* Header */}
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Train className="w-6 h-6" />
          <span className="text-xl font-bold">Saudi Railways</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link 
            to="/login" 
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <User className="w-4 h-4" />
            <span>Login</span>
          </Link>
        </div>
      </div>
    </nav>

    {/* Main Content */}
    <main className="flex-grow container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Hero Section */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Saudi Railways Management System
          </h1>
          <p className="text-xl text-gray-300">
            Experience the most advanced railway system in Saudi Arabia
          </p>
        </div>

        {/* Image Section */}
        <div className="relative rounded-xl overflow-hidden shadow-2xl">
          <div className="aspect-w-16 aspect-h-9">
            <img 
              src={TrainImage} 
              alt="Modern train" 
              className="object-cover w-full h-full"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-40"></div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
          <Link 
            to="/login" 
            className="flex items-center justify-center space-x-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <User className="w-5 h-5" />
            <span>Login to Your Account</span>
          </Link>
          <Link 
            to="/trips-schedule" 
            className="flex items-center justify-center space-x-2 px-8 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <Calendar className="w-5 h-5" />
            <span>View Train Schedule</span>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-blue-500 mb-4">
              <Train className="w-8 h-8 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Modern Fleet</h3>
            <p className="text-gray-400">Experience travel in our state-of-the-art trains</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-blue-500 mb-4">
              <Calendar className="w-8 h-8 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Easy Booking</h3>
            <p className="text-gray-400">Book your tickets online with just a few clicks</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-blue-500 mb-4">
              <User className="w-8 h-8 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">User Friendly</h3>
            <p className="text-gray-400">Manage your bookings with our intuitive interface</p>
          </div>
        </div>
      </div>
    </main>

    {/* Footer */}
    <footer className="bg-gray-800 text-gray-400 py-4">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 Saudi Railways. All rights reserved.</p>
      </div>
    </footer>
  </div>
);

// Main App Component
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/passenger/tripsearch" element={<TripSearch />} />
        <Route path="/passenger" element={<PassengerDashboard />} />
        <Route path="/staffDashboard" element={<StaffDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;