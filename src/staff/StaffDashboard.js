import React, { useState } from 'react';
import { Table, Eye, Edit, X, CheckCircle, AlertCircle, UserPlus, ArrowUpCircle } from 'lucide-react';

// Custom Dialog Components
const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
        <div className="relative">
          {children}
        </div>
      </div>
    </div>
  );
};

const DialogContent = ({ children, className = "" }) => (
  <div className={`space-y-4 ${className}`}>{children}</div>
);

const DialogHeader = ({ children }) => (
  <div className="mb-4">{children}</div>
);

const DialogTitle = ({ children }) => (
  <h2 className="text-lg font-semibold">{children}</h2>
);

const DialogDescription = ({ children }) => (
  <p className="text-sm text-gray-500">{children}</p>
);

// Custom Form Components
const Button = ({ children, variant = "default", type = "button", className = "", onClick }) => {
  const baseStyles = "px-4 py-2 rounded-md font-medium transition-colors duration-200";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50"
  };
  
  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const Input = ({ id, type = "text", value, onChange, className = "", placeholder }) => (
  <input
    id={id}
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
  />
);

const Label = ({ children, htmlFor, className = "" }) => (
  <label
    htmlFor={htmlFor}
    className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}
  >
    {children}
  </label>
);

const Select = ({ value, onValueChange, children }) => (
  <select
    value={value}
    onChange={(e) => onValueChange(e.target.value)}
    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    {children}
  </select>
);

const SelectItem = ({ value, children }) => (
  <option value={value}>{children}</option>
);

// Reusable Components
const TabButton = ({ active, onClick, text }) => (
  <button
    className={`py-2 px-4 border-b-2 font-medium text-sm ${
      active
        ? 'border-blue-500 text-blue-600'
        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
    }`}
    onClick={onClick}
  >
    {text}
  </button>
);

