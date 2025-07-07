import { Check, Copy } from "lucide-react";
import React from "react";

interface QRCodeInputProps {
  inputText: string;
  copied: boolean;
  isGenerating: boolean;
  onInputChange: (text: string) => void;
  onGenerate: () => void;
  onCopy: () => void;
}

const QRCodeInput: React.FC<QRCodeInputProps> = ({
  inputText,
  copied,
  isGenerating,
  onInputChange,
  onGenerate,
  onCopy,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
      <div className="space-y-4">
        <div>
          <label
            htmlFor="text-input"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Text or URL
          </label>
          <textarea
            id="text-input"
            value={inputText}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder="Enter text, URL, or any content..."
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-20 text-sm"
            maxLength={500}
          />
          <div className="text-right text-xs text-gray-400 mt-1">
            {inputText.length}/500
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onGenerate}
            disabled={!inputText.trim() || isGenerating}
            className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white py-3 px-4 rounded-xl font-medium text-sm transition-colors"
          >
            {isGenerating ? "Generating..." : "Generate"}
          </button>

          <button
            onClick={onCopy}
            disabled={!inputText.trim()}
            className="flex items-center justify-center w-12 h-12 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 rounded-xl transition-colors"
            title="Copy to clipboard"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-600" />
            ) : (
              <Copy className="w-4 h-4 text-gray-600" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeInput;
