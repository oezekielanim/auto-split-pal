
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { Tables } from '@/integrations/supabase/types';
import { useToast } from '@/hooks/use-toast';

type Receipt = Tables<'receipts'>;
type ReceiptItem = Tables<'receipt_items'>;

export const useReceipts = (sessionId?: string) => {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchReceipts = async () => {
    if (!user) return;
    
    setLoading(true);
    let query = supabase
      .from('receipts')
      .select('*')
      .order('created_at', { ascending: false });

    if (sessionId) {
      query = query.eq('session_id', sessionId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching receipts:', error);
      toast({
        title: "Error",
        description: "Failed to fetch receipts",
        variant: "destructive",
      });
    } else {
      setReceipts(data || []);
    }
    setLoading(false);
  };

  const createReceipt = async (sessionId: string, imageUrl?: string) => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('receipts')
      .insert([
        {
          user_id: user.id,
          session_id: sessionId,
          image_url: imageUrl,
        }
      ])
      .select()
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to create receipt",
        variant: "destructive",
      });
      return null;
    }

    await fetchReceipts();
    return data;
  };

  const addReceiptItems = async (receiptId: string, items: Array<{ name: string; price: number }>) => {
    const itemsToInsert = items.map(item => ({
      receipt_id: receiptId,
      name: item.name,
      price: item.price,
    }));

    const { data, error } = await supabase
      .from('receipt_items')
      .insert(itemsToInsert)
      .select();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add receipt items",
        variant: "destructive",
      });
      return null;
    }

    return data;
  };

  useEffect(() => {
    fetchReceipts();
  }, [user, sessionId]);

  return {
    receipts,
    loading,
    createReceipt,
    addReceiptItems,
    refetch: fetchReceipts,
  };
};
