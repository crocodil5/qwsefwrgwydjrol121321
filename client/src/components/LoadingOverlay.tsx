import React from 'react';

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  isVisible, 
  message = "Anmeldung wird verarbeitet..." 
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 flex flex-col items-center gap-6 max-w-sm mx-4">
        {/* PayPal Logo */}
        <div className="flex flex-col w-[83.44px] h-10 items-center">
          <img
            className="relative w-[83.44px] h-[29.67px]"
            alt="PayPal Logo"
            src="/figmaAssets/paypal-text-logo.svg"
          />
        </div>
        
        {/* Spinner */}
        <div className="relative">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
        
        {/* Message */}
        <div className="text-center">
          <p className="text-gray-700 font-medium mb-2">{message}</p>
          <p className="text-sm text-gray-500">
            Bitte warten Sie einen Moment...
          </p>
        </div>
      </div>
    </div>
  );
};