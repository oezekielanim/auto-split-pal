
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CreditCard, Smartphone, Building, Zap } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { amount = 0, friends = [], breakdown = {} } = location.state || {};
  
  const [selectedMethod, setSelectedMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    {
      id: 'mtn',
      name: 'MTN Mobile Money',
      icon: <Smartphone className="h-6 w-6" />,
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      id: 'vodafone',
      name: 'Vodafone Cash',
      icon: <Smartphone className="h-6 w-6" />,
      color: 'from-red-500 to-red-700'
    },
    {
      id: 'ghanapay',
      name: 'GhanaPay',
      icon: <CreditCard className="h-6 w-6" />,
      color: 'from-green-500 to-green-700'
    },
    {
      id: 'paystack',
      name: 'Paystack',
      icon: <Building className="h-6 w-6" />,
      color: 'from-blue-500 to-blue-700'
    },
    {
      id: 'flutterwave',
      name: 'Flutterwave',
      icon: <Zap className="h-6 w-6" />,
      color: 'from-orange-500 to-orange-700'
    }
  ];

  const handlePayment = async () => {
    if (!selectedMethod) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/success', { 
        state: { 
          amount,
          method: paymentMethods.find(m => m.id === selectedMethod)?.name,
          isGoldenPayer: true
        }
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <div className="flex items-center space-x-4 mb-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/summary')}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold text-white">Payment</h1>
        </div>
      </div>

      <div className="px-6 space-y-4">
        {/* Amount Due */}
        <Card className="p-6 bg-white/95 backdrop-blur-sm shadow-xl text-center">
          <h3 className="text-lg text-gray-600 mb-2">Amount Due</h3>
          <p className="text-4xl font-bold text-gray-800 mb-4">GH₵ {amount.toFixed(2)}</p>
          <div className="text-sm text-gray-600 space-y-1">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>GH₵ {breakdown.subtotal?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (10%):</span>
              <span>GH₵ {breakdown.tax?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Service (5%):</span>
              <span>GH₵ {breakdown.service?.toFixed(2)}</span>
            </div>
          </div>
        </Card>

        {/* Payment Methods */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-xl overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-purple-500 to-blue-500">
            <h3 className="text-lg font-semibold text-white">Choose Payment Method</h3>
          </div>
          <div className="p-4 space-y-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`w-full p-4 rounded-lg border-2 transition-all ${
                  selectedMethod === method.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full bg-gradient-to-r ${method.color} text-white`}>
                    {method.icon}
                  </div>
                  <span className="font-medium text-gray-800">{method.name}</span>
                  {selectedMethod === method.id && (
                    <div className="ml-auto w-4 h-4 bg-blue-500 rounded-full"></div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Pay Button */}
        <Button 
          onClick={handlePayment}
          disabled={!selectedMethod || isProcessing}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 text-lg"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Processing Payment...
            </>
          ) : (
            <>
              <CreditCard className="h-5 w-5 mr-2" />
              Pay GH₵ {amount.toFixed(2)}
            </>
          )}
        </Button>

        {/* Golden Payer Info */}
        <Card className="p-4 bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-300">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">🏆</div>
            <div>
              <h4 className="font-semibold text-yellow-800">Golden Payer Challenge</h4>
              <p className="text-yellow-700 text-sm">
                Pay now to earn your Golden Payer badge and secure your spot on the leaderboard!
              </p>
            </div>
          </div>
        </Card>

        {/* Friends Status */}
        <Card className="p-4 bg-white/95 backdrop-blur-sm shadow-xl">
          <h4 className="font-semibold text-gray-800 mb-3">Split Participants</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
              <span className="font-medium text-blue-800">You</span>
              <span className="text-sm text-blue-600">Paying now</span>
            </div>
            {friends.map((friend: string, index: number) => (
              <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-gray-800">{friend}</span>
                <span className="text-sm text-orange-600">Request sent</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Payment;
