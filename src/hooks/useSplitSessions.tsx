
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { Tables } from '@/integrations/supabase/types';
import { useToast } from '@/hooks/use-toast';

type SplitSession = Tables<'split_sessions'>;

export const useSplitSessions = () => {
  const [sessions, setSessions] = useState<SplitSession[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchSessions = async () => {
    if (!user) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from('split_sessions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch sessions",
        variant: "destructive",
      });
    } else {
      setSessions(data || []);
    }
    setLoading(false);
  };

  const createSession = async () => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('split_sessions')
      .insert([
        {
          created_by: user.id,
          members: [user.id],
        }
      ])
      .select()
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to create session",
        variant: "destructive",
      });
      return null;
    }

    await fetchSessions();
    return data;
  };

  const joinSession = async (sessionCode: string) => {
    if (!user) return null;

    // First, find the session by code
    const { data: session, error: fetchError } = await supabase
      .from('split_sessions')
      .select('*')
      .eq('session_code', sessionCode.toUpperCase())
      .single();

    if (fetchError || !session) {
      toast({
        title: "Error",
        description: "Session not found",
        variant: "destructive",
      });
      return null;
    }

    // Add user to members if not already there
    const updatedMembers = session.members || [];
    if (!updatedMembers.includes(user.id)) {
      updatedMembers.push(user.id);

      const { data, error } = await supabase
        .from('split_sessions')
        .update({ members: updatedMembers })
        .eq('id', session.id)
        .select()
        .single();

      if (error) {
        toast({
          title: "Error",
          description: "Failed to join session",
          variant: "destructive",
        });
        return null;
      }

      await fetchSessions();
      return data;
    }

    return session;
  };

  useEffect(() => {
    fetchSessions();
  }, [user]);

  return {
    sessions,
    loading,
    createSession,
    joinSession,
    refetch: fetchSessions,
  };
};
