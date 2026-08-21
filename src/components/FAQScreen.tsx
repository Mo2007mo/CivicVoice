import React, { useState } from 'react';
import { HelpCircle, Search, ChevronRight, MessageSquare, ArrowRight, Shield, BookOpen } from 'lucide-react';
import { FAQItem } from '../types';

interface FAQScreenProps {
  faqs: FAQItem[];
  onOpenAssistant: () => void;
}

export const FAQScreen: React.FC<FAQScreenProps> = ({ faqs, onOpenAssistant }) => {
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>('faq-1');

  const filtered = faqs.filter(f => {
    const matchCat = selectedCat === 'all' || f.category === selectedCat;
    const matchQuery = f.question.toLowerCase().includes(search.toLowerCase()) || f.answer.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchQuery;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-24 md:pb-16 px-2 sm:px-4">
      {/* Header */}
      <div className="bg-[#F5F2EA] border border-[#E5E0D5] rounded-3xl p-8 sm:p-12 text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-[#E9EFE6] text-[#4A6741] flex items-center justify-center mx-auto">
          <HelpCircle className="w-6 h-6" />
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D2A26]">
          Frequently Asked Questions
        </h2>
        <p className="text-xs sm:text-sm text-[#6B6356] max-w-xl mx-auto leading-relaxed">
          Find answers about civic proposal submission, digital town hall schedules, automated AI telemetry classification, and municipal residency requirements.
        </p>

        {/* Search */}
        <div className="relative max-w-md mx-auto mt-4">
          <Search className="w-4 h-4 text-[#8B7E66] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions by keyword..."
            className="w-full bg-white border border-[#E5E0D5] rounded-full pl-10 pr-4 py-3 text-xs sm:text-sm text-[#2D2A26] placeholder-[#8B7E66] focus:outline-none focus:border-[#4A6741] shadow-xs"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto justify-center pb-2 text-xs font-semibold">
        {['all', 'proposals', 'voting', 'reporting', 'townhall', 'privacy'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-4 py-2 rounded-full capitalize transition-all cursor-pointer ${
              selectedCat === cat
                ? 'bg-[#4A6741] text-white shadow-xs'
                : 'bg-white text-[#6B6356] border border-[#E5E0D5] hover:bg-[#E9EFE6]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-4">
        {filtered.map((item) => {
          const isOpen = expandedId === item.id;
          return (
            <div
              key={item.id}
              onClick={() => setExpandedId(isOpen ? null : item.id)}
              className={`bg-white border rounded-2xl p-5 sm:p-6 transition-all cursor-pointer ${
                isOpen ? 'border-[#4A6741] shadow-xs' : 'border-[#E5E0D5] hover:border-[#4A6741]/40'
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className={`font-serif font-bold text-sm sm:text-base ${isOpen ? 'text-[#4A6741]' : 'text-[#2D2A26]'}`}>
                  {item.question}
                </h3>
                <ChevronRight className={`w-5 h-5 text-[#8B7E66] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-90 text-[#4A6741]' : ''}`} />
              </div>

              {isOpen && (
                <div className="mt-3 pt-3 border-t border-[#E5E0D5]/60 text-xs sm:text-sm text-[#6B6356] leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Need more help banner */}
      <div className="bg-[#E9EFE6] border border-[#4A6741]/20 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#4A6741] text-white flex items-center justify-center shrink-0">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-base text-[#2D2A26]">Still have specific questions?</h4>
            <p className="text-xs text-[#6B6356]">Our Gemini-powered Civic AI Assistant is available 24/7 to answer municipal inquiries.</p>
          </div>
        </div>
        <button
          onClick={onOpenAssistant}
          className="bg-[#4A6741] text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#3D5535] transition-colors flex items-center gap-2 shrink-0 cursor-pointer shadow-xs"
        >
          Chat with Assistant <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
