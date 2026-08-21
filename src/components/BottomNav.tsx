import React from 'react';
import { Home, MapPin, PlusCircle, Vote, User } from 'lucide-react';

interface BottomNavProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onNavigate,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#FDFCF8]/95 backdrop-blur-xl border-t border-[#E5E0D5] py-2 px-3 flex items-center justify-around shadow-lg">
      <button
        onClick={() => onNavigate('home')}
        className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-colors cursor-pointer ${
          currentTab === 'home'
            ? 'text-[#4A6741] font-bold'
            : 'text-[#6B6356] hover:text-[#2D2A26]'
        }`}
        id="mobile-nav-home"
      >
        <Home className={`w-5 h-5 mb-0.5 ${currentTab === 'home' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
        <span className="text-[10px] tracking-wider uppercase">Home</span>
      </button>

      <button
        onClick={() => onNavigate('explore')}
        className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-colors cursor-pointer ${
          currentTab === 'explore'
            ? 'text-[#4A6741] font-bold'
            : 'text-[#6B6356] hover:text-[#2D2A26]'
        }`}
        id="mobile-nav-explore"
      >
        <MapPin className={`w-5 h-5 mb-0.5 ${currentTab === 'explore' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
        <span className="text-[10px] tracking-wider uppercase">Explore</span>
      </button>

      {/* Center Report Action */}
      <button
        onClick={() => onNavigate('report')}
        className="flex flex-col items-center justify-center -mt-5 bg-[#4A6741] text-white p-3 rounded-full shadow-md hover:bg-[#3D5535] active:scale-95 transition-transform cursor-pointer border-4 border-[#FDFCF8]"
        id="mobile-nav-report-action"
        title="Report an Issue"
      >
        <PlusCircle className="w-6 h-6 stroke-[2.2]" />
      </button>

      <button
        onClick={() => onNavigate('initiatives')}
        className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-colors cursor-pointer ${
          currentTab === 'initiatives'
            ? 'text-[#4A6741] font-bold'
            : 'text-[#6B6356] hover:text-[#2D2A26]'
        }`}
        id="mobile-nav-initiatives"
      >
        <Vote className={`w-5 h-5 mb-0.5 ${currentTab === 'initiatives' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
        <span className="text-[10px] tracking-wider uppercase">Polls</span>
      </button>

      <button
        onClick={() => onNavigate('profile')}
        className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-colors cursor-pointer ${
          currentTab === 'profile'
            ? 'text-[#4A6741] font-bold'
            : 'text-[#6B6356] hover:text-[#2D2A26]'
        }`}
        id="mobile-nav-profile"
      >
        <User className={`w-5 h-5 mb-0.5 ${currentTab === 'profile' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
        <span className="text-[10px] tracking-wider uppercase">Profile</span>
      </button>
    </nav>
  );
};
