
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, QrCode, Link, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const JoinSession = () => {
  const navigate = useNavigate();
  const [sessionCode, setSessionCode] = useState('');
  const [joinLink, setJoinLink] = useState('');

  const handleJoinByCode = () => {
    if (sessionCode.trim()) {
      // Simulate joining session
      navigate('/items', { 
        state: { 
          receiptItems: [
            { id: 1, item: "Pizza Margherita", price: 45.00 },
            { id: 2, item: "Coca Cola", price: 12.00 },
            { id: 3, item: "Garlic Bread", price: 18.00 }
          ],
          isJoining: true
        }
      });
    }
  };

  const handleJoinByLink = () => {
    if (joinLink.trim()) {
      // Simulate joining session
      navigate('/items', { 
        state: { 
          receiptItems: [
            { id: 1, item: "Jollof Rice", price: 25.00 },
            { id: 2, item: "Chicken", price: 20.00 },
            { id: 3, item: "Plantain", price: 15.00 }
          ],
          isJoining: true
        }
      });
    }
  };

  const handleScanQR = () => {
    // Simulate QR scan
    setTimeout(() => {
      navigate('/items', { 
        state: { 
          receiptItems: [
            { id: 1, item: "Burger", price: 35.00 },
            { id: 2, item: "Fries", price: 15.00 },
            { id: 3, item: "Milkshake", price: 18.00 }
          ],
          isJoining: true
        }
      });
    }, 1000);
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
          <h1 className="text-2xl font-bold text-white">Join Split Session</h1>
        </div>
        <p className="text-blue-100">Join an existing bill split with your friends</p>
      </div>

      <div className="px-6 space-y-4">
        {/* Join by QR Code */}
        <Card className="p-6 bg-white/95 backdrop-blur-sm shadow-xl">
          <div className="text-center">
            <div className="p-4 bg-gradient-to-r from-teal-500 to-green-500 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <QrCode className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Scan QR Code</h3>
            <p className="text-gray-600 mb-4">
              Ask the host to show you their QR code
            </p>
            <Button 
              onClick={handleScanQR}
              className="w-full bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 text-white py-3 text-lg"
            >
              <QrCode className="h-5 w-5 mr-2" />
              Open Camera
            </Button>
          </div>
        </Card>

        {/* Join by Code */}
        <Card className="p-6 bg-white/95 backdrop-blur-sm shadow-xl">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Join by Code</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Enter the 6-digit session code shared by the host
          </p>
          <div className="space-y-3">
            <Input
              placeholder="Enter session code (e.g., ABC123)"
              value={sessionCode}
              onChange={(e) => setSessionCode(e.target.value.toUpperCase())}
              className="text-center text-xl font-mono tracking-wider"
              maxLength={6}
            />
            <Button 
              onClick={handleJoinByCode}
              disabled={sessionCode.length < 6}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 text-lg"
            >
              Join Session
            </Button>
          </div>
        </Card>

        {/* Join by Link */}
        <Card className="p-6 bg-white/95 backdrop-blur-sm shadow-xl">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full">
              <Link className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Join by Link</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Paste the session link shared by the host
          </p>
          <div className="space-y-3">
            <Input
              placeholder="Paste session link here..."
              value={joinLink}
              onChange={(e) => setJoinLink(e.target.value)}
              className="text-sm"
            />
            <Button 
              onClick={handleJoinByLink}
              disabled={!joinLink.trim()}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 text-lg"
            >
              Join via Link
            </Button>
          </div>
        </Card>

        {/* Demo Sessions */}
        <Card className="p-4 bg-blue-50/80 backdrop-blur-sm">
          <h4 className="font-semibold text-blue-800 mb-3">💡 Demo Sessions Available:</h4>
          <div className="space-y-2">
            <Button 
              variant="outline" 
              onClick={() => setSessionCode('DEMO01')}
              className="w-full text-left justify-start border-blue-200 text-blue-700 hover:bg-blue-100"
            >
              DEMO01 - Pizza Night (3 people)
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setSessionCode('DEMO02')}
              className="w-full text-left justify-start border-blue-200 text-blue-700 hover:bg-blue-100"
            >
              DEMO02 - Restaurant Bill (5 people)
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default JoinSession;
