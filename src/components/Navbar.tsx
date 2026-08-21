import React from 'react';
import { ShieldAlert, Bot } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  onOpenSOS: () => void;
  onOpenAssistant: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  onOpenSOS,
  onOpenAssistant,
}) => {
  return (
    <nav className="sticky top-0 z-40 bg-[#FDFCF8]/95 backdrop-blur-md border-b border-[#E5E0D5] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        {/* Brand */}
        <div 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 cursor-pointer group"
          id="nav-logo"
        >
          <div className="w-10 h-10 bg-[#4A6741] rounded-full flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <div className="w-4 h-4 border-2 border-white rounded-xs rotate-45"></div>
          </div>
          <div>
            <span className="text-2xl font-serif font-bold tracking-tight text-[#4A6741] block leading-none">
              CivicVoice
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#6B6356] font-semibold block mt-0.5">
              Citizen Portal
            </span>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-7 text-sm font-medium text-[#6B6356]">
          <button
            onClick={() => onNavigate('home')}
            className={`transition-colors hover:text-[#4A6741] pb-1 cursor-pointer ${
              currentTab === 'home'
                ? 'text-[#4A6741] font-bold border-b-2 border-[#4A6741]'
                : ''
            }`}
            id="nav-home-btn"
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('report')}
            className={`transition-colors hover:text-[#4A6741] pb-1 cursor-pointer ${
              currentTab === 'report'
                ? 'text-[#4A6741] font-bold border-b-2 border-[#4A6741]'
                : ''
            }`}
            id="nav-report-btn"
          >
            Report Issue
          </button>
          <button
            onClick={() => onNavigate('explore')}
            className={`transition-colors hover:text-[#4A6741] pb-1 cursor-pointer ${
              currentTab === 'explore'
                ? 'text-[#4A6741] font-bold border-b-2 border-[#4A6741]'
                : ''
            }`}
            id="nav-explore-btn"
          >
            Live Map
          </button>
          <button
            onClick={() => onNavigate('initiatives')}
            className={`transition-colors hover:text-[#4A6741] pb-1 cursor-pointer ${
              currentTab === 'initiatives'
                ? 'text-[#4A6741] font-bold border-b-2 border-[#4A6741]'
                : ''
            }`}
            id="nav-initiatives-btn"
          >
            Polls & Initiatives
          </button>
          <button
            onClick={() => onNavigate('faq')}
            className={`transition-colors hover:text-[#4A6741] pb-1 cursor-pointer ${
              currentTab === 'faq'
                ? 'text-[#4A6741] font-bold border-b-2 border-[#4A6741]'
                : ''
            }`}
            id="nav-faq-btn"
          >
            FAQ
          </button>
          <button
            onClick={() => onNavigate('profile')}
            className={`transition-colors hover:text-[#4A6741] pb-1 cursor-pointer ${
              currentTab === 'profile'
                ? 'text-[#4A6741] font-bold border-b-2 border-[#4A6741]'
                : ''
            }`}
            id="nav-profile-btn"
          >
            Profile
          </button>
        </div>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3">
          {/* Emergency SOS Button */}
          <button
            onClick={onOpenSOS}
            className="flex items-center gap-1.5 bg-[#DC2626] text-white px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase hover:bg-[#B91C1C] transition-all shadow-sm hover:shadow-md cursor-pointer animate-pulse"
            id="nav-sos-btn"
            title="Emergency SOS Dispatch"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>SOS</span>
          </button>

          {/* Civic Assistant Drawer Trigger */}
          <button
            onClick={onOpenAssistant}
            className="flex items-center gap-2 bg-[#E9EFE6] text-[#4A6741] hover:bg-[#4A6741] hover:text-white px-3.5 sm:px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all border border-[#4A6741]/20 cursor-pointer"
            id="nav-assistant-btn"
            title="AI Civic Assistant"
          >
            <Bot className="w-4 h-4" />
            <span className="hidden sm:inline">Civic AI</span>
          </button>

          {/* Direct CTA */}
          <button
            onClick={() => onNavigate('report')}
            className="hidden lg:flex items-center bg-[#4A6741] text-white px-5 py-2 rounded-full text-xs font-semibold hover:bg-[#3D5535] transition-colors cursor-pointer shadow-xs"
            id="nav-quick-report-btn"
          >
            Report Grievance
          </button>
        </div>
      </div>
    </nav>
  );
};
