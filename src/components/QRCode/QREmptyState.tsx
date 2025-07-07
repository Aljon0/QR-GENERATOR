import React from "react";

const QRCodeEmptyState: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <div className="w-8 h-8 border-2 border-gray-400 border-dashed rounded"></div>
      </div>
      <p className="text-gray-500 text-sm">
        Enter some text above to generate a QR code
      </p>
    </div>
  );
};

export default QRCodeEmptyState;
