import React, { useState } from 'react';
import { 
  ChevronRight, 
  HelpCircle, 
  MapPin, 
  ThumbsUp, 
  CheckCircle2, 
  Clock, 
  Send, 
  Vote, 
  ArrowRight,
  TrendingUp,
  Search,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { FAQItem, Initiative, Grievance } from '../types';

interface HomeScreenProps {
  faqs: FAQItem[];
  initiatives: Initiative[];
  grievances: Grievance[];
  onNavigate: (tab: string) => void;
  onVoteInitiative: (id: string) => void;
  onUpvoteGrievance: (id: string) => void;
  onOpenAssistant: () => void;
  onSelectGrievanceOnMap: (id: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  faqs,
  initiatives,
  grievances,
  onNavigate,
  onVoteInitiative,
  onUpvoteGrievance,
  onOpenAssistant,
  onSelectGrievanceOnMap,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [faqSearch, setFaqSearch] = useState<string>('');
  const [expandedFaq, setExpandedFaq] = useState<string | null>('faq-1');

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = 
      faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
      faq.answer.toLowerCase().includes(faqSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12 pb-24 md:pb-16">
      {/* Top Banner Notice */}
      <div className="bg-[#E9EFE6] border border-[#4A6741]/20 rounded-2xl p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#4A6741] text-white flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#2D2A26]">
              Digital Town Hall: Ward 42 Infrastructure Modernization
            </p>
            <p className="text-xs text-[#6B6356]">
              Next Tuesday at 6:30 PM • Live Q&A with Municipal Commissioner
            </p>
          </div>
        </div>
        <button
          onClick={onOpenAssistant}
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#4A6741] hover:underline cursor-pointer bg-white px-3 py-1.5 rounded-full border border-[#E5E0D5]"
        >
          Ask Assistant <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Natural Tones Hero & FAQ Split Canvas */}
      <section className="bg-[#FDFCF8] border border-[#E5E0D5] rounded-3xl overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12">
        {/* Left Hero Section (55%) */}
        <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 bg-[#E9EFE6] text-[#4A6741] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 w-fit border border-[#4A6741]/20">
            <span className="w-2 h-2 rounded-full bg-[#4A6741] animate-pulse"></span>
            Community Engagement Platform
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light leading-[1.15] mb-6 text-[#2D2A26]">
            Your city. <br />
            <span className="italic font-normal text-[#4A6741]">Your voice.</span> <br />
            Our future.
          </h1>

          <p className="text-base sm:text-lg text-[#6B6356] leading-relaxed max-w-lg mb-8">
            Join thousands of residents in shaping the evolution of our neighborhood. 
            CivicVoice is your direct line to local decision-making, instant grievance resolution, and emergency support.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate('initiatives')}
              className="bg-[#4A6741] text-white px-6 sm:px-8 py-3.5 rounded-xl font-semibold shadow-md hover:bg-[#3D5535] transition-all cursor-pointer flex items-center gap-2 text-sm"
              id="hero-polls-btn"
            >
              <Vote className="w-4 h-4" />
              View active polls
            </button>
            <button
              onClick={() => onNavigate('report')}
              className="bg-[#2D2A26] text-white px-6 sm:px-8 py-3.5 rounded-xl font-semibold shadow-md hover:bg-black transition-all cursor-pointer flex items-center gap-2 text-sm"
              id="hero-report-btn"
            >
              <Send className="w-4 h-4" />
              Report an Issue
            </button>
            <button
              onClick={() => onNavigate('explore')}
              className="border border-[#D1CEC5] text-[#2D2A26] bg-white px-6 sm:px-8 py-3.5 rounded-xl font-medium hover:bg-[#F5F2EA] transition-all cursor-pointer text-sm flex items-center gap-2"
              id="hero-map-btn"
            >
              <MapPin className="w-4 h-4 text-[#4A6741]" />
              Browse map
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-[#E5E0D5]">
            <div>
              <span className="block text-2xl sm:text-3xl font-serif font-bold text-[#4A6741]">98.4%</span>
              <span className="text-xs text-[#6B6356] font-medium">Resolution Rate</span>
            </div>
            <div>
              <span className="block text-2xl sm:text-3xl font-serif font-bold text-[#2D2A26]">1,280+</span>
              <span className="text-xs text-[#6B6356] font-medium">Verified Residents</span>
            </div>
            <div>
              <span className="block text-2xl sm:text-3xl font-serif font-bold text-[#4A6741]">24h</span>
              <span className="text-xs text-[#6B6356] font-medium">Avg. Response Time</span>
            </div>
          </div>
        </div>

        {/* Right Frequently Asked Section (45%) */}
        <div className="lg:col-span-5 bg-[#F5F2EA] p-6 sm:p-10 flex flex-col border-t lg:border-t-0 lg:border-l border-[#E5E0D5]" id="faq-section">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-serif font-semibold text-[#2D2A26] flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#4A6741]" />
                Frequently Asked
              </h2>
              <span className="text-xs text-[#8B7E66] font-medium">
                {filteredFaqs.length} Qs
              </span>
            </div>
            <p className="text-xs text-[#8B7E66]">
              Everything you need to know about civic involvement & grievance reporting.
            </p>
          </div>

          {/* FAQ Search Bar */}
          <div className="relative mb-4">
            <Search className="w-4 h-4 text-[#8B7E66] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              placeholder="Search questions (e.g., voting, pothole, privacy)..."
              className="w-full bg-white border border-[#E5E0D5] rounded-xl pl-9 pr-4 py-2 text-xs text-[#2D2A26] placeholder-[#8B7E66] focus:outline-none focus:border-[#4A6741] focus:ring-1 focus:ring-[#4A6741]"
            />
          </div>

          {/* FAQ Filter Chips */}
          <div className="flex gap-1.5 mb-4 overflow-x-auto pb-1 text-[11px]">
            {['all', 'proposals', 'voting', 'reporting', 'privacy'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full capitalize cursor-pointer transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#4A6741] text-white font-semibold'
                    : 'bg-white text-[#6B6356] border border-[#E5E0D5] hover:bg-[#E9EFE6]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ List Cards */}
          <div className="flex flex-col gap-3 flex-1 overflow-y-auto max-h-[460px] pr-1">
            {filteredFaqs.length === 0 ? (
              <div className="p-6 bg-white rounded-2xl border border-[#E5E0D5] text-center">
                <p className="text-xs text-[#8B7E66]">No matching questions found.</p>
              </div>
            ) : (
              filteredFaqs.map((faq) => {
                const isExpanded = expandedFaq === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={`bg-white rounded-2xl border transition-all cursor-pointer ${
                      isExpanded 
                        ? 'border-[#4A6741] shadow-xs' 
                        : 'border-[#E5E0D5] hover:border-[#4A6741]/40'
                    }`}
                    onClick={() => setExpandedFaq(isExpanded ? null : faq.id)}
                  >
                    <div className="p-4 flex items-start justify-between gap-3">
                      <h3 className={`text-xs sm:text-sm font-bold transition-colors ${
                        isExpanded ? 'text-[#4A6741]' : 'text-[#2D2A26]'
                      }`}>
                        {faq.question}
                      </h3>
                      <ChevronRight className={`w-4 h-4 text-[#8B7E66] shrink-0 transition-transform duration-200 ${
                        isExpanded ? 'rotate-90 text-[#4A6741]' : ''
                      }`} />
                    </div>
                    {isExpanded && (
                      <div className="px-4 pb-4 pt-0 border-t border-[#E5E0D5]/50 mt-1">
                        <p className="text-xs leading-relaxed text-[#6B6356] pt-2">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Contact Support */}
          <div className="mt-auto pt-5 flex items-center justify-between border-t border-[#E5E0D5]">
            <span className="text-xs text-[#8B7E66]">Still have questions?</span>
            <button
              onClick={onOpenAssistant}
              className="text-xs font-bold text-[#4A6741] underline underline-offset-4 hover:text-[#3D5535] cursor-pointer flex items-center gap-1"
            >
              Contact Civic AI Assistant <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </section>

      {/* Active Community Polls & Ballot Initiatives */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-[#4A6741] text-xs font-bold uppercase tracking-wider mb-1">
              <Vote className="w-4 h-4" />
              <span>Participatory Democracy</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D2A26]">
              Active Community Polls
            </h2>
          </div>
          <button
            onClick={() => onNavigate('initiatives')}
            className="text-xs font-bold text-[#4A6741] hover:underline flex items-center gap-1 cursor-pointer"
          >
            Browse all proposals <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {initiatives.map((item) => {
            const percent = Math.min(100, Math.round((item.votesCount / item.targetVotes) * 100));
            return (
              <div
                key={item.id}
                className="bg-white border border-[#E5E0D5] rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="bg-[#E9EFE6] text-[#4A6741] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                      {item.category}
                    </span>
                    <span className="text-xs text-[#8B7E66] font-medium flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {item.daysLeft} days left
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#2D2A26] mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#6B6356] leading-relaxed mb-4 line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5E0D5] space-y-3">
                  {/* Progress Meter */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1 text-[#2D2A26]">
                      <span>{item.votesCount} votes</span>
                      <span className="text-[#8B7E66]">Goal: {item.targetVotes} ({percent}%)</span>
                    </div>
                    <div className="w-full h-2 bg-[#F5F2EA] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#4A6741] rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-[#8B7E66] truncate max-w-[140px]">
                      By {item.author}
                    </span>
                    <button
                      onClick={() => onVoteInitiative(item.id)}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all ${
                        item.hasVoted
                          ? 'bg-[#4A6741] text-white'
                          : 'border border-[#4A6741] text-[#4A6741] hover:bg-[#E9EFE6]'
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      {item.hasVoted ? 'Endorsed' : 'Vote'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recent Verified Neighborhood Reports */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-[#4A6741] text-xs font-bold uppercase tracking-wider mb-1">
              <TrendingUp className="w-4 h-4" />
              <span>Transparent Public Works</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D2A26]">
              Recent Neighborhood Grievances
            </h2>
          </div>
          <button
            onClick={() => onNavigate('explore')}
            className="text-xs font-bold text-[#4A6741] hover:underline flex items-center gap-1 cursor-pointer"
          >
            View live district map <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {grievances.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#E5E0D5] rounded-2xl overflow-hidden flex flex-col hover:shadow-md transition-shadow group"
            >
              {/* Image with status badge */}
              <div className="relative h-40 bg-[#F5F2EA] overflow-hidden">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#8B7E66]">
                    <AlertCircle className="w-8 h-8 opacity-40" />
                  </div>
                )}

                {/* Status pill */}
                <div className="absolute top-3 left-3">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs ${
                    item.status === 'Resolved'
                      ? 'bg-[#059669] text-white'
                      : item.status === 'In Progress'
                      ? 'bg-[#4A6741] text-white'
                      : item.status === 'Dispatched'
                      ? 'bg-[#2D2A26] text-white'
                      : 'bg-[#F5F2EA] text-[#2D2A26] border border-[#E5E0D5]'
                  }`}>
                    {item.status}
                  </span>
                </div>

                {/* Ticket # */}
                <div className="absolute bottom-3 right-3 bg-[#2D2A26]/80 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded">
                  #{item.ticketNumber}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#8B7E66] mb-1">
                    <MapPin className="w-3.5 h-3.5 text-[#4A6741] shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </div>
                  <h3 className="font-serif font-bold text-sm text-[#2D2A26] line-clamp-2 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-[#6B6356] line-clamp-2 mb-3">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E5E0D5] flex items-center justify-between">
                  <span className="text-[10px] text-[#8B7E66]">
                    {item.department}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectGrievanceOnMap(item.id)}
                      className="p-1.5 text-[#6B6356] hover:text-[#4A6741] rounded-full hover:bg-[#F5F2EA]"
                      title="View on Map"
                    >
                      <MapPin className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onUpvoteGrievance(item.id)}
                      className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                        item.hasUpvoted
                          ? 'bg-[#E9EFE6] text-[#4A6741] font-bold'
                          : 'bg-[#F5F2EA] text-[#6B6356] hover:bg-[#E9EFE6]'
                      }`}
                    >
                      <ThumbsUp className="w-3 h-3" />
                      <span>{item.upvotes}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Direct Report Action Card */}
      <section className="bg-[#4A6741] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-lg">
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-64 h-64 bg-white/5 rounded-full pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase text-white/90">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#85F8C4]" />
            Fast-Track Municipal Routing
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            Spotted a pothole, broken streetlight, or hazard?
          </h2>
          <p className="text-sm sm:text-base text-white/85 leading-relaxed">
            Snap a photo and submit it in seconds. Our AI immediately checks authentic image telemetry, identifies the distress type, and sends an actionable ticket to the department supervisor.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate('report')}
              className="bg-white text-[#4A6741] px-8 py-3.5 rounded-xl font-bold shadow-md hover:bg-[#FDFCF8] transition-all cursor-pointer text-sm"
              id="cta-report-bottom"
            >
              Open Report Wizard
            </button>
            <button
              onClick={onOpenAssistant}
              className="bg-transparent border-2 border-white/40 text-white hover:bg-white/10 px-6 py-3.5 rounded-xl font-semibold transition-all cursor-pointer text-sm flex items-center gap-2"
            >
              Ask AI Assistant
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
