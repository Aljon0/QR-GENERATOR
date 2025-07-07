import { Download } from "lucide-react";
import React from "react";
import type { QRCodeData } from "./types";

interface QRCodeDisplayProps {
  qrData: QRCodeData;
  onDownload: () => void;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  qrData,
  onDownload,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="text-center space-y-4">
        <h2 className="text-lg font-medium text-gray-800">Your QR Code</h2>

        {/* QR Code Image */}
        <div className="flex justify-center">
          <div className="bg-white p-4 rounded-xl border border-gray-100">
            <img
              src={qrData.dataUrl}
              alt="Generated QR Code"
              className="w-48 h-48 object-contain"
            />
          </div>
        </div>

        {/* Download Button */}
        <button
          onClick={onDownload}
          className="flex items-center justify-center gap-2 w-full bg-gray-800 hover:bg-gray-900 text-white py-3 px-4 rounded-xl font-medium text-sm transition-colors"
        >
          <Download className="w-4 h-4" />
          Download PNG
        </button>

        {/* Generated Text Preview */}
        <div className="text-left">
          <p className="text-xs text-gray-500 mb-1">Generated from:</p>
          <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg break-words">
            {qrData.text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QRCodeDisplay;
