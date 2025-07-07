import React, { useEffect, useState } from "react";
import QRCodeDisplay from "./QRCodeDisplay";
import QRCodeFooter from "./QRCodeFooter";
import QRCodeInput from "./QRCodeInput";
import QRCodeEmptyState from "./QREmptyState";
import type { QRCodeData } from "./types";
import { generateQRCode } from "./utils";

const QRCodeGenerator: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [qrData, setQrData] = useState<QRCodeData | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Generate QR code
  const handleGenerate = async (): Promise<void> => {
    if (!inputText.trim()) return;

    setIsGenerating(true);
    try {
      const dataUrl = await generateQRCode(inputText);
      setQrData({ text: inputText, dataUrl });
    } catch (error) {
      console.error("Error generating QR code:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Download QR code
  const handleDownload = (): void => {
    if (!qrData) return;

    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = qrData.dataUrl;
    link.click();
  };

  // Copy to clipboard
  const handleCopy = async (): Promise<void> => {
    if (!inputText) return;

    try {
      await navigator.clipboard.writeText(inputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  // Clear QR code when input is empty
  useEffect(() => {
    if (!inputText.trim()) {
      setQrData(null);
    }
  }, [inputText]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light text-gray-800 mb-2">
            QR Generator
          </h1>
          <p className="text-gray-600 text-sm">
            Enter text or URL to generate a QR code
          </p>
        </div>

        {/* Input Section */}
        <QRCodeInput
          inputText={inputText}
          copied={copied}
          isGenerating={isGenerating}
          onInputChange={setInputText}
          onGenerate={handleGenerate}
          onCopy={handleCopy}
        />

        {/* QR Code Preview */}
        {qrData ? (
          <QRCodeDisplay qrData={qrData} onDownload={handleDownload} />
        ) : (
          !isGenerating && <QRCodeEmptyState />
        )}

        {/* Footer */}
        <QRCodeFooter />
      </div>
    </div>
  );
};

export default QRCodeGenerator;
