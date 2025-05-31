
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, Upload, ArrowLeft, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ScanReceipt = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [scannedImage, setScannedImage] = useState<string | null>(null);

  const handleScan = async () => {
    setIsScanning(true);
    
    // Simulate camera capture and OCR processing
    setTimeout(() => {
      // Mock scanned receipt image
      setScannedImage('/placeholder.svg');
      setIsScanning(false);
      
      // Navigate to items selection with mock data
      setTimeout(() => {
        navigate('/items', { 
          state: { 
            receiptItems: [
              { id: 1, item: "Jollof Rice", price: 25.00 },
              { id: 2, item: "Coke", price: 8.00 },
              { id: 3, item: "Chicken", price: 15.00 },
              { id: 4, item: "Plantain", price: 12.00 },
              { id: 5, item: "Beef Stew", price: 18.00 }
            ]
          }
        });
      }, 1500);
    }, 2000);
  };

  const handleUpload = () => {
    // Simulate file upload
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setIsScanning(true);
        setTimeout(() => {
          setScannedImage(URL.createObjectURL(file));
          setIsScanning(false);
          setTimeout(() => {
            navigate('/items', { 
              state: { 
                receiptItems: [
                  { id: 1, item: "Jollof Rice", price: 25.00 },
                  { id: 2, item: "Coke", price: 8.00 },
                  { id: 3, item: "Chicken", price: 15.00 },
                  { id: 4, item: "Plantain", price: 12.00 },
                  { id: 5, item: "Beef Stew", price: 18.00 }
                ]
              }
            });
          }, 1500);
        }, 2000);
      }
    };
    input.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500">
      {/* Header */}
      <div className="px-6 pt-12 pb-8">
        <div className="flex items-center space-x-4 mb-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold text-white">Scan Receipt</h1>
        </div>
      </div>

      <div className="px-6">
        {isScanning ? (
          <Card className="p-8 bg-white/95 backdrop-blur-sm shadow-xl text-center">
            <Loader2 className="h-16 w-16 text-blue-500 mx-auto mb-4 animate-spin" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Processing Receipt</h3>
            <p className="text-gray-600">Using AI to extract items and prices...</p>
          </Card>
        ) : scannedImage ? (
          <Card className="p-6 bg-white/95 backdrop-blur-sm shadow-xl">
            <img 
              src={scannedImage} 
              alt="Scanned receipt" 
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <div className="text-center">
              <Loader2 className="h-8 w-8 text-blue-500 mx-auto mb-2 animate-spin" />
              <p className="text-gray-600">Extracting items...</p>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            <Card className="p-8 bg-white/95 backdrop-blur-sm shadow-xl text-center">
              <Camera className="h-20 w-20 text-gray-400 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Capture Receipt</h3>
              <p className="text-gray-600 mb-6">Take a photo of your receipt to automatically extract items and prices</p>
              <Button 
                onClick={handleScan}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-3 text-lg mb-4"
              >
                <Camera className="h-5 w-5 mr-2" />
                Take Photo
              </Button>
              <Button 
                onClick={handleUpload}
                variant="outline" 
                className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 py-3 text-lg"
              >
                <Upload className="h-5 w-5 mr-2" />
                Upload from Gallery
              </Button>
            </Card>

            <Card className="p-6 bg-white/95 backdrop-blur-sm shadow-xl">
              <h4 className="font-semibold text-gray-800 mb-3">📱 Tips for better scanning:</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Ensure good lighting</li>
                <li>• Keep the receipt flat and straight</li>
                <li>• Include the entire receipt in frame</li>
                <li>• Avoid shadows and glare</li>
              </ul>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScanReceipt;
