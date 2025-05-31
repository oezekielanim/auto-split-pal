
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { Tables } from '@/integrations/supabase/types';
import { useToast } from '@/hooks/use-toast';

type ReceiptItem = Tables<'receipt_items'>;

export const useReceiptItems = (receiptId?: string) => {
  const [items, setItems] = useState<ReceiptItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchItems = async () => {
    if (!user || !receiptId) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from('receipt_items')
      .select('*')
      .eq('receipt_id', receiptId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching receipt items:', error);
      toast({
        title: "Error",
        description: "Failed to fetch receipt items",
        variant: "destructive",
      });
    } else {
      setItems(data || []);
    }
    setLoading(false);
  };

  const updateItemAssignment = async (itemId: string, assignedTo: string[]) => {
    const { data, error } = await supabase
      .from('receipt_items')
      .update({ assigned_to: assignedTo })
      .eq('id', itemId)
      .select()
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update item assignment",
        variant: "destructive",
      });
      return null;
    }

    setItems(prev => prev.map(item => 
      item.id === itemId ? data : item
    ));
    return data;
  };

  useEffect(() => {
    fetchItems();
  }, [user, receiptId]);

  return {
    items,
    loading,
    updateItemAssignment,
    refetch: fetchItems,
  };
};
