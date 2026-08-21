import React, { useState } from 'react';
import { 
  Search, 
  Mic, 
  MapPin, 
  CheckCircle, 
  AlertTriangle, 
  RefreshCw, 
  Plus, 
  Layers, 
  Navigation,
  ThumbsUp,
  X,
  Crosshair
} from 'lucide-react';
import { Grievance } from '../types';

interface ExploreMapScreenProps {
  grievances: Grievance[];
  selectedGrievanceId: string | null;
  onSelectGrievance: (id: string | null) => void;
  onNavigateToReport: () => void;
  onUpvoteGrievance: (id: string) => void;
}

export const ExploreMapScreen: React.FC<ExploreMapScreenProps> = ({
  grievances,
  selectedGrievanceId,
  onSelectGrievance,
  onNavigateToReport,
  onUpvoteGrievance,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number }>({
    lat: 28.6139,
    lng: 77.2090,
  });

  const selectedGrievance = grievances.find(g => g.id === selectedGrievanceId) || grievances[0];

  const filteredGrievances = grievances.filter(g => {
    if (activeFilter === 'infrastructure') {
      return g.category === 'pothole' || g.category === 'broken_light';
    }
    if (activeFilter === 'alerts') {
      return g.status === 'In Progress' || g.status === 'Dispatched';
    }
    if (activeFilter === 'hazards') {
      return g.category === 'water_leak' || g.category === 'pothole';
    }
    return true;
  });

  return (
    <div className="relative h-[calc(100vh-140px)] md:h-[780px] w-full rounded-3xl overflow-hidden border border-[#E5E0D5] bg-[#F5F2EA] flex flex-col">
      {/* Top Search & Filter Bar Overlay */}
      <div className="absolute top-4 inset-x-4 z-20 space-y-3 pointer-events-auto max-w-xl mx-auto">
        {/* Search Input */}
        <div className="bg-[#FDFCF8]/95 backdrop-blur-md border border-[#E5E0D5] rounded-full p-1.5 pl-4 pr-2 flex items-center gap-2 shadow-md">
          <Search className="w-4 h-4 text-[#8B7E66]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search address, ward, or landmark..."
            className="flex-1 bg-transparent text-xs sm:text-sm text-[#2D2A26] placeholder-[#8B7E66] focus:outline-none"
          />
          <button 
            onClick={() => setSearchQuery('Central Greens Park, Ward 42')}
            className="p-2 text-[#4A6741] hover:bg-[#E9EFE6] rounded-full transition-colors cursor-pointer"
            title="Voice Search"
          >
            <Mic className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold">
          {[
            { id: 'all', label: 'Recent Reports', icon: RefreshCw },
            { id: 'infrastructure', label: 'Infrastructure', icon: Layers },
            { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
            { id: 'hazards', label: 'Hazards', icon: MapPin },
          ].map((pill) => {
            const Icon = pill.icon;
            const isSelected = activeFilter === pill.id;
            return (
              <button
                key={pill.id}
                onClick={() => setActiveFilter(pill.id)}
                className={`px-4 py-2 rounded-full flex items-center gap-1.5 transition-all shadow-xs cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#4A6741] text-white'
                    : 'bg-[#FDFCF8]/90 text-[#2D2A26] border border-[#E5E0D5] hover:bg-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{pill.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stylized Interactive Map Canvas */}
      <div className="relative flex-1 w-full h-full bg-[#E5E0D5] overflow-hidden">
        {/* Map Grid Background with streets and parks */}
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600&auto=format&fit=crop&q=80')`,
            filter: 'contrast(1.05) brightness(0.95)',
          }}
        ></div>

        {/* Street Labels & Park SVG Overlay */}
        <div className="absolute inset-0 bg-[#F5F2EA]/40 pointer-events-none"></div>

        {/* Interactive Map Pins */}
        <div className="absolute inset-0">
          {filteredGrievances.map((item, index) => {
            const isSelected = selectedGrievance?.id === item.id;
            // Simulated offset positions across the canvas
            const topOffsets = ['35%', '52%', '68%', '42%'];
            const leftOffsets = ['45%', '58%', '32%', '65%'];

            return (
              <div
                key={item.id}
                onClick={() => onSelectGrievance(item.id)}
                style={{
                  top: topOffsets[index % topOffsets.length],
                  left: leftOffsets[index % leftOffsets.length],
                }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 transition-transform ${
                  isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                }`}
              >
                <div className="relative group flex flex-col items-center">
                  {/* Pin Body */}
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg border-2 border-white transition-colors ${
                      item.status === 'Resolved'
                        ? 'bg-[#059669] text-white'
                        : item.status === 'In Progress'
                        ? 'bg-[#4A6741] text-white'
                        : 'bg-[#DC2626] text-white'
                    }`}
                  >
                    {item.status === 'Resolved' ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <RefreshCw className="w-4 h-4 animate-spin" style={{ animationDuration: '8s' }} />
                    )}
                  </div>

                  {/* Pin Label on Hover or Selected */}
                  <div
                    className={`mt-1 bg-[#2D2A26] text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-md whitespace-nowrap transition-opacity ${
                      isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    #{item.ticketNumber} • {item.title}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Controls (GPS re-center & New Report) */}
        <div className="absolute right-4 bottom-32 md:bottom-28 z-20 flex flex-col gap-2">
          <button
            onClick={() => {
              setUserLocation({ lat: 28.6139, lng: 77.2090 });
              alert('Map centered on current GPS coordinates: Ward 42, New Delhi');
            }}
            className="w-12 h-12 bg-white text-[#4A6741] border border-[#E5E0D5] rounded-full shadow-lg flex items-center justify-center hover:bg-[#E9EFE6] transition-colors cursor-pointer"
            title="Recenter Map"
          >
            <Crosshair className="w-5 h-5" />
          </button>

          <button
            onClick={onNavigateToReport}
            className="w-14 h-14 bg-[#4A6741] text-white rounded-full shadow-xl flex items-center justify-center hover:bg-[#3D5535] active:scale-95 transition-all cursor-pointer border-2 border-white"
            id="map-floating-report-btn"
            title="Report an Issue at this location"
          >
            <Plus className="w-7 h-7" />
          </button>
        </div>
      </div>

      {/* Bottom Selected Grievance Card */}
      {selectedGrievance && (
        <div className="bg-[#FDFCF8] border-t border-[#E5E0D5] p-4 sm:p-5 z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
          <div className="flex items-start gap-3 flex-1">
            <div className="w-12 h-12 rounded-xl bg-[#F5F2EA] border border-[#E5E0D5] overflow-hidden shrink-0">
              <img
                src={selectedGrievance.imageUrl || 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=200&auto=format&fit=crop&q=80'}
                alt={selectedGrievance.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs font-bold text-[#4A6741]">
                  #{selectedGrievance.ticketNumber}
                </span>
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                  selectedGrievance.status === 'Resolved'
                    ? 'bg-[#059669] text-white'
                    : 'bg-[#E9EFE6] text-[#4A6741]'
                }`}>
                  {selectedGrievance.status}
                </span>
                <span className="text-[11px] text-[#8B7E66]">
                  {selectedGrievance.department}
                </span>
              </div>

              <h4 className="font-serif font-bold text-sm text-[#2D2A26]">
                {selectedGrievance.title}
              </h4>
              <p className="text-xs text-[#6B6356] flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-[#4A6741]" />
                {selectedGrievance.location} ({selectedGrievance.landmark})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => onUpvoteGrievance(selectedGrievance.id)}
              className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                selectedGrievance.hasUpvoted
                  ? 'bg-[#E9EFE6] text-[#4A6741] font-bold'
                  : 'bg-[#F5F2EA] text-[#2D2A26] border border-[#E5E0D5] hover:bg-[#E9EFE6]'
              }`}
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>{selectedGrievance.upvotes} Upvotes</span>
            </button>

            <button
              onClick={onNavigateToReport}
              className="flex-1 sm:flex-none bg-[#4A6741] text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#3D5535] transition-colors cursor-pointer"
            >
              Report Nearby
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
