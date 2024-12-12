import React, { useState } from 'react';
import { Table, Eye, Edit, X, CheckCircle, AlertCircle } from 'lucide-react';

const StaffDashboard = () => {
  const [activeTab, setActiveTab] = useState('reservations');
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Staff Dashboard</h1>
      
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <TabButton 
            active={activeTab === 'reservations'} 
            onClick={() => setActiveTab('reservations')}
            text="Reservations"
          />
          <TabButton 
            active={activeTab === 'trains'} 
            onClick={() => setActiveTab('trains')}
            text="Train Management"
          />
          <TabButton 
            active={activeTab === 'waiting'} 
            onClick={() => setActiveTab('waiting')}
            text="Waiting List"
          />
        </nav>
      </div>
      
      {/* Tab Content */}
      {activeTab === 'reservations' && <ReservationsList />}
      {activeTab === 'trains' && <TrainManagement />}
      {activeTab === 'waiting' && <WaitingList />}
    </div>
  );
};

const TabButton = ({ active, onClick, text }) => (
  <button
    className={`py-2 px-1 border-b-2 font-medium text-sm ${
      active
        ? 'border-blue-500 text-blue-600'
        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
    }`}
    onClick={onClick}
  >
    {text}
  </button>
);

const ReservationsList = () => {
  const reservations = [
    {
      id: 'RES001',
      passenger: 'Ahmed Mohammed',
      train: 'HHR100',
      date: '2024-12-15',
      status: 'confirmed',
      from: 'Riyadh',
      to: 'Jeddah'
    },
    // Add more sample reservations
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Current Reservations</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search reservations..."
            className="px-4 py-2 border rounded-md"
          />
          <select className="px-4 py-2 border rounded-md">
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Reservation ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Passenger
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Train
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Route
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {reservation.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {reservation.passenger}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {reservation.train}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {reservation.from} → {reservation.to}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {reservation.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={reservation.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <ActionButton icon={Eye} onClick={() => {}} />
                    <ActionButton icon={Edit} onClick={() => {}} />
                    <ActionButton icon={X} onClick={() => {}} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    confirmed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${styles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const ActionButton = ({ icon: Icon, onClick }) => (
  <button
    onClick={onClick}
    className="p-1 hover:bg-gray-100 rounded-full"
  >
    <Icon className="w-5 h-5 text-gray-500" />
  </button>
);

const TrainManagement = () => {
  const trains = [
    {
      id: 'HHR100',
      nameEn: 'Haramain Express',
      nameAr: 'قطار الحرمين السريع',
      status: 'active',
      capacity: 450,
      currentRoute: 'Makkah - Madinah',
      lastMaintenance: '2024-11-30'
    },
    {
      id: 'SAR200',
      nameEn: 'Riyadh Express',
      nameAr: 'قطار الرياض السريع',
      status: 'active',
      capacity: 380,
      currentRoute: 'Riyadh - Dammam',
      lastMaintenance: '2024-12-05'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Train Management</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
          Add New Train
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name (EN/AR)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Capacity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Route</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Maintenance</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {trains.map((train) => (
              <tr key={train.id}>
                <td className="px-6 py-4 whitespace-nowrap">{train.id}</td>
                <td className="px-6 py-4">
                  <div>{train.nameEn}</div>
                  <div className="text-sm text-gray-500">{train.nameAr}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={train.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{train.capacity}</td>
                <td className="px-6 py-4 whitespace-nowrap">{train.currentRoute}</td>
                <td className="px-6 py-4 whitespace-nowrap">{train.lastMaintenance}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <ActionButton icon={Edit} onClick={() => {}} />
                    <ActionButton icon={CheckCircle} onClick={() => {}} />
                    <ActionButton icon={AlertCircle} onClick={() => {}} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const WaitingList = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Waiting List Management</h2>
      {/* Add waiting list implementation */}
      <p className="text-gray-500">Waiting list feature coming soon...</p>
    </div>
  );
};

export default StaffDashboard;