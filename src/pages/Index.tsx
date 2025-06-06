
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, Users, Calculator, Trophy, Plus, QrCode, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useSplitSessions } from '@/hooks/useSplitSessions';
import { useProfile } from '@/hooks/useProfile';

const Index = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { createSession, sessions, loading } = useSplitSessions();
  const { profile } = useProfile();

  const handleStartNewSplit = async () => {
    const session = await createSession();
    if (session) {
      navigate('/scan', { state: { sessionId: session.id } });
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const totalSessions = sessions.length;
  const finalized = sessions.filter(s => s.is_finalized).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500">
      {/* Header */}
      <div className="px-6 pt-12 pb-8">
        <div className="flex justify-between items-start">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold text-white mb-2">AutoSplit</h1>
            <p className="text-blue-100 text-lg">Split bills. Share fairly. Pay easily.</p>
          </div>
          <Button 
            variant="ghost" 
            onClick={handleSignOut}
            className="text-white hover:bg-white/20"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
        
        {profile && (
          <div className="mt-4 text-center">
            <p className="text-blue-100">
              Welcome back, {profile.full_name || user?.email}!
            </p>
          </div>
        )}
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
            onClick={handleStartNewSplit}
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
            <p className="text-2xl font-bold text-gray-800">{totalSessions}</p>
            <p className="text-gray-600 text-sm">Sessions Created</p>
          </Card>
          <Card className="p-4 bg-white/90 backdrop-blur-sm text-center">
            <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800">{finalized}</p>
            <p className="text-gray-600 text-sm">Completed Splits</p>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="px-6 mt-8 pb-20">
        <h3 className="text-xl font-semibold text-white mb-4">Recent Sessions</h3>
        {loading ? (
          <Card className="p-8 bg-white/90 backdrop-blur-sm text-center">
            <p className="text-gray-600">Loading...</p>
          </Card>
        ) : sessions.length > 0 ? (
          <div className="space-y-3">
            {sessions.slice(0, 3).map((session) => (
              <Card key={session.id} className="p-4 bg-white/90 backdrop-blur-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-800">Session {session.session_code}</p>
                    <p className="text-sm text-gray-600">
                      {session.members?.length || 0} members
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${
                      session.is_finalized ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      {session.is_finalized ? 'Completed' : 'In Progress'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(session.created_at || '').toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-8 bg-white/90 backdrop-blur-sm text-center">
            <p className="text-gray-600">No sessions yet</p>
            <p className="text-sm text-gray-500 mt-2">Start your first split to see activity here</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
