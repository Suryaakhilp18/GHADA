import React, { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';

interface VoiceInputButtonProps {
  onSpeechResult: (transcript: string) => void;
  onListeningStateChange?: (isListening: boolean) => void;
}

export const VoiceInputButton: React.FC<VoiceInputButtonProps> = ({
  onSpeechResult,
  onListeningStateChange,
}) => {
  const [isListening, setIsListening] = useState(false);

  const toggleListening = () => {
    // Check Speech Recognition support in browser
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-IN'; // Default to Indian English / Multilingual

        recognition.onstart = () => {
          setIsListening(true);
          onListeningStateChange?.(true);
        };

        recognition.onresult = (event: any) => {
          const resultText = event.results[0][0].transcript;
          onSpeechResult(resultText);
          setIsListening(false);
          onListeningStateChange?.(false);
        };

        recognition.onerror = () => {
          setIsListening(false);
          onListeningStateChange?.(false);
        };

        recognition.onend = () => {
          setIsListening(false);
          onListeningStateChange?.(false);
        };

        if (isListening) {
          recognition.stop();
        } else {
          recognition.start();
        }
      } catch (e) {
        // Fallback simulated voice listening for demo
        simulateVoiceDemo();
      }
    } else {
      simulateVoiceDemo();
    }
  };

  const simulateVoiceDemo = () => {
    setIsListening(true);
    onListeningStateChange?.(true);

    setTimeout(() => {
      onSpeechResult('Help me manage my ₹12,000 income and save for emergency');
      setIsListening(false);
      onListeningStateChange?.(false);
    }, 2000);
  };

  return (
    <button
      type="button"
      onClick={toggleListening}
      className={`p-3 rounded-2xl border transition-all flex items-center justify-center ${
        isListening
          ? 'bg-terracotta text-ivory border-terracotta animate-pulse shadow-lg'
          : 'bg-dark-elevated border-dark-border text-gold hover:border-gold/50 hover:bg-gold/10'
      }`}
      title={isListening ? 'Listening...' : 'Talk to Ghada AI (Voice Input)'}
    >
      {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
    </button>
  );
};
