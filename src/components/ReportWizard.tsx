import React, { useState, useRef } from 'react';
import { 
  MapPin, 
  Upload, 
  CheckCircle, 
  AlertTriangle, 
  Sparkles, 
  X, 
  Building2, 
  Send, 
  ArrowLeft, 
  CheckCircle2, 
  Loader2,
  Camera,
  Layers,
  Crosshair
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Grievance } from '../types';

interface ReportWizardProps {
  onCancel: () => void;
  onSubmitSuccess: (newGrievance: Grievance) => void;
}

type DistressCategory = 'pothole' | 'broken_light' | 'garbage' | 'water_leak' | 'downed_tree' | 'other';

export const ReportWizard: React.FC<ReportWizardProps> = ({
  onCancel,
  onSubmitSuccess,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [address, setAddress] = useState<string>('5th Ave, New York, NY 10001');
  const [landmark, setLandmark] = useState<string>('Main St & 4th Ave');
  const [phone, setPhone] = useState<string>('+91 98765 43210');
  const [description, setDescription] = useState<string>('Deep road pothole near 5th Ave intersection causing vehicle damage.');
  
  // Distress Types
  const [selectedTypes, setSelectedTypes] = useState<DistressCategory[]>(['pothole']);
  const [otherText, setOtherText] = useState<string>('');

  // Photos State
  const [photos, setPhotos] = useState<Array<{ id: string; url: string; status: 'scanning' | 'real' | 'ai' }>>([
    {
      id: 'photo-default',
      url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80',
      status: 'real',
    }
  ]);

  const [aiDetectedWarning, setAiDetectedWarning] = useState<boolean>(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState<string>('Deep Pothole detected. Routing updated.');
  const [isSubmittingAnimation, setIsSubmittingAnimation] = useState<boolean>(false);
  const [generatedTicketNo, setGeneratedTicketNo] = useState<string>('CIV-84920');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleDistress = (type: DistressCategory) => {
    if (selectedTypes.includes(type)) {
      if (selectedTypes.length > 1) {
        setSelectedTypes(selectedTypes.filter(t => t !== type));
      }
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const getRoutingDepartment = () => {
    if (selectedTypes.includes('pothole') || selectedTypes.includes('downed_tree')) {
      return 'Public Works & Roads';
    }
    if (selectedTypes.includes('broken_light')) {
      return 'Electrical & Lighting Board';
    }
    if (selectedTypes.includes('garbage')) {
      return 'Sanitation & Solid Waste';
    }
    if (selectedTypes.includes('water_leak')) {
      return 'Water Supply & Sewerage';
    }
    return 'General Municipal Public Works';
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const fileList = e.target.files;

    for (let i = 0; i < fileList.length; i++) {
      const file: File = fileList[i];
      const reader = new FileReader();
      reader.onload = (event) => {
        const newPhotoId = `photo-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
        const newPhoto = {
          id: newPhotoId,
          url: event.target?.result as string,
          status: 'scanning' as const,
        };

        setPhotos(prev => [...prev, newPhoto]);

        // Simulate AI Authenticity verification scan
        setTimeout(() => {
          setPhotos(prev =>
            prev.map(p => (p.id === newPhotoId ? { ...p, status: 'real' } : p))
          );
          setAiAnalysisResult('Authentic capture verified. Road distress telemetry extracted.');
        }, 1200);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = (id: string) => {
    setPhotos(photos.filter(p => p.id !== id));
  };

  const goToStep = (step: number) => {
    if (step === 2) {
      setCurrentStep(2);
      // Simulate AI analyzer transition
      setTimeout(() => {
        setCurrentStep(3);
      }, 1800);
      return;
    }
    setCurrentStep(step);
  };

  const handleFinalSubmit = () => {
    setIsSubmittingAnimation(true);
    setTimeout(() => {
      setIsSubmittingAnimation(false);
      const ticket = `CIV-${Math.floor(10000 + Math.random() * 90000)}`;
      setGeneratedTicketNo(ticket);
      setCurrentStep(7);

      // Trigger celebration confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4A6741', '#E9EFE6', '#059669', '#2D2A26']
      });

      const newGrievance: Grievance = {
        id: `g-${Date.now()}`,
        ticketNumber: ticket,
        title: selectedTypes.includes('pothole') 
          ? 'Deep Road Pothole' 
          : selectedTypes.includes('broken_light')
          ? 'Streetlight Hazard'
          : selectedTypes.includes('garbage')
          ? 'Sanitation Overfill'
          : 'Civic Distress Report',
        description: description,
        category: selectedTypes[0] || 'pothole',
        status: 'In Progress',
        department: getRoutingDepartment(),
        location: address,
        landmark: landmark,
        lat: 28.6139,
        lng: 77.2090,
        reportedDate: 'Just now',
        verifiedReal: true,
        imageUrl: photos[0]?.url,
        upvotes: 1,
        hasUpvoted: true,
      };

      onSubmitSuccess(newGrievance);
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto py-4 px-2 sm:px-4">
      {/* Step Header */}
      {currentStep < 7 && (
        <div className="mb-6" id="progress-container">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={onCancel}
              className="text-xs font-semibold text-[#6B6356] hover:text-[#2D2A26] flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
            </button>
            <span className="text-xs font-serif font-bold text-[#4A6741]">
              Step {currentStep} of 6
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D2A26] mb-3">
            Report an Issue
          </h2>

          {/* Progress Segment Bar */}
          <div className="grid grid-cols-6 gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i <= currentStep ? 'bg-[#4A6741]' : 'bg-[#E5E0D5]'
                }`}
              ></div>
            ))}
          </div>
        </div>
      )}

      {/* Container Card */}
      <div className="bg-[#FDFCF8] border border-[#E5E0D5] rounded-3xl p-6 sm:p-8 shadow-sm">
        {/* STEP 1: CAPTURE */}
        {currentStep === 1 && (
          <div className="space-y-6" id="step-1">
            <div className="flex items-center justify-between border-b border-[#E5E0D5] pb-3">
              <h3 className="text-xl font-serif font-bold text-[#2D2A26]">
                Capture Issue
              </h3>
              <span className="text-xs bg-[#E9EFE6] text-[#4A6741] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                GPS Verified
              </span>
            </div>

            {/* Interactive Map Visual */}
            <div className="space-y-2">
              <div className="relative w-full h-56 rounded-2xl overflow-hidden border border-[#E5E0D5] bg-[#F5F2EA]">
                {/* Stylized Minimal Grid Vector Map */}
                <div 
                  className="w-full h-full bg-cover bg-center opacity-85"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&auto=format&fit=crop&q=80')`,
                  }}
                ></div>
                <div className="absolute inset-0 bg-[#FDFCF8]/30 backdrop-contrast-125"></div>

                {/* Center Pin Marker */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="relative flex items-center justify-center">
                    <div className="w-10 h-10 bg-[#4A6741] text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="absolute -bottom-2 w-4 h-2 bg-black/30 rounded-full blur-xs"></div>
                  </div>
                </div>

                {/* GPS Current Location Target */}
                <button
                  onClick={() => setAddress('Ward 42, Connaught Place, New Delhi 110001')}
                  className="absolute bottom-3 right-3 bg-white text-[#4A6741] p-2.5 rounded-full shadow-md hover:bg-[#E9EFE6] transition-colors border border-[#E5E0D5] cursor-pointer"
                  title="Detect Current GPS Location"
                >
                  <Crosshair className="w-4 h-4" />
                </button>
              </div>

              {/* Address Badge */}
              <div className="bg-[#F5F2EA] border border-[#E5E0D5] rounded-xl p-3 flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#4A6741] shrink-0" />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-transparent text-sm font-medium text-[#2D2A26] focus:outline-none"
                  placeholder="Enter location address or landmark..."
                />
              </div>
            </div>

            {/* Upload Photos with Authenticity AI */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold uppercase tracking-widest text-[#6B6356]">
                  Upload Photos
                </label>
                <span className="text-[11px] text-[#8B7E66]">
                  Supports JPG, PNG up to 10MB
                </span>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                multiple
                className="hidden"
              />

              <div className="flex flex-wrap gap-3" id="photo-gallery">
                {/* Upload Trigger Button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-24 h-24 border-2 border-dashed border-[#D1CEC5] rounded-2xl flex flex-col items-center justify-center bg-[#FDFCF8] hover:border-[#4A6741] hover:bg-[#E9EFE6]/30 transition-all cursor-pointer group"
                >
                  <Upload className="w-5 h-5 text-[#8B7E66] group-hover:text-[#4A6741] mb-1" />
                  <span className="text-[10px] font-bold text-[#6B6356] group-hover:text-[#4A6741]">
                    Add Photo
                  </span>
                </button>

                {/* Rendered Uploaded Photos */}
                {photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="relative w-24 h-24 rounded-2xl overflow-hidden border border-[#E5E0D5] bg-[#F5F2EA] group"
                  >
                    <img
                      src={photo.url}
                      alt="Grievance capture"
                      className="w-full h-full object-cover"
                    />

                    {photo.status === 'scanning' ? (
                      <div className="absolute inset-0 bg-[#2D2A26]/60 flex flex-col items-center justify-center text-white">
                        <Loader2 className="w-5 h-5 animate-spin text-[#85F8C4] mb-1" />
                        <span className="text-[9px] font-bold uppercase">Scanning</span>
                      </div>
                    ) : photo.status === 'real' ? (
                      <div className="absolute inset-x-0 bottom-0 bg-[#059669]/90 text-white text-[9px] py-0.5 text-center font-bold flex items-center justify-center gap-1">
                        <CheckCircle className="w-2.5 h-2.5" /> Verified Real
                      </div>
                    ) : (
                      <div className="absolute inset-x-0 bottom-0 bg-[#DC2626]/90 text-white text-[9px] py-0.5 text-center font-bold flex items-center justify-center gap-1">
                        <AlertTriangle className="w-2.5 h-2.5" /> AI Warning
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => removePhoto(photo.id)}
                      className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Real-time AI Analysis Callout Banner */}
              <div className="mt-4 bg-[#E9EFE6] border border-[#4A6741]/20 p-3.5 rounded-2xl flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#4A6741] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-[#4A6741] uppercase tracking-wider mb-0.5">
                    Real-Time AI Telemetry Analysis
                  </p>
                  <p className="text-xs text-[#2D2A26] font-medium">
                    {aiAnalysisResult}
                  </p>
                </div>
              </div>
            </div>

            {/* Distress Type Buttons */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#6B6356] mb-3">
                Distress Type (Select All That Apply)
              </label>

              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'pothole', label: 'Pothole' },
                  { id: 'broken_light', label: 'Broken Light' },
                  { id: 'garbage', label: 'Garbage' },
                  { id: 'water_leak', label: 'Water Leak' },
                  { id: 'downed_tree', label: 'Downed Tree' },
                  { id: 'other', label: 'Others' },
                ].map((item) => {
                  const isSelected = selectedTypes.includes(item.id as DistressCategory);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleDistress(item.id as DistressCategory)}
                      className={`px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-[#4A6741] text-white border-[#4A6741] shadow-xs'
                          : 'bg-white text-[#2D2A26] border-[#D1CEC5] hover:border-[#4A6741]'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>

              {selectedTypes.includes('other') && (
                <div className="mt-3">
                  <input
                    type="text"
                    value={otherText}
                    onChange={(e) => setOtherText(e.target.value)}
                    placeholder="Specify other issue (e.g., damaged road barrier, open drain)..."
                    className="w-full bg-white border border-[#E5E0D5] rounded-xl px-4 py-2.5 text-xs text-[#2D2A26] focus:outline-none focus:border-[#4A6741]"
                  />
                </div>
              )}
            </div>

            {/* Action Submit to Designated Public Works */}
            <button
              type="button"
              onClick={() => goToStep(2)}
              className="w-full bg-[#4A6741] text-white font-semibold py-4 rounded-xl shadow-md hover:bg-[#3D5535] active:scale-[0.99] transition-all cursor-pointer text-sm flex items-center justify-center gap-2"
              id="wizard-next-step-1"
            >
              <span>Submit to {getRoutingDepartment()}</span>
            </button>
          </div>
        )}

        {/* STEP 2: AI ANALYZING PULSE */}
        {currentStep === 2 && (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
            <div className="relative w-24 h-24 rounded-full bg-[#E9EFE6] flex items-center justify-center text-[#4A6741]">
              <Sparkles className="w-10 h-10 animate-spin text-[#4A6741]" />
              <div className="absolute inset-0 rounded-full border-4 border-[#4A6741]/30 animate-ping"></div>
            </div>

            <div>
              <h3 className="text-xl font-serif font-bold text-[#2D2A26] mb-2">
                Analyzing Telemetry & Photos
              </h3>
              <p className="text-xs text-[#6B6356] max-w-sm">
                Cross-referencing municipal geospatial registers, severity indices, and active dispatch queues...
              </p>
            </div>

            <div className="w-full max-w-xs h-2 bg-[#F5F2EA] rounded-full overflow-hidden">
              <div className="h-full bg-[#4A6741] rounded-full w-3/4 animate-pulse"></div>
            </div>
          </div>
        )}

        {/* STEP 3: AI VERIFICATION */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h3 className="text-xl font-serif font-bold text-[#2D2A26] border-b border-[#E5E0D5] pb-3">
              AI Verification Summary
            </h3>

            <div className="bg-[#E9EFE6] border border-[#4A6741]/20 rounded-2xl p-5 space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#4A6741] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B6356]">
                    Identified Issue
                  </p>
                  <p className="font-serif font-bold text-base text-[#2D2A26]">
                    {selectedTypes.includes('pothole') ? 'Deep Road Surface Pothole' : 'Infrastructure Distress'}
                  </p>
                  <p className="text-xs text-[#6B6356] mt-0.5">
                    Severity: High priority (vehicle hazard)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-[#4A6741]/15">
                <Building2 className="w-6 h-6 text-[#4A6741] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B6356]">
                    Routing Municipal Department
                  </p>
                  <p className="font-serif font-bold text-base text-[#2D2A26]">
                    {getRoutingDepartment()}
                  </p>
                  <p className="text-xs text-[#6B6356] mt-0.5">
                    Assigned Ward 42 Rapid Response Unit
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => goToStep(5)}
                className="flex-1 bg-[#4A6741] text-white py-3.5 rounded-xl font-semibold hover:bg-[#3D5535] transition-colors cursor-pointer text-sm"
              >
                Confirm & Continue
              </button>
              <button
                type="button"
                onClick={() => goToStep(4)}
                className="flex-1 border border-[#D1CEC5] text-[#2D2A26] py-3.5 rounded-xl font-semibold hover:bg-[#F5F2EA] transition-colors cursor-pointer text-sm"
              >
                Edit Details Manually
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: MANUAL FALLBACK */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h3 className="text-xl font-serif font-bold text-[#2D2A26] border-b border-[#E5E0D5] pb-3">
              Manual Details
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#6B6356] mb-1.5">
                  Issue Category
                </label>
                <select
                  value={selectedTypes[0]}
                  onChange={(e) => setSelectedTypes([e.target.value as DistressCategory])}
                  className="w-full bg-white border border-[#E5E0D5] rounded-xl px-4 py-3 text-sm text-[#2D2A26] focus:outline-none focus:border-[#4A6741]"
                >
                  <option value="pothole">Road Damage / Pothole</option>
                  <option value="broken_light">Streetlight Outage</option>
                  <option value="garbage">Illegal Waste / Dumping</option>
                  <option value="water_leak">Water Leakage / Pipe Burst</option>
                  <option value="downed_tree">Downed Tree / Obstruction</option>
                  <option value="other">Other Civic Issue</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#6B6356] mb-1.5">
                  Detailed Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full bg-white border border-[#E5E0D5] rounded-xl p-4 text-sm text-[#2D2A26] focus:outline-none focus:border-[#4A6741]"
                  placeholder="Describe the exact location, potential hazards, and how long it has been present..."
                ></textarea>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => goToStep(3)}
                className="flex-1 border border-[#D1CEC5] text-[#2D2A26] py-3.5 rounded-xl font-semibold hover:bg-[#F5F2EA] cursor-pointer text-sm"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => goToStep(5)}
                className="flex-1 bg-[#4A6741] text-white py-3.5 rounded-xl font-semibold hover:bg-[#3D5535] cursor-pointer text-sm"
              >
                Save & Continue
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: LOCATION & CONTACT */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <h3 className="text-xl font-serif font-bold text-[#2D2A26] border-b border-[#E5E0D5] pb-3">
              Location & Contact Confirmation
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#6B6356] mb-1.5">
                  Confirmed Incident Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-white border border-[#E5E0D5] rounded-xl px-4 py-3 text-sm text-[#2D2A26] focus:outline-none focus:border-[#4A6741]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#6B6356] mb-1.5">
                  Nearest Landmark / Cross Street
                </label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder="e.g. Near Metro Gate 2, Opposite Apollo Pharmacy"
                  className="w-full bg-white border border-[#E5E0D5] rounded-xl px-4 py-3 text-sm text-[#2D2A26] focus:outline-none focus:border-[#4A6741]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#6B6356] mb-1.5">
                  Citizen Contact Phone (For Status SMS)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white border border-[#E5E0D5] rounded-xl px-4 py-3 text-sm text-[#2D2A26] focus:outline-none focus:border-[#4A6741]"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => goToStep(3)}
                className="flex-1 border border-[#D1CEC5] text-[#2D2A26] py-3.5 rounded-xl font-semibold hover:bg-[#F5F2EA] cursor-pointer text-sm"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => goToStep(6)}
                className="flex-1 bg-[#4A6741] text-white py-3.5 rounded-xl font-semibold hover:bg-[#3D5535] cursor-pointer text-sm"
              >
                Review Report
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: FINAL REVIEW */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <h3 className="text-xl font-serif font-bold text-[#2D2A26] border-b border-[#E5E0D5] pb-3">
              Final Review
            </h3>

            <div className="border border-[#E5E0D5] rounded-2xl p-5 space-y-4 bg-white">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B6356]">
                  Grievance Category
                </p>
                <p className="font-serif font-bold text-base text-[#2D2A26]">
                  {selectedTypes.map(t => t.toUpperCase()).join(' & ')}
                </p>
              </div>

              <div className="h-px bg-[#E5E0D5] w-full"></div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B6356]">
                  Target Municipal Agency
                </p>
                <p className="text-sm font-semibold text-[#4A6741]">
                  {getRoutingDepartment()}
                </p>
              </div>

              <div className="h-px bg-[#E5E0D5] w-full"></div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B6356]">
                  Location & Landmark
                </p>
                <p className="text-sm font-medium text-[#2D2A26]">
                  {address} ({landmark})
                </p>
              </div>
            </div>

            <button
              type="button"
              disabled={isSubmittingAnimation}
              onClick={handleFinalSubmit}
              className="w-full bg-[#4A6741] text-white font-bold py-4 rounded-xl shadow-md hover:bg-[#3D5535] active:scale-[0.99] transition-all cursor-pointer text-base flex items-center justify-center gap-2"
              id="wizard-final-submit-btn"
            >
              {isSubmittingAnimation ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Submitting to Municipal Registry...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Submit Official Grievance</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => goToStep(5)}
              className="w-full text-xs font-semibold text-[#6B6356] hover:text-[#2D2A26] py-2 cursor-pointer"
            >
              Back to Edit
            </button>
          </div>
        )}

        {/* STEP 7: SUCCESS */}
        {currentStep === 7 && (
          <div className="py-8 text-center space-y-6">
            <div className="w-20 h-20 bg-[#E9EFE6] rounded-full flex items-center justify-center mx-auto text-[#4A6741] shadow-inner">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div>
              <h3 className="text-3xl font-serif font-bold text-[#2D2A26] mb-2">
                Report Submitted!
              </h3>
              <p className="text-sm text-[#6B6356] max-w-md mx-auto">
                Your grievance has been validated and routed directly to the public works supervisor in Ward 42.
              </p>
            </div>

            <div className="bg-[#F5F2EA] border border-[#E5E0D5] rounded-2xl p-6 max-w-sm mx-auto space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B6356]">
                Official Ticket Reference
              </p>
              <p className="font-serif text-3xl font-bold text-[#4A6741]">
                #{generatedTicketNo}
              </p>
              <span className="inline-block bg-[#E9EFE6] text-[#4A6741] text-[11px] font-semibold px-3 py-1 rounded-full">
                Status: Dispatched to Field Crew
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 bg-[#4A6741] text-white py-3.5 rounded-xl font-bold hover:bg-[#3D5535] transition-colors cursor-pointer text-sm"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
