
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Users, CreditCard, Share2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const BillSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { myItems = [], subtotal = 0 } = location.state || {};
  
  const [friends, setFriends] = useState(['John Doe', 'Jane Smith']);
  const [newFriend, setNewFriend] = useState('');

  // Calculate final amounts
  const tax = subtotal * 0.10; // 10% tax
  const service = subtotal * 0.05; // 5% service fee
  const total = subtotal + tax + service;

  const addFriend = () => {
    if (newFriend.trim()) {
      setFriends([...friends, newFriend.trim()]);
      setNewFriend('');
    }
  };

  const handleSendRequests = () => {
    navigate('/payment', { 
      state: { 
        amount: total,
        friends,
        breakdown: {
          subtotal,
          tax,
          service,
          total
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <div className="flex items-center space-x-4 mb-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/items')}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold text-white">Bill Summary</h1>
        </div>
      </div>

      <div className="px-6 space-y-4">
        {/* My Items */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-xl overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-purple-500 to-blue-500">
            <h3 className="text-lg font-semibold text-white">Your Items</h3>
          </div>
          <div className="p-4 space-y-2">
            {myItems.map((item: any, index: number) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gray-800">{item.item}</span>
                <span className="font-medium text-gray-800">GH₵ {item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Bill Breakdown */}
        <Card className="p-4 bg-white/95 backdrop-blur-sm shadow-xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Bill Breakdown</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-800">GH₵ {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax (10%)</span>
              <span className="text-gray-800">GH₵ {tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Service (5%)</span>
              <span className="text-gray-800">GH₵ {service.toFixed(2)}</span>
            </div>
            <div className="h-px bg-gray-200 my-2"></div>
            <div className="flex justify-between text-lg font-bold">
              <span className="text-gray-800">You Owe</span>
              <span className="text-blue-600">GH₵ {total.toFixed(2)}</span>
            </div>
          </div>
        </Card>

        {/* Friends in Split */}
        <Card className="p-4 bg-white/95 backdrop-blur-sm shadow-xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2" />
            People in Split
          </h3>
          <div className="space-y-2 mb-4">
            <div className="p-2 bg-blue-50 rounded flex justify-between items-center">
              <span className="font-medium text-blue-800">You</span>
              <span className="text-sm text-blue-600">Host</span>
            </div>
            {friends.map((friend, index) => (
              <div key={index} className="p-2 bg-gray-50 rounded flex justify-between items-center">
                <span className="text-gray-800">{friend}</span>
                <span className="text-sm text-gray-600">Invited</span>
              </div>
            ))}
          </div>
          
          <div className="flex space-x-2">
            <Input
              placeholder="Add friend by name or phone"
              value={newFriend}
              onChange={(e) => setNewFriend(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addFriend()}
              className="flex-1"
            />
            <Button onClick={addFriend} variant="outline">Add</Button>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={handleSendRequests}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-3 text-lg"
          >
            <CreditCard className="h-5 w-5 mr-2" />
            Send Payment Requests
          </Button>
          
          <Button 
            variant="outline"
            className="w-full border-2 border-teal-500 text-teal-600 hover:bg-teal-50 py-3 text-lg"
          >
            <Share2 className="h-5 w-5 mr-2" />
            Share Split Link
          </Button>
        </div>

        <Card className="p-4 bg-green-50/80 backdrop-blur-sm">
          <h4 className="font-semibold text-green-800 mb-2">🏆 Golden Payer Challenge</h4>
          <p className="text-green-700 text-sm">
            Pay within 24 hours to earn a Golden Payer badge and climb the leaderboard!
          </p>
        </Card>
      </div>
    </div>
  );
};

export default BillSummary;
