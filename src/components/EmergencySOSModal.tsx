import React, { useState, useEffect } from 'react';
import { 
  X, 
  AlertTriangle, 
  ShieldAlert, 
  Navigation, 
  Phone, 
  Camera, 
  Radio,
  CheckCircle,
  Ambulance,
  Flame,
  ShieldCheck
} from 'lucide-react';

interface EmergencySOSModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencySOSModal: React.FC<EmergencySOSModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [lat, setLat] = useState<number>(37.7749);
  const [lng, setLng] = useState<number>(-122.4194);
  const [isSharingLive, setIsSharingLive] = useState<boolean>(true);
  const [activeCallService, setActiveCallService] = useState<string | null>(null);
  const [photoUploaded, setPhotoUploaded] = useState<boolean>(false);

  // Simulate GPS jitter for live beacon feel
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      const jitterLat = (Math.random() - 0.5) * 0.0001;
      const jitterLng = (Math.random() - 0.5) * 0.0001;
      setLat(prev => +(prev + jitterLat).toFixed(4));
      setLng(prev => +(prev + jitterLng).toFixed(4));
    }, 2000);
    return () => clearInterval(interval);
  }, [isOpen]);

  const handleDial = (serviceName: string, number: string) => {
    setActiveCallService(serviceName);
    setTimeout(() => {
      setActiveCallService(null);
      alert(`Simulated emergency dispatch call to ${serviceName} (${number}). Dispatch line is active.`);
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FDFCF8] border-2 border-[#DC2626] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#DC2626] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-6 h-6 text-white" />
            <div>
              <h2 className="font-serif font-bold text-lg leading-tight">
                Emergency SOS Beacon
              </h2>
              <span className="text-[10px] text-white/80 uppercase tracking-widest font-semibold">
                Direct Municipal First-Responder Dispatch
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status Alert Banner */}
          <div className="bg-[#FEE2E2] border border-[#DC2626]/40 p-4 rounded-2xl flex items-start gap-3 text-[#991B1B]">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-0.5">
                Dispatch Broadcast Active
              </p>
              <p className="text-xs font-medium leading-relaxed">
                Emergency municipal services have been alerted to your live coordinates. Stay calm and remain in a secure position.
              </p>
            </div>
          </div>

          {/* Large SOS Pulsing Trigger */}
          <div className="flex flex-col items-center justify-center py-4">
            <button
              onClick={() => handleDial('Central Emergency Dispatch', '911')}
              className="w-36 h-36 rounded-full bg-[#DC2626] text-white flex flex-col items-center justify-center pulse-emergency cursor-pointer active:scale-95 transition-transform shadow-xl"
              id="sos-large-button"
            >
              <span className="font-serif text-3xl font-black tracking-widest">SOS</span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-white/90 mt-1">
                DISPATCH NOW
              </span>
            </button>
            <p className="mt-4 text-xs text-[#6B6356] text-center max-w-[260px]">
              First responders are tracking this transmission. Tap to re-signal priority.
            </p>
          </div>

          {/* Live Location Telemetry Card */}
          <div className="bg-white border border-[#E5E0D5] rounded-2xl p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#4A6741]">
                <Radio className="w-4 h-4 text-[#059669] animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#2D2A26]">
                  Live Location
                </span>
              </div>
              <span className="bg-[#E9EFE6] text-[#4A6741] font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Transmitting (5m Accuracy)
              </span>
            </div>

            {/* Coordinates display */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#F5F2EA] p-3 rounded-xl border border-[#E5E0D5]">
                <p className="text-[10px] text-[#6B6356] font-bold uppercase tracking-wider mb-0.5">
                  Latitude
                </p>
                <p className="font-mono text-xs sm:text-sm font-bold text-[#2D2A26]">
                  {lat}° N
                </p>
              </div>
              <div className="bg-[#F5F2EA] p-3 rounded-xl border border-[#E5E0D5]">
                <p className="text-[10px] text-[#6B6356] font-bold uppercase tracking-wider mb-0.5">
                  Longitude
                </p>
                <p className="font-mono text-xs sm:text-sm font-bold text-[#2D2A26]">
                  {lng}° W
                </p>
              </div>
            </div>

            {/* Live Location Toggle */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-[#6B6356] font-medium">
                Share Continuous GPS Telemetry
              </span>
              <button
                onClick={() => setIsSharingLive(!isSharingLive)}
                className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 cursor-pointer ${
                  isSharingLive ? 'bg-[#4A6741]' : 'bg-[#D1CEC5]'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                    isSharingLive ? 'translate-x-5' : 'translate-x-0'
                  }`}
                ></div>
              </button>
            </div>

            {/* Upload Location Photo */}
            <button
              onClick={() => setPhotoUploaded(!photoUploaded)}
              className="w-full py-3 border-2 border-dashed border-[#D1CEC5] rounded-xl flex items-center justify-center gap-2 hover:bg-[#F5F2EA] hover:border-[#4A6741] transition-colors cursor-pointer text-xs font-semibold text-[#6B6356]"
            >
              <Camera className="w-4 h-4 text-[#4A6741]" />
              <span>
                {photoUploaded ? 'Photo Attached (1 File)' : 'Upload Location Photo for Responders'}
              </span>
            </button>
          </div>

          {/* Quick Dial Grid */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#6B6356] mb-2.5">
              Direct Quick Dial
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {/* Police */}
              <button
                onClick={() => handleDial('Police Control Room', '911')}
                className="bg-white border border-[#E5E0D5] hover:border-[#4A6741] p-3 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all hover:shadow-sm active:scale-95 cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold text-[#2D2A26]">Police</p>
                  <p className="text-[10px] text-[#6B6356] font-mono">911 / 100</p>
                </div>
              </button>

              {/* Ambulance */}
              <button
                onClick={() => handleDial('Emergency Medical Services', '102')}
                className="bg-white border border-[#E5E0D5] hover:border-[#DC2626] p-3 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all hover:shadow-sm active:scale-95 cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full bg-red-100 text-red-700 flex items-center justify-center">
                  <Ambulance className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold text-[#2D2A26]">Ambulance</p>
                  <p className="text-[10px] text-[#6B6356] font-mono">102 / 911</p>
                </div>
              </button>

              {/* Fire */}
              <button
                onClick={() => handleDial('Fire & Rescue Services', '101')}
                className="bg-white border border-[#E5E0D5] hover:border-orange-500 p-3 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all hover:shadow-sm active:scale-95 cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center">
                  <Flame className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold text-[#2D2A26]">Fire</p>
                  <p className="text-[10px] text-[#6B6356] font-mono">101</p>
                </div>
              </button>
            </div>
          </div>

          {/* Cancel False Alarm */}
          <button
            onClick={() => {
              if (confirm('Are you sure you want to cancel this emergency beacon?')) {
                onClose();
              }
            }}
            className="w-full py-3 rounded-xl border border-[#D1CEC5] text-[#6B6356] hover:text-[#2D2A26] hover:bg-[#F5F2EA] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Cancel False Alarm
          </button>
        </div>
      </div>
    </div>
  );
};
