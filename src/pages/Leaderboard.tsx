
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trophy, Medal, Clock, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Leaderboard = () => {
  const navigate = useNavigate();

  const leaderboardData = [
    { name: 'You', amount: 78.50, status: 'paid', time: '2 mins ago', badge: 'golden' },
    { name: 'John Doe', amount: 45.30, status: 'paid', time: '15 mins ago', badge: 'golden' },
    { name: 'Jane Smith', amount: 52.20, status: 'pending', time: '', badge: null },
    { name: 'Mike Johnson', amount: 38.90, status: 'paid', time: '1 hour ago', badge: 'silver' },
    { name: 'Sarah Wilson', amount: 63.40, status: 'pending', time: '', badge: null }
  ];

  const getBadgeIcon = (badge: string | null) => {
    switch (badge) {
      case 'golden':
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 'silver':
        return <Medal className="h-5 w-5 text-gray-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'paid' ? 'text-green-600' : 'text-orange-600';
  };

  const getStatusIcon = (status: string) => {
    return status === 'paid' ? (
      <CheckCircle className="h-4 w-4 text-green-500" />
    ) : (
      <Clock className="h-4 w-4 text-orange-500" />
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <div className="flex items-center space-x-4 mb-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold text-white">Payment Leaderboard</h1>
        </div>
        <p className="text-blue-100">See who's the fastest payer in your group!</p>
      </div>

      <div className="px-6 space-y-4">
        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 bg-white/95 backdrop-blur-sm text-center">
            <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800">2</p>
            <p className="text-gray-600 text-sm">Golden Payers</p>
          </Card>
          <Card className="p-4 bg-white/95 backdrop-blur-sm text-center">
            <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800">3</p>
            <p className="text-gray-600 text-sm">Paid</p>
          </Card>
          <Card className="p-4 bg-white/95 backdrop-blur-sm text-center">
            <Clock className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800">2</p>
            <p className="text-gray-600 text-sm">Pending</p>
          </Card>
        </div>

        {/* Leaderboard */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-xl overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-purple-500 to-blue-500">
            <h3 className="text-lg font-semibold text-white">Payment Rankings</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {leaderboardData.map((person, index) => (
              <div key={index} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full text-sm font-bold text-gray-600">
                      {index + 1}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-800">{person.name}</span>
                        {getBadgeIcon(person.badge)}
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        {getStatusIcon(person.status)}
                        <span className={`text-sm ${getStatusColor(person.status)}`}>
                          {person.status === 'paid' ? `Paid ${person.time}` : 'Payment pending'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">GH₵ {person.amount.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Badge Explanation */}
        <Card className="p-4 bg-white/95 backdrop-blur-sm shadow-xl">
          <h4 className="font-semibold text-gray-800 mb-3">🏆 Badge System</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <div>
                <span className="font-medium text-gray-800">Golden Payer</span>
                <p className="text-sm text-gray-600">Paid within 24 hours</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Medal className="h-5 w-5 text-gray-400" />
              <div>
                <span className="font-medium text-gray-800">Silver Payer</span>
                <p className="text-sm text-gray-600">Paid within 48 hours</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Reminder Section */}
        <Card className="p-4 bg-gradient-to-r from-orange-100 to-red-100 border border-orange-300">
          <h4 className="font-semibold text-orange-800 mb-2">📱 Auto Reminders</h4>
          <p className="text-orange-700 text-sm mb-3">
            SMS reminders are automatically sent to pending participants every 24 hours.
          </p>
          <Button 
            variant="outline" 
            className="w-full border-orange-400 text-orange-700 hover:bg-orange-50"
          >
            Send Manual Reminder
          </Button>
        </Card>

        {/* Action Button */}
        <Button 
          onClick={() => navigate('/')}
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-3 text-lg"
        >
          Start New Split
        </Button>
      </div>
    </div>
  );
};

export default Leaderboard;
