
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Trophy, Home, Share2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { amount = 0, method = '', isGoldenPayer = false } = location.state || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 via-teal-500 to-blue-500">
      <div className="px-6 pt-20 pb-8">
        <div className="text-center mb-8">
          <div className="mb-6">
            <CheckCircle className="h-24 w-24 text-white mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-2">Payment Successful!</h1>
            <p className="text-green-100 text-lg">GH₵ {amount.toFixed(2)} paid via {method}</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Golden Payer Badge */}
          {isGoldenPayer && (
            <Card className="p-6 bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-400 shadow-xl">
              <div className="text-center">
                <Trophy className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-yellow-800 mb-2">Golden Payer Achieved! 🏆</h3>
                <p className="text-yellow-700">
                  Congratulations! You've earned the Golden Payer badge for paying within 24 hours.
                </p>
              </div>
            </Card>
          )}

          {/* Payment Details */}
          <Card className="p-6 bg-white/95 backdrop-blur-sm shadow-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Amount</span>
                <span className="font-medium text-gray-800">GH₵ {amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Method</span>
                <span className="font-medium text-gray-800">{method}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span className="font-medium text-green-600">Completed</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date</span>
                <span className="font-medium text-gray-800">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </Card>

          {/* Next Steps */}
          <Card className="p-6 bg-white/95 backdrop-blur-sm shadow-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">What's Next?</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Payment requests sent to all participants</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700">SMS reminders will be sent automatically</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-700">Check the leaderboard to see payment status</span>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={() => navigate('/leaderboard')}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-3 text-lg"
            >
              <Trophy className="h-5 w-5 mr-2" />
              View Leaderboard
            </Button>

            <Button 
              onClick={() => navigate('/')}
              variant="outline"
              className="w-full border-2 border-white text-white hover:bg-white hover:text-gray-800 py-3 text-lg"
            >
              <Home className="h-5 w-5 mr-2" />
              Back to Home
            </Button>

            <Button 
              variant="outline"
              className="w-full border-2 border-white text-white hover:bg-white hover:text-gray-800 py-3 text-lg"
            >
              <Share2 className="h-5 w-5 mr-2" />
              Share Success
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