const StatusBadge = ({ status }) => {
  const styles = {
    confirmed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    cancelled: 'bg-red-100 text-red-800',
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800'
  };

  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const ActionButton = ({ icon: Icon, onClick, title }) => (
  <button
    onClick={onClick}
    className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
    title={title}
  >
    <Icon className="w-5 h-5 text-gray-500 hover:text-gray-700" />
  </button>
);
const StaffDashboard = () => {
  const [activeTab, setActiveTab] = useState('reservations');
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [showStaffAssignModal, setShowStaffAssignModal] = useState(false);
  const [showNewTrainModal, setShowNewTrainModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [selectedTrain, setSelectedTrain] = useState(null);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Staff Dashboard</h1>
      
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
          <TabButton 
            active={activeTab === 'reports'} 
            onClick={() => setActiveTab('reports')}
            text="Reports"
          />
        </nav>
      </div>
      
      {activeTab === 'reservations' && (
        <ReservationsList 
          onEdit={(reservation) => {
            setSelectedReservation(reservation);
            setShowReservationModal(true);
          }}
        />
      )}
      {activeTab === 'trains' && (
        <TrainManagement 
          onAssignStaff={(train) => {
            setSelectedTrain(train);
            setShowStaffAssignModal(true);
          }}
          onAddTrain={() => setShowNewTrainModal(true)}
        />
      )}
      {activeTab === 'waiting' && <WaitingList />}
      {activeTab === 'reports' && <Reports />}

      {/* Existing modals remain unchanged */}
      <ReservationModal 
        open={showReservationModal}
        onClose={() => setShowReservationModal(false)}
        reservation={selectedReservation}
      />

      <StaffAssignmentModal
        open={showStaffAssignModal}
        onClose={() => setShowStaffAssignModal(false)}
        train={selectedTrain}
      />

      <NewTrainModal
        open={showNewTrainModal}
        onClose={() => setShowNewTrainModal(false)}
      />
    </div>
  );
};
// Main Dashboard Component

// Reservations List Component
const ReservationsList = ({ onEdit }) => {
  const reservations = [
    {
      id: 'RES001',
      passenger: 'Ahmed Mohammed',
      train: 'HHR100',
      date: '2024-12-15',
      status: 'confirmed',
      from: 'Riyadh',
      to: 'Jeddah'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Current Reservations</h2>
        <div className="flex space-x-2">
          <Button onClick={() => onEdit(null)}>
            New Reservation
          </Button>
          <Input
            type="text"
            placeholder="Search reservations..."
            className="px-4 py-2"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Passenger</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Train</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Route</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td className="px-6 py-4 whitespace-nowrap">{reservation.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{reservation.passenger}</td>
                <td className="px-6 py-4 whitespace-nowrap">{reservation.train}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {reservation.from} → {reservation.to}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{reservation.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={reservation.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <ActionButton icon={Edit} onClick={() => onEdit(reservation)} title="Edit" />
                    <ActionButton icon={X} onClick={() => {}} title="Cancel" />
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

// Reservation Modal Component
const ReservationModal = ({ open, onClose, reservation }) => {
  const [formData, setFormData] = useState(
    reservation || {
      passenger: '',
      train: '',
      date: '',
      from: '',
      to: '',
    }
  );

  const stations = [
    'Riyadh', 'Jeddah', 'Makkah', 'Madinah', 'Dammam',
    'Qassim', 'Hail', 'Tabuk', 'Abha', 'Jazan'
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {reservation ? 'Edit Reservation' : 'New Reservation'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={(e) => {
          e.preventDefault();
          console.log('Saving reservation:', formData);
          onClose();
        }} className="space-y-4">
          <div>
            <Label htmlFor="passenger">Passenger Name</Label>
            <Input
              id="passenger"
              value={formData.passenger}
              onChange={(e) => setFormData({...formData, passenger: e.target.value})}
            />
          </div>
          
          <div>
            <Label htmlFor="train">Train</Label>
            <Select
              value={formData.train}
              onValueChange={(value) => setFormData({...formData, train: value})}
            >
              <SelectItem value="">Select train</SelectItem>
              <SelectItem value="HHR100">Haramain Express (HHR100)</SelectItem>
              <SelectItem value="SAR200">Riyadh Express (SAR200)</SelectItem>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="from">From</Label>
              <Select
                value={formData.from}
                onValueChange={(value) => setFormData({...formData, from: value})}
              >
                <SelectItem value="">Select departure</SelectItem>
                {stations.map((station) => (
                  <SelectItem key={station} value={station}>{station}</SelectItem>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="to">To</Label>
              <Select
                value={formData.to}
                onValueChange={(value) => setFormData({...formData, to: value})}
              >
                <SelectItem value="">Select destination</SelectItem>
                {stations.filter(station => station !== formData.from).map((station) => (
                  <SelectItem key={station} value={station}>{station}</SelectItem>
                ))}
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Staff Assignment Modal Component
// Continuing Staff Assignment Modal Component
const StaffAssignmentModal = ({ open, onClose, train }) => {
  const [formData, setFormData] = useState({
    driver: '',
    engineer: '',
    date: '',
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Staff to Train</DialogTitle>
          <DialogDescription>
            {train ? `Assigning staff to ${train.nameEn} (${train.id})` : ''}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={(e) => {
          e.preventDefault();
          console.log('Assigning staff:', formData);
          onClose();
        }} className="space-y-4">
          <div>
            <Label htmlFor="driver">Driver</Label>
            <Select
              value={formData.driver}
              onValueChange={(value) => setFormData({...formData, driver: value})}
            >
              <SelectItem value="">Select driver</SelectItem>
              <SelectItem value="DRV001">Mohammed Ali</SelectItem>
              <SelectItem value="DRV002">Abdullah Ahmed</SelectItem>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="engineer">Engineer</Label>
            <Select
              value={formData.engineer}
              onValueChange={(value) => setFormData({...formData, engineer: value})}
            >
              <SelectItem value="">Select engineer</SelectItem>
              <SelectItem value="ENG001">Khalid Omar</SelectItem>
              <SelectItem value="ENG002">Hassan Ibrahim</SelectItem>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="assignDate">Assignment Date</Label>
            <Input
              id="assignDate"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Assign Staff
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// New Train Modal Component
const NewTrainModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    id: '',
    nameEn: '',
    nameAr: '',
    capacity: '',
    currentRoute: ''
  });

  const routes = [
    'Makkah - Madinah',
    'Riyadh - Dammam',
    'Jeddah - Riyadh',
    'Makkah - Jeddah',
    'Riyadh - Qassim',
    'Dammam - Riyadh',
    'Madinah - Riyadh'
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Train</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={(e) => {
          e.preventDefault();
          console.log('Adding new train:', formData);
          onClose();
        }} className="space-y-4">
          <div>
            <Label htmlFor="trainId">Train ID</Label>
            <Input
              id="trainId"
              value={formData.id}
              onChange={(e) => setFormData({...formData, id: e.target.value})}
              placeholder="e.g., HHR103"
            />
          </div>
          
          <div>
            <Label htmlFor="nameEn">Name (English)</Label>
            <Input
              id="nameEn"
              value={formData.nameEn}
              onChange={(e) => setFormData({...formData, nameEn: e.target.value})}
              placeholder="e.g., Haramain Express"
            />
          </div>
          
          <div>
            <Label htmlFor="nameAr">Name (Arabic)</Label>
            <Input
              id="nameAr"
              value={formData.nameAr}
              onChange={(e) => setFormData({...formData, nameAr: e.target.value})}
              placeholder="e.g., قطار الحرمين السريع"
            />
          </div>
          
          <div>
            <Label htmlFor="capacity">Capacity</Label>
            <Input
              id="capacity"
              type="number"
              value={formData.capacity}
              onChange={(e) => setFormData({...formData, capacity: e.target.value})}
              placeholder="e.g., 450"
            />
          </div>
          
          <div>
            <Label htmlFor="route">Initial Route</Label>
            <Select
              value={formData.currentRoute}
              onValueChange={(value) => setFormData({...formData, currentRoute: value})}
            >
              <SelectItem value="">Select route</SelectItem>
              {routes.map((route) => (
                <SelectItem key={route} value={route}>{route}</SelectItem>
              ))}
            </Select>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Add Train
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Train Management Component
const TrainManagement = ({ onAssignStaff, onAddTrain }) => {
  const trains = [
    {
      id: 'HHR100',
      nameEn: 'Haramain Express',
      nameAr: 'قطار الحرمين السريع',
      status: 'active',
      capacity: 450,
      currentRoute: 'Makkah - Madinah',
      lastMaintenance: '2024-11-30',
      currentStaff: {
        driver: 'Mohammed Ali',
        engineer: 'Khalid Omar'
      }
    },
    {
      id: 'SAR200',
      nameEn: 'Riyadh Express',
      nameAr: 'قطار الرياض السريع',
      status: 'active',
      capacity: 380,
      currentRoute: 'Riyadh - Dammam',
      lastMaintenance: '2024-12-05',
      currentStaff: {
        driver: 'Abdullah Ahmed',
        engineer: 'Hassan Ibrahim'
      }
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Train Management</h2>
        <Button onClick={onAddTrain}>
          Add New Train
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name (EN/AR)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Staff</th>
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
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <div>Driver: {train.currentStaff.driver}</div>
                    <div>Engineer: {train.currentStaff.engineer}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{train.currentRoute}</td>
                <td className="px-6 py-4 whitespace-nowrap">{train.lastMaintenance}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <ActionButton 
                      icon={Edit} 
                      onClick={() => {}} 
                      title="Edit Train"
                    />
                    <ActionButton 
                      icon={UserPlus} 
                      onClick={() => onAssignStaff(train)}
                      title="Assign Staff" 
                    />
                    <ActionButton 
                      icon={AlertCircle} 
                      onClick={() => {}}
                      title="Report Issue" 
                    />
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

// Waiting List Component
const WaitingList = () => {
  const waitingList = [
    {
      id: 'WL001',
      passenger: 'Sara Ahmed',
      train: 'HHR100',
      requestedDate: '2024-12-20',
      from: 'Makkah',
      to: 'Madinah',
      waitingSince: '2024-12-01'
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Waiting List Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Passenger</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Train</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Route</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Requested Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Waiting Since</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {waitingList.map((entry) => (
              <tr key={entry.id}>
                <td className="px-6 py-4 whitespace-nowrap">{entry.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{entry.passenger}</td>
                <td className="px-6 py-4 whitespace-nowrap">{entry.train}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {entry.from} → {entry.to}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{entry.requestedDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">{entry.waitingSince}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <ActionButton 
                      icon={ArrowUpCircle} 
                      onClick={() => {}}
                      title="Promote to Confirmed" 
                    />
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
//report part
const ReportSection = ({ title, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
    <h3 className="text-lg font-semibold">{title}</h3>
    {children}
  </div>
);

// Loyalty Waitlist Report Component
const LoyaltyWaitlistReport = () => {
  const [selectedTrain, setSelectedTrain] = useState('');
  const [reportData, setReportData] = useState(null);

  const sampleWaitlistData = {
    'First Class': [
      { id: 'LP001', name: 'Mohammed Abdul', loyaltyTier: 'Gold', waitingSince: '2024-11-15' },
      { id: 'LP002', name: 'Fatima Ali', loyaltyTier: 'Platinum', waitingSince: '2024-11-16' }
    ],
    'Business Class': [
      { id: 'LP003', name: 'Ahmed Hassan', loyaltyTier: 'Silver', waitingSince: '2024-11-17' }
    ],
    'Economy Class': [
      { id: 'LP004', name: 'Sara Mohammed', loyaltyTier: 'Gold', waitingSince: '2024-11-18' }
    ]
  };

  const generateReport = () => {
    // Simulate API call
    setReportData(sampleWaitlistData);
  };

  return (
    <ReportSection title="Waitlisted Loyalty Passengers Report">
      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <Label htmlFor="trainSelect">Select Train</Label>
          <Select
            value={selectedTrain}
            onValueChange={setSelectedTrain}
          >
            <SelectItem value="">Select a train</SelectItem>
            <SelectItem value="HHR100">Haramain Express (HHR100)</SelectItem>
            <SelectItem value="SAR200">Riyadh Express (SAR200)</SelectItem>
          </Select>
        </div>
        <Button 
          onClick={generateReport}
          disabled={!selectedTrain}
        >
          Generate Report
        </Button>
      </div>

      {reportData && (
        <div className="space-y-6 mt-4">
          {Object.entries(reportData).map(([className, passengers]) => (
            <div key={className} className="space-y-2">
              <h4 className="font-medium">{className}</h4>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Loyalty Tier</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Waiting Since</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {passengers.map(passenger => (
                    <tr key={passenger.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{passenger.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{passenger.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{passenger.loyaltyTier}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{passenger.waitingSince}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </ReportSection>
  );
};

// Load Factor Report Component
const LoadFactorReport = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [reportData, setReportData] = useState(null);

  const sampleLoadData = [
    { 
      trainId: 'HHR100',
      trainName: 'Haramain Express',
      totalSeats: 450,
      occupiedSeats: 425,
      loadFactor: 94.4,
      route: 'Makkah - Madinah'
    },
    {
      trainId: 'SAR200',
      trainName: 'Riyadh Express',
      totalSeats: 380,
      occupiedSeats: 342,
      loadFactor: 90.0,
      route: 'Riyadh - Dammam'
    }
  ];

  const generateReport = () => {
    // Simulate API call
    setReportData(sampleLoadData);
  };

  return (
    <ReportSection title="Average Load Factor Report">
      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <Label htmlFor="dateSelect">Select Date</Label>
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
        <Button 
          onClick={generateReport}
          disabled={!selectedDate}
        >
          Generate Report
        </Button>
      </div>

      {reportData && (
        <div className="mt-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Train ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Train Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Route</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Seats</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Occupied Seats</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Load Factor</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reportData.map(train => (
                <tr key={train.trainId}>
                  <td className="px-6 py-4 whitespace-nowrap">{train.trainId}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{train.trainName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{train.route}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{train.totalSeats}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{train.occupiedSeats}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{train.loadFactor}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </ReportSection>
  );
};

// Dependents Travel Report Component
const DependentsTravelReport = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [reportData, setReportData] = useState(null);

  const sampleDependentsData = [
    {
      trainId: 'HHR100',
      primaryPassenger: 'Abdullah Mohammed',
      dependent: 'Sara Abdullah',
      relationship: 'Daughter',
      age: 12,
      class: 'First Class'
    },
    {
      trainId: 'HHR100',
      primaryPassenger: 'Abdullah Mohammed',
      dependent: 'Omar Abdullah',
      relationship: 'Son',
      age: 8,
      class: 'First Class'
    },
    {
      trainId: 'SAR200',
      primaryPassenger: 'Fatima Ahmed',
      dependent: 'Noor Fatima',
      relationship: 'Daughter',
      age: 15,
      class: 'Business Class'
    }
  ];

  const generateReport = () => {
    // Simulate API call
    setReportData(sampleDependentsData);
  };

  return (
    <ReportSection title="Dependents Travel Report">
      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <Label htmlFor="dateSelect">Select Date</Label>
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
        <Button 
          onClick={generateReport}
          disabled={!selectedDate}
        >
          Generate Report
        </Button>
      </div>

      {reportData && (
        <div className="mt-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Train ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Primary Passenger</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dependent Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Relationship</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Age</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Class</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reportData.map((record, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{record.trainId}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{record.primaryPassenger}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{record.dependent}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{record.relationship}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{record.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{record.class}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </ReportSection>
  );
};

// Reports Component
const Reports = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-lg font-semibold">Reports Dashboard</h2>
      <LoyaltyWaitlistReport />
      <LoadFactorReport />
      <DependentsTravelReport />
    </div>
  );
};

// Modify StaffDashboard component to include Reports


export default StaffDashboard;
