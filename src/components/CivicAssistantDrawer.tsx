import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Mic, 
  MicOff, 
  Bot, 
  User, 
  Sparkles, 
  Receipt, 
  AlertTriangle, 
  MapPin, 
  Calendar,
  Loader2
} from 'lucide-react';
import { ChatMessage } from '../types';

interface CivicAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToReport: () => void;
  onNavigateToExplore: () => void;
}

export const CivicAssistantDrawer: React.FC<CivicAssistantDrawerProps> = ({
  isOpen,
  onClose,
  onNavigateToReport,
  onNavigateToExplore,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'assistant',
      text: 'Hello! I am your CivicVoice AI Assistant. How can I help your neighborhood today?',
      timestamp: '10:00 AM',
    },
    {
      id: 'm-2',
      sender: 'user',
      text: 'I need to report a broken streetlight on 5th Ave.',
      timestamp: '10:01 AM',
    },
    {
      id: 'm-3',
      sender: 'assistant',
      text: "I can help you with that! To file an expedited ticket for a broken streetlight, please have the pole tag number ready (usually 4-5 digits).\n\nWould you like to open the quick photo report wizard or track an existing complaint?",
      timestamp: '10:01 AM',
      suggestedAction: 'Report Issue',
    }
  ]);

  const [inputVal, setInputVal] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const scrollAnchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        scrollAnchorRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [isOpen, messages]);

  const handleSend = async (customText?: string) => {
    const textToSend = customText || inputVal.trim();
    if (!textToSend) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInputVal('');
    setIsTyping(true);

    // AI Response generation (Simulated high-context civic reasoning)
    setTimeout(() => {
      let replyText = "I've logged your query into the Ward 42 Civic Knowledge Graph. ";
      const lower = textToSend.toLowerCase();

      if (lower.includes('track') || lower.includes('ticket') || lower.includes('status')) {
        replyText = "Your latest report #CIV-84920 (Deep Pothole on 5th Ave) is currently 'In Progress'. The Public Works crew was dispatched at 10:15 AM today.";
      } else if (lower.includes('pothole') || lower.includes('light') || lower.includes('garbage') || lower.includes('report')) {
        replyText = "I can immediately launch the Incident Report Wizard for you. You can snap a photo, and our AI will classify distress type and route to the respective department.";
      } else if (lower.includes('hazard') || lower.includes('danger') || lower.includes('emergency') || lower.includes('sos')) {
        replyText = "For life safety emergencies, please use the red SOS button at the top of the app to broadcast your GPS coordinates to dispatch immediately.";
      } else if (lower.includes('town hall') || lower.includes('meeting') || lower.includes('vote') || lower.includes('poll')) {
        replyText = "The next Ward 42 Digital Town Hall is scheduled for next Tuesday at 6:30 PM. You can also vote on the active Green Belt Protected Cycleway initiative under the Polls tab.";
      } else {
        replyText += "You can report civic distress, verify neighborhood ballot proposals, or check live hazard telemetry anytime. How else may I assist you?";
      }

      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const handleChipClick = (action: string) => {
    if (action === 'Report Issue') {
      onClose();
      onNavigateToReport();
    } else if (action === 'Nearby Hazards') {
      onClose();
      onNavigateToExplore();
    } else if (action === 'Track Ticket') {
      handleSend('What is the status of my ticket #CIV-84920?');
    }
  };

  const toggleMic = () => {
    if (!isRecording) {
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        setInputVal('Water line leakage near community health center');
      }, 2500);
    } else {
      setIsRecording(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      ></div>

      {/* Slide-over Container */}
      <div className="fixed inset-y-0 right-0 w-full md:w-[440px] bg-[#FDFCF8] shadow-2xl flex flex-col border-l border-[#E5E0D5] z-50">
        {/* Header */}
        <div className="p-5 border-b border-[#E5E0D5] bg-[#F5F2EA] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#4A6741] text-white flex items-center justify-center shadow-xs">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-serif font-bold text-base text-[#2D2A26]">
                  Civic Assistant
                </h3>
                <span className="bg-[#E9EFE6] text-[#4A6741] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> Gemini AI
                </span>
              </div>
              <p className="text-xs text-[#6B6356]">
                24/7 AI-Powered Neighborhood Support
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white border border-[#E5E0D5] text-[#6B6356] hover:text-[#2D2A26] hover:bg-[#E9EFE6] flex items-center justify-center transition-colors cursor-pointer"
            title="Close Assistant"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message History Feed */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#FDFCF8]">
          {messages.map((msg) => {
            const isBot = msg.sender === 'assistant';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 items-start max-w-[88%] ${
                  isBot ? 'self-start' : 'self-end ml-auto flex-row-reverse'
                }`}
              >
                {/* Avatar */}
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs shadow-2xs ${
                  isBot ? 'bg-[#4A6741] text-white' : 'bg-[#2D2A26] text-white'
                }`}>
                  {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                {/* Bubble */}
                <div
                  className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                    isBot
                      ? 'bg-white text-[#2D2A26] border border-[#E5E0D5] rounded-tl-xs shadow-xs'
                      : 'bg-[#4A6741] text-white rounded-tr-xs shadow-xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  <span className={`block text-[9px] mt-1 text-right ${
                    isBot ? 'text-[#8B7E66]' : 'text-white/70'
                  }`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-3 items-start max-w-[85%]">
              <div className="w-7 h-7 rounded-full bg-[#4A6741] text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-[#E5E0D5] p-3 rounded-2xl rounded-tl-xs flex items-center gap-1.5 text-[#4A6741]">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span className="text-xs text-[#6B6356]">Analyzing civic database...</span>
              </div>
            </div>
          )}

          <div ref={scrollAnchorRef}></div>
        </div>

        {/* Suggested Quick Action Chips */}
        <div className="px-5 py-2 bg-[#F5F2EA] border-t border-[#E5E0D5] flex flex-wrap gap-2">
          <button
            onClick={() => handleChipClick('Track Ticket')}
            className="bg-white border border-[#4A6741] text-[#4A6741] hover:bg-[#E9EFE6] px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Receipt className="w-3.5 h-3.5" />
            Track Ticket
          </button>
          <button
            onClick={() => handleChipClick('Report Issue')}
            className="bg-white border border-[#4A6741] text-[#4A6741] hover:bg-[#E9EFE6] px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Report Issue
          </button>
          <button
            onClick={() => handleChipClick('Nearby Hazards')}
            className="bg-white border border-[#4A6741] text-[#4A6741] hover:bg-[#E9EFE6] px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5" />
            Nearby Hazards
          </button>
        </div>

        {/* User Input Bar */}
        <div className="p-4 bg-white border-t border-[#E5E0D5]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="relative flex items-center"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={isRecording ? 'Listening for speech...' : 'Ask about grievances, ordinances, town halls...'}
              className="w-full bg-[#F5F2EA] border border-[#E5E0D5] text-[#2D2A26] rounded-full py-3 pl-4 pr-24 text-xs focus:outline-none focus:border-[#4A6741] transition-colors"
            />

            <div className="absolute right-1.5 flex items-center gap-1">
              <button
                type="button"
                onClick={toggleMic}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                  isRecording 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : 'bg-[#E9EFE6] text-[#4A6741] hover:bg-[#4A6741] hover:text-white'
                }`}
                title="Voice Input"
              >
                {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
              </button>

              <button
                type="submit"
                className="w-8 h-8 rounded-full bg-[#4A6741] text-white flex items-center justify-center hover:bg-[#3D5535] transition-colors cursor-pointer"
                title="Send"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
          <div className="text-center mt-2">
            <span className="text-[10px] text-[#8B7E66] font-medium tracking-wide uppercase">
              Civic Assistant • Powered by Gemini AI
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
