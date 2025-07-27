import { useState } from 'react';
import { FaUser, FaChair, FaMoneyBillWave, FaCheckCircle } from 'react-icons/fa';

const BookingForm = ({ bus, onSuccess }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengerDetails, setPassengerDetails] = useState([]);
  const [step, setStep] = useState(1); // 1: Select seats, 2: Passenger details, 3: Payment, 4: Confirmation

  // Mock seat layout
  const seatLayout = Array.from({ length: bus.seats }, (_, i) => ({
    number: i + 1,
    available: i < bus.available,
  }));

  const handleSeatSelect = (seatNumber) => {
    if (!seatLayout[seatNumber - 1].available) return;

    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatNumber));
    } else if (selectedSeats.length < searchParams.passengers) {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const handlePassengerDetailChange = (index, field, value) => {
    const newDetails = [...passengerDetails];
    newDetails[index] = { ...newDetails[index], [field]: value };
    setPassengerDetails(newDetails);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log({
      busId: bus.id,
      seats: selectedSeats,
      passengers: passengerDetails,
      totalPrice: selectedSeats.length * bus.price,
    });
    setStep(4); // Move to confirmation
    onSuccess();
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-fade-in">
      <div className="p-6">
        {/* Progress Steps */}
        <div className="flex justify-between mb-8 relative">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div key={stepNumber} className="flex flex-col items-center z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step === stepNumber
                    ? 'bg-primary-600 text-white'
                    : step > stepNumber
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step > stepNumber ? (
                  <FaCheckCircle className="text-lg" />
                ) : (
                  stepNumber
                )}
              </div>
              <span
                className={`mt-2 text-xs font-medium ${
                  step >= stepNumber ? 'text-gray-900' : 'text-gray-500'
                }`}
              >
                {['Select Seats', 'Passenger Info', 'Payment', 'Confirmation'][
                  stepNumber - 1
                ]}
              </span>
            </div>
          ))}
          <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-1">
            <div
              className="h-full bg-primary-600 transition-all duration-500"
              style={{
                width: `${((step - 1) / 3) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Step 1: Seat Selection */}
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Select Your Seats</h3>
            <p className="text-sm text-gray-600">
              Please select {searchParams.passengers} seat(s)
            </p>

            <div className="border rounded-lg p-4">
              <div className="grid grid-cols-4 gap-4">
                {seatLayout.map((seat) => (
                  <button
                    key={seat.number}
                    type="button"
                    onClick={() => handleSeatSelect(seat.number)}
                    disabled={!seat.available}
                    className={`flex items-center justify-center h-10 rounded-md ${
                      selectedSeats.includes(seat.number)
                        ? 'bg-primary-600 text-white'
                        : seat.available
                        ? 'bg-gray-100 hover:bg-gray-200'
                        : 'bg-gray-300 cursor-not-allowed'
                    }`}
                  >
                    <FaChair />
                    <span className="ml-1">{seat.number}</span>
                  </button>
                ))}
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gray-100 rounded-sm mr-2"></div>
                    <span className="text-sm text-gray-600">Available</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-primary-600 rounded-sm mr-2"></div>
                    <span className="text-sm text-gray-600">Selected</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gray-300 rounded-sm mr-2"></div>
                    <span className="text-sm text-gray-600">Booked</span>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-600">
                    Selected: {selectedSeats.length}/{searchParams.passengers}
                  </p>
                  <p className="font-medium">
                    Total: ₹{selectedSeats.length * bus.price}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={selectedSeats.length !== searchParams.passengers}
                className={`px-4 py-2 rounded-md text-white ${
                  selectedSeats.length === searchParams.passengers
                    ? 'bg-primary-600 hover:bg-primary-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Passenger Details */}
        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">
              Passenger Details
            </h3>

            <form className="space-y-4">
              {selectedSeats.map((seat, index) => (
                <div
                  key={seat}
                  className="border rounded-lg p-4 space-y-4"
                >
                  <h4 className="font-medium flex items-center">
                    <FaUser className="mr-2 text-primary-600" />
                    Passenger {index + 1} (Seat {seat})
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={passengerDetails[index]?.name || ''}
                        onChange={(e) =>
                          handlePassengerDetailChange(
                            index,
                            'name',
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Age
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="120"
                        required
                        value={passengerDetails[index]?.age || ''}
                        onChange={(e) =>
                          handlePassengerDetailChange(
                            index,
                            'age',
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gender
                      </label>
                      <select
                        required
                        value={passengerDetails[index]?.gender || ''}
                        onChange={(e) =>
                          handlePassengerDetailChange(
                            index,
                            'gender',
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ID Proof (Aadhaar/Passport)
                      </label>
                      <input
                        type="text"
                        required
                        value={passengerDetails[index]?.idProof || ''}
                        onChange={(e) =>
                          handlePassengerDetailChange(
                            index,
                            'idProof',
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-4 py-2 rounded-md text-white bg-primary-600 hover:bg-primary-700"
                >
                  Continue to Payment
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Payment</h3>

            <div className="border rounded-lg p-4">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Base Fare</span>
                  <span>₹{bus.price * selectedSeats.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes & Fees</span>
                  <span>₹{Math.round(bus.price * selectedSeats.length * 0.18)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-medium">
                  <span>Total Amount</span>
                  <span>
                    ₹
                    {bus.price * selectedSeats.length +
                      Math.round(bus.price * selectedSeats.length * 0.18)}
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <h4 className="font-medium">Payment Method</h4>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3 p-3 border rounded-lg hover:border-primary-500">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="creditCard"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                    />
                    <span>Credit/Debit Card</span>
                  </label>
                  <label className="flex items-center space-x-3 p-3 border rounded-lg hover:border-primary-500">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                    />
                    <span>UPI Payment</span>
                  </label>
                  <label className="flex items-center space-x-3 p-3 border rounded-lg hover:border-primary-500">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="netBanking"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                    />
                    <span>Net Banking</span>
                  </label>
                  <label className="flex items-center space-x-3 p-3 border rounded-lg hover:border-primary-500">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="wallet"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                    />
                    <span>Wallet</span>
                  </label>
                </div>
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-4 py-2 rounded-md text-white bg-primary-600 hover:bg-primary-700 flex items-center"
                >
                  <FaMoneyBillWave className="mr-2" />
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <div className="text-center py-8">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <FaCheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="mt-3 text-lg font-medium text-gray-900">
              Booking Confirmed!
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Your booking ID is <span className="font-bold">SWIFT{Math.floor(Math.random() * 1000000)}</span>
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={onSuccess}
                className="px-4 py-2 rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                View Booking Details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingForm;