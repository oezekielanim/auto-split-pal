
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, QrCode, Link, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSplitSessions } from '@/hooks/useSplitSessions';
import { useToast } from '@/hooks/use-toast';

const JoinSession = () => {
  const navigate = useNavigate();
  const [sessionCode, setSessionCode] = useState('');
  const [joinLink, setJoinLink] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const { joinSession } = useSplitSessions();
  const { toast } = useToast();

  const handleJoinByCode = async () => {
    if (!sessionCode.trim()) return;
    
    setIsJoining(true);
    const session = await joinSession(sessionCode);
    
    if (session) {
      toast({
        title: "Success",
        description: "Joined session successfully!",
      });
      navigate('/items', { 
        state: { 
          sessionId: session.id,
          isJoining: true
        }
      });
    }
    setIsJoining(false);
  };

  const handleJoinByLink = () => {
    if (joinLink.trim()) {
      // Extract session code from link if it contains one
      const codeMatch = joinLink.match(/session[=/]([A-Z0-9]{6})/i);
      if (codeMatch) {
        setSessionCode(codeMatch[1]);
      } else {
        toast({
          title: "Error",
          description: "Invalid session link format",
          variant: "destructive",
        });
      }
    }
  };

  const handleScanQR = () => {
    // Simulate QR scan - in a real app, this would open the camera
    toast({
      title: "QR Scanner",
      description: "QR code scanning would open the camera here",
    });
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
              disabled={sessionCode.length < 6 || isJoining}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 text-lg"
            >
              {isJoining ? 'Joining...' : 'Join Session'}
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

        {/* Demo Note */}
        <Card className="p-4 bg-blue-50/80 backdrop-blur-sm">
          <h4 className="font-semibold text-blue-800 mb-2">💡 Demo Mode</h4>
          <p className="text-blue-700 text-sm">
            Try entering any 6-character code to join a demo session with mock data.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default JoinSession;
