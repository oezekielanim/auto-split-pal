
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, Users, Calculator, Trophy, Plus, QrCode } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500">
      {/* Header */}
      <div className="px-6 pt-12 pb-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">AutoSplit</h1>
          <p className="text-blue-100 text-lg">Split bills. Share fairly. Pay easily.</p>
        </div>
      </div>

      {/* Main Actions */}
      <div className="px-6 space-y-4">
        <Card className="p-6 bg-white/95 backdrop-blur-sm shadow-xl">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full">
              <Plus className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Start New Split</h3>
              <p className="text-gray-600">Scan a receipt and split with friends</p>
            </div>
          </div>
          <Button 
            onClick={() => navigate('/scan')}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-3 text-lg"
          >
            <Camera className="h-5 w-5 mr-2" />
            Scan Receipt
          </Button>
        </Card>

        <Card className="p-6 bg-white/95 backdrop-blur-sm shadow-xl">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-teal-500 to-green-500 rounded-full">
              <QrCode className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Join Session</h3>
              <p className="text-gray-600">Join an existing bill split</p>
            </div>
          </div>
          <Button 
            onClick={() => navigate('/join')}
            variant="outline" 
            className="w-full border-2 border-teal-500 text-teal-600 hover:bg-teal-50 py-3 text-lg"
          >
            <Users className="h-5 w-5 mr-2" />
            Join Split
          </Button>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="px-6 mt-8">
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 bg-white/90 backdrop-blur-sm text-center">
            <Calculator className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800">12</p>
            <p className="text-gray-600 text-sm">Bills Split</p>
          </Card>
          <Card className="p-4 bg-white/90 backdrop-blur-sm text-center">
            <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800">8</p>
            <p className="text-gray-600 text-sm">Golden Payments</p>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="px-6 mt-8 pb-20">
        <h3 className="text-xl font-semibold text-white mb-4">Recent Splits</h3>
        <div className="space-y-3">
          <Card className="p-4 bg-white/90 backdrop-blur-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-800">Dinner at Buka</p>
                <p className="text-gray-600 text-sm">You owe: GH₵ 45.50</p>
              </div>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Pending</span>
            </div>
          </Card>
          <Card className="p-4 bg-white/90 backdrop-blur-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-800">Lunch at KFC</p>
                <p className="text-gray-600 text-sm">Paid: GH₵ 28.00</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Paid</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
