import React, { useState } from 'react';
import { FileText, Upload, Sparkles, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

export const DocumentAnalyzerPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const handleSimulateUpload = (fileName: string) => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalyzed(true);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div className="text-center space-y-2">
        <span className="text-xs uppercase tracking-widest font-extrabold text-gold">
          AI Document & Statement Understanding
        </span>
        <h1 className="text-3xl font-extrabold text-ivory">Explain My Statement</h1>
        <p className="text-xs text-ivory-dark max-w-md mx-auto">
          Upload bank statements, utility bills, or insurance letters for simple AI translation.
        </p>
      </div>

      {/* Upload Drag & Drop Box */}
      <div className="p-8 rounded-3xl bg-dark-card border-2 border-dashed border-gold/40 text-center space-y-4 hover:border-gold transition-colors">
        <div className="w-16 h-16 rounded-2xl bg-gold/15 text-gold flex items-center justify-center mx-auto border border-gold/30">
          <Upload className="w-8 h-8" />
        </div>

        <div>
          <h3 className="text-base font-bold text-ivory">Upload PDF or Image Statement</h3>
          <p className="text-xs text-ivory-dark mt-1">
            Drag & drop your file here, or select a sample document below
          </p>
        </div>

        {/* Sample Document Demo Buttons */}
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          <button
            onClick={() => handleSimulateUpload('Bank_Statement_Aug.pdf')}
            className="px-4 py-2 rounded-xl bg-dark-elevated border border-dark-border text-xs text-gold font-bold hover:border-gold/50"
          >
            📄 Sample Bank Statement
          </button>
          <button
            onClick={() => handleSimulateUpload('Electricity_Bill.png')}
            className="px-4 py-2 rounded-xl bg-dark-elevated border border-dark-border text-xs text-gold font-bold hover:border-gold/50"
          >
            📄 Sample Electricity Bill
          </button>
        </div>
      </div>

      {isAnalyzing && (
        <div className="p-8 rounded-3xl bg-dark-card border border-gold/40 text-center space-y-3 animate-pulse">
          <Sparkles className="w-8 h-8 text-gold mx-auto animate-spin-slow" />
          <h3 className="text-base font-bold text-ivory">Ghada AI is reading your document...</h3>
          <p className="text-xs text-ivory-dark">Translating financial terminology into simple language</p>
        </div>
      )}

      {analyzed && !isAnalyzing && (
        <div className="p-8 rounded-3xl bg-dark-card border border-gold shadow-2xl space-y-6 animate-in zoom-in-95">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold/20 text-gold flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-ivory">Bank Statement Breakdown</h3>
              <p className="text-xs text-gold font-medium">Analysis Complete • 3 Key Insights Identified</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-dark-elevated border border-dark-border">
              <span className="text-ivory-dark">Total Income Inflow</span>
              <div className="text-xl font-extrabold text-gold mt-1">₹12,400</div>
            </div>
            <div className="p-4 rounded-2xl bg-dark-elevated border border-dark-border">
              <span className="text-ivory-dark">Total Outflow</span>
              <div className="text-xl font-extrabold text-ivory mt-1">₹9,650</div>
            </div>
            <div className="p-4 rounded-2xl bg-dark-elevated border border-dark-border">
              <span className="text-ivory-dark">Hidden Fees Detected</span>
              <div className="text-xl font-extrabold text-terracotta mt-1">₹120 (SMS Charge)</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gold/10 border border-gold/30 text-xs text-ivory space-y-2">
            <span className="font-bold text-gold uppercase tracking-wider">AI Summary in Simple Words:</span>
            <p className="text-ivory-muted leading-relaxed">
              "Your earnings arrived on August 5th and 18th. Your biggest expenses were Groceries (₹3,200) and Room Rent (₹3,000). You saved ₹1,500 into your emergency cushion!"
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
