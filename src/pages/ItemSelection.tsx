
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Users, Calculator } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface ReceiptItem {
  id: number;
  item: string;
  price: number;
}

const ItemSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const receiptItems = location.state?.receiptItems || [];
  
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [sharedItems, setSharedItems] = useState<number[]>([]);

  const handleItemToggle = (itemId: number) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSharedToggle = (itemId: number) => {
    setSharedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const calculateTotal = () => {
    return receiptItems
      .filter((item: ReceiptItem) => selectedItems.includes(item.id))
      .reduce((sum: number, item: ReceiptItem) => {
        const basePrice = item.price;
        const sharedPrice = sharedItems.includes(item.id) ? basePrice / 2 : basePrice;
        return sum + sharedPrice;
      }, 0);
  };

  const handleContinue = () => {
    const myItems = receiptItems.filter((item: ReceiptItem) => selectedItems.includes(item.id));
    navigate('/summary', { 
      state: { 
        myItems,
        sharedItems,
        subtotal: calculateTotal()
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
            onClick={() => navigate('/scan')}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold text-white">Select Your Items</h1>
        </div>
        <p className="text-blue-100">Choose what you ordered and mark shared items</p>
      </div>

      <div className="px-6 space-y-4">
        {/* Items List */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-xl overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-purple-500 to-blue-500">
            <h3 className="text-lg font-semibold text-white">Receipt Items</h3>
          </div>
          <div className="p-4 space-y-4">
            {receiptItems.map((item: ReceiptItem) => (
              <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <Checkbox 
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={() => handleItemToggle(item.id)}
                  />
                  <div>
                    <p className="font-medium text-gray-800">{item.item}</p>
                    <p className="text-sm text-gray-600">GH₵ {item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={sharedItems.includes(item.id) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleSharedToggle(item.id)}
                    className={sharedItems.includes(item.id) ? "bg-teal-500 hover:bg-teal-600" : ""}
                  >
                    <Users className="h-4 w-4 mr-1" />
                    Shared
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Summary */}
        <Card className="p-4 bg-white/95 backdrop-blur-sm shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calculator className="h-5 w-5 text-blue-500" />
              <span className="font-semibold text-gray-800">Your Subtotal</span>
            </div>
            <span className="text-xl font-bold text-blue-600">
              GH₵ {calculateTotal().toFixed(2)}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {selectedItems.length} items selected • {sharedItems.length} shared
          </p>
        </Card>

        {/* Continue Button */}
        <Button 
          onClick={handleContinue}
          disabled={selectedItems.length === 0}
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-3 text-lg"
        >
          Continue to Summary
        </Button>

        {/* Info Card */}
        <Card className="p-4 bg-blue-50/80 backdrop-blur-sm">
          <h4 className="font-semibold text-blue-800 mb-2">💡 How sharing works:</h4>
          <ul className="space-y-1 text-blue-700 text-sm">
            <li>• Select items you consumed</li>
            <li>• Mark "Shared" for items split between people</li>
            <li>• Shared items cost is divided equally</li>
            <li>• Tax and service charges added at the end</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default ItemSelection;
