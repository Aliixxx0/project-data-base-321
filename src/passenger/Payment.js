import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard } from 'lucide-react';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const tripNo = location.state?.tripNo || 'Not provided';
  const nationalID = location.state?.nationalID || 'Not provided';

  const [selectedClass, setSelectedClass] = useState('economy');
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [familyMembers, setFamilyMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [basePrice, setBasePrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [documents, setDocuments] = useState({});

  // Fetch trip cost from backend
  useEffect(() => {
    const fetchTripCost = async () => {
      try {
        const response = await fetch(`http://localhost:5000/tripCost?tripNo=${tripNo}`);
        if (!response.ok) throw new Error('Failed to fetch trip cost');
        const data = await response.json();
        setBasePrice(data[0]?.Cost || 0);
      } catch (error) {
        console.error('Error fetching trip cost:', error);
        alert('Error loading trip cost. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTripCost();
  }, [tripNo]);

  // Fetch family members
  useEffect(() => {
    const fetchFamilyMembers = async () => {
      try {
        const response = await fetch(`http://localhost:5000/dependent?id=${nationalID}`);
        const data = await response.json();
        setFamilyMembers(data.map(member => ({
          ...member,
          isSelected: false
        })));
      } catch (error) {
        console.error('Error fetching family members:', error);
      }
    };
    fetchFamilyMembers();
  }, [nationalID]);

  const prices = {
    economy: basePrice,
    business: basePrice * 2,
    first: basePrice * 3
  };

  const toggleMemberSelection = (member) => {
    setSelectedMembers(prev => {
      if (prev.find(m => m.Name === member.Name)) {
        return prev.filter(m => m.Name !== member.Name);
      } else {
        return [...prev, member];
      }
    });
  };

  const calculateTotal = () => {
    const regularPrice = prices[selectedClass];
    const discountedPrice = regularPrice * 0.75; // 25% discount for family members
    
    const totalBasePrice = regularPrice + (discountedPrice * selectedMembers.length);
    const vat = totalBasePrice * 0.15;
    
    return {
      basePrice: totalBasePrice,
      vat,
      total: totalBasePrice + vat,
      numSeats: 1 + selectedMembers.length
    };
  };

  const uploadDocuments = async () => {
    const formData = new FormData();
    
    // Add main passenger document
    if (documents.mainPassenger) {
      formData.append('mainPassengerDoc', documents.mainPassenger);
    }
    
    // Add family members documents
    selectedMembers.forEach(member => {
      if (documents[member.ID]) {
        formData.append(`familyMember_${member.ID}`, documents[member.ID]);
      }
    });

    try {
      const response = await fetch('http://localhost:5000/upload-documents', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Document upload failed');
      return await response.json();
    } catch (error) {
      console.error('Error uploading documents:', error);
      throw new Error('Document upload failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const response = await fetch('http://localhost:5000/process-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tripNo,
          nationalID,
          seatClass: selectedClass,
          paymentMethod,
          amount: calculateTotal().total,
          selectedMembers,
          cardDetails: paymentMethod === 'credit-card' ? {
            number: cardNumber,
            expiry: expiryDate,
            cvv
          } : null
        })
      });
      const register = await fetch(`http://localhost:5000/reserve?id=${nationalID}?cost=${total}`);
      navigate('/success', {
        state: {
          tripNo,
          totalAmount: calculateTotal().total,
          numPassengers: 1 + selectedMembers.length
        }
      });
    } catch (error) {
      alert('Payment failed. Please try again.');
      console.error('Payment error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading trip details...</div>
      </div>
    );
  }

  const { basePrice: subTotal, vat, total, numSeats } = calculateTotal();

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 space-y-6 text-white">
          <div>
            <h2 className="text-2xl font-bold mb-2">Complete Your Booking</h2>
            <p className="text-gray-400">Choose your seat class and select family members</p>
          </div>

          {/* Booking Information */}
          <div className="bg-gray-700 p-4 rounded-lg space-y-2">
            <h3 className="text-lg font-medium mb-3">Booking Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400">Trip Number</p>
                <p className="text-white font-medium">{tripNo}</p>
              </div>
              <div>
                <p className="text-gray-400">National ID</p>
                <p className="text-white font-medium">{nationalID}</p>
              </div>
            </div>
          </div>

          {/* Family Members Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Select Family Members (25% Discount)</h3>
            <div className="grid grid-cols-1 gap-3">
              {familyMembers.map((member, index) => (
                <label
                  key={index}
                  className={`flex items-center justify-between p-4 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors ${
                    selectedMembers.find(m => m.Name === member.Name) ? 'bg-gray-700' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedMembers.find(m => m.Name === member.Name)}
                      onChange={() => toggleMemberSelection(member)}
                      className="text-blue-500"
                    />
                    <div>
                      <p className="font-medium">{member.Name}</p>
                      <p className="text-sm text-gray-400">{member.Relationship}</p>
                    </div>
                  </div>
                  <div className="text-green-400 text-sm">25% Off</div>
                </label>
              ))}
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Seat Class Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Select Seat Class</h3>
              <div className="space-y-3">
                {Object.entries(prices).map(([classType, price]) => (
                  <label 
                    key={classType}
                    className="flex items-center justify-between p-4 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="seatClass"
                        value={classType}
                        checked={selectedClass === classType}
                        onChange={(e) => setSelectedClass(e.target.value)}
                        className="mr-3 text-blue-500"
                      />
                      <div>
                        <span className="capitalize">{classType} Class</span>
                        {classType !== 'economy' && (
                          <span className="text-sm text-gray-400 ml-2">
                            ({classType === 'business' ? '2x' : '3x'} Economy)
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="font-medium text-blue-400">SAR {price}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Payment Method</h3>
              <div className="space-y-3">
                <label className="flex items-center p-4 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credit-card"
                    checked={paymentMethod === 'credit-card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3 text-blue-500"
                  />
                  <div className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-blue-400" />
                    <span>Credit Card</span>
                  </div>
                </label>
                
                <label className="flex items-center p-4 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3 text-blue-500"
                  />
                  <div className="flex items-center">
                    <span>PayPal</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Credit Card Details */}
            {paymentMethod === 'credit-card' && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Card Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Price Summary */}
            <div className="space-y-2 border-t border-gray-700 pt-4">
              <div className="flex justify-between">
                <span>Total Seats:</span>
                <span>{numSeats} ({selectedMembers.length} family member{selectedMembers.length !== 1 ? 's' : ''})</span>
              </div>
              <div className="flex justify-between">
                <span>Base Price:</span>
                <span>SAR {subTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>VAT (15%):</span>
                <span>SAR {vat.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t border-gray-700 pt-2 text-blue-400">
                <span>Total:</span>
                <span>SAR {total.toFixed(2)}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={isProcessing}
              className={`w-full py-3 px-4 rounded-lg transition-colors ${
                isProcessing 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white`}
            >
              {isProcessing ? 'Processing...' : 'Complete Payment'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;