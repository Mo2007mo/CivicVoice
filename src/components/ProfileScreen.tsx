import React, { useState, useRef } from 'react';
import { 
  User, 
  MapPin, 
  Mail, 
  Phone, 
  ShieldCheck, 
  CreditCard, 
  Bell, 
  History, 
  LogOut, 
  Edit3, 
  Camera, 
  CheckCircle2, 
  X,
  Building,
  Check
} from 'lucide-react';
import { UserProfile, Grievance } from '../types';

interface ProfileScreenProps {
  profile: UserProfile;
  grievances: Grievance[];
  onUpdateProfile: (updated: UserProfile) => void;
  onNavigateToExplore: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  profile,
  grievances,
  onUpdateProfile,
  onNavigateToExplore,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState<boolean>(false);
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);

  const [name, setName] = useState<string>(profile.name);
  const [ward, setWard] = useState<string>(profile.ward);
  const [city, setCity] = useState<string>(profile.city);
  const [email, setEmail] = useState<string>(profile.email);
  const [phone, setPhone] = useState<string>(profile.phone);

  const [notificationSettings, setNotificationSettings] = useState(profile.notificationSettings);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      onUpdateProfile({
        ...profile,
        avatarUrl: ev.target?.result as string,
      });
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSaveProfile = () => {
    onUpdateProfile({
      ...profile,
      name,
      ward,
      city,
      email,
      phone,
      notificationSettings,
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-24 md:pb-16 px-2 sm:px-4">
      {/* Profile Header Card */}
      <section className="bg-[#FDFCF8] rounded-3xl border border-[#E5E0D5] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden shadow-xs">
        {/* Avatar with Camera Trigger */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-[#F5F2EA] shadow-sm shrink-0">
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 bg-[#4A6741] text-white p-2 rounded-full cursor-pointer hover:bg-[#3D5535] transition-colors shadow-md border-2 border-white flex items-center justify-center"
            title="Change Avatar Photo"
          >
            <Camera className="w-4 h-4" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleAvatarChange}
            accept="image/*"
            className="hidden"
          />
        </div>

        {/* Name & Location Info */}
        <div className="text-center sm:text-left flex-1">
          <div className="inline-flex items-center gap-1.5 bg-[#E9EFE6] text-[#4A6741] px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            Verified Resident Citizen
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2D2A26] mb-1">
            {profile.name}
          </h2>
          <div className="flex items-center justify-center sm:justify-start gap-1.5 text-[#6B6356] text-xs font-medium">
            <Building className="w-4 h-4 text-[#4A6741]" />
            <span>{profile.ward}, {profile.city}</span>
          </div>
        </div>

        {/* Edit Button */}
        <div className="w-full sm:w-auto">
          <button
            onClick={() => setIsEditing(true)}
            className="w-full sm:w-auto px-6 py-3 bg-[#4A6741] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#3D5535] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            id="profile-edit-btn"
          >
            <Edit3 className="w-4 h-4" />
            Edit Profile
          </button>
        </div>
      </section>

      {/* Grid for Contact & Identity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Info Card */}
        <section className="bg-white rounded-3xl border border-[#E5E0D5] p-6 flex flex-col justify-between shadow-xs">
          <div>
            <h3 className="font-serif font-bold text-sm text-[#2D2A26] mb-4 flex items-center gap-2 border-b border-[#E5E0D5] pb-3">
              <Mail className="w-4 h-4 text-[#4A6741]" />
              Contact Information
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#6B6356] mb-1">
                  Email Address
                </label>
                <p className="text-sm font-medium text-[#2D2A26]">
                  {profile.email}
                </p>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#6B6356] mb-1">
                  Phone Number
                </label>
                <p className="text-sm font-medium text-[#2D2A26]">
                  {profile.phone}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Identity Verification Card */}
        <section className="bg-white rounded-3xl border border-[#E5E0D5] p-6 flex flex-col justify-between relative overflow-hidden shadow-xs">
          <div className="absolute top-0 right-0 w-28 h-28 bg-[#E9EFE6] rounded-bl-full pointer-events-none"></div>

          <div className="relative z-10">
            <div className="flex justify-between items-center mb-4 border-b border-[#E5E0D5] pb-3">
              <h3 className="font-serif font-bold text-sm text-[#2D2A26] flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#4A6741]" />
                Identity Verification
              </h3>
              <span className="inline-flex items-center gap-1 bg-[#4A6741] text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                <Check className="w-3 h-3" />
                Verified
              </span>
            </div>

            <div className="bg-[#F5F2EA] p-4 rounded-2xl border border-[#E5E0D5] flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#6B6356]">
                <span>Aadhaar / National Citizen ID</span>
                <CreditCard className="w-4 h-4 text-[#8B7E66]" />
              </div>
              <div className="font-serif text-lg font-bold tracking-widest text-[#2D2A26] mt-1">
                {profile.aadhaarNumber}
              </div>
              <p className="text-[11px] text-[#6B6356] mt-1">
                Cryptographically bound to Ward 42 for transparent civic vote verification.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Settings / Actions List */}
      <section className="bg-white rounded-3xl border border-[#E5E0D5] p-2 shadow-xs">
        <ul className="divide-y divide-[#E5E0D5]">
          <li>
            <button
              onClick={() => setShowNotificationsModal(true)}
              className="w-full flex items-center justify-between p-4 hover:bg-[#F5F2EA] transition-colors rounded-2xl cursor-pointer text-left group"
            >
              <div className="flex items-center gap-3.5 text-[#2D2A26]">
                <div className="w-9 h-9 rounded-full bg-[#F5F2EA] flex items-center justify-center text-[#6B6356] group-hover:text-[#4A6741] group-hover:bg-[#E9EFE6]">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-xs sm:text-sm block">
                    Notification Preferences
                  </span>
                  <span className="text-[11px] text-[#6B6356]">
                    SMS alerts, digital town hall reminders, push updates
                  </span>
                </div>
              </div>
              <span className="text-xs font-semibold text-[#4A6741]">Configure</span>
            </button>
          </li>

          <li>
            <button
              onClick={() => setShowHistoryModal(true)}
              className="w-full flex items-center justify-between p-4 hover:bg-[#F5F2EA] transition-colors rounded-2xl cursor-pointer text-left group"
            >
              <div className="flex items-center gap-3.5 text-[#2D2A26]">
                <div className="w-9 h-9 rounded-full bg-[#F5F2EA] flex items-center justify-center text-[#6B6356] group-hover:text-[#4A6741] group-hover:bg-[#E9EFE6]">
                  <History className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-xs sm:text-sm block">
                    My Grievance History
                  </span>
                  <span className="text-[11px] text-[#6B6356]">
                    {grievances.length} tickets filed • Track live resolutions
                  </span>
                </div>
              </div>
              <span className="text-xs font-semibold text-[#4A6741]">View All</span>
            </button>
          </li>

          <li>
            <button
              onClick={() => alert('Signed out securely. Session credentials cleared.')}
              className="w-full flex items-center justify-between p-4 hover:bg-red-50 transition-colors rounded-2xl cursor-pointer text-left text-[#DC2626] group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-full bg-red-100/60 flex items-center justify-center text-[#DC2626]">
                  <LogOut className="w-4 h-4" />
                </div>
                <span className="font-semibold text-xs sm:text-sm">
                  Sign Out Citizen Account
                </span>
              </div>
            </button>
          </li>
        </ul>
      </section>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FDFCF8] border border-[#E5E0D5] rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E5E0D5] pb-3">
              <h3 className="font-serif font-bold text-lg text-[#2D2A26]">
                Edit Profile Information
              </h3>
              <button
                onClick={() => setIsEditing(false)}
                className="w-8 h-8 rounded-full bg-[#F5F2EA] hover:bg-[#E5E0D5] flex items-center justify-center text-[#6B6356]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-widest text-[#6B6356] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-[#E5E0D5] rounded-xl px-3.5 py-2.5 text-sm text-[#2D2A26] focus:outline-none focus:border-[#4A6741]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase tracking-widest text-[#6B6356] mb-1">
                    Ward
                  </label>
                  <input
                    type="text"
                    value={ward}
                    onChange={(e) => setWard(e.target.value)}
                    className="w-full bg-white border border-[#E5E0D5] rounded-xl px-3.5 py-2.5 text-sm text-[#2D2A26] focus:outline-none focus:border-[#4A6741]"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase tracking-widest text-[#6B6356] mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-white border border-[#E5E0D5] rounded-xl px-3.5 py-2.5 text-sm text-[#2D2A26] focus:outline-none focus:border-[#4A6741]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-widest text-[#6B6356] mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-[#E5E0D5] rounded-xl px-3.5 py-2.5 text-sm text-[#2D2A26] focus:outline-none focus:border-[#4A6741]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-widest text-[#6B6356] mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white border border-[#E5E0D5] rounded-xl px-3.5 py-2.5 text-sm text-[#2D2A26] focus:outline-none focus:border-[#4A6741]"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 py-3 rounded-xl border border-[#D1CEC5] text-xs font-bold text-[#6B6356] hover:bg-[#F5F2EA]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveProfile}
                className="flex-1 py-3 rounded-xl bg-[#4A6741] text-white text-xs font-bold hover:bg-[#3D5535]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Modal */}
      {showNotificationsModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FDFCF8] border border-[#E5E0D5] rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E5E0D5] pb-3">
              <h3 className="font-serif font-bold text-lg text-[#2D2A26]">
                Notification Preferences
              </h3>
              <button
                onClick={() => setShowNotificationsModal(false)}
                className="w-8 h-8 rounded-full bg-[#F5F2EA] flex items-center justify-center text-[#6B6356]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {[
                { key: 'sms', label: 'SMS Progress Updates', desc: 'Instant text messages when your ticket changes status' },
                { key: 'email', label: 'Town Hall & Poll Digests', desc: 'Weekly email digest of community initiatives' },
                { key: 'push', label: 'Real-Time App Notifications', desc: 'Instant push notifications for neighborhood hazards' },
                { key: 'emergencyAlerts', label: 'Civic SOS Broadcasts', desc: 'Severe storm, pipeline & evacuation warnings' },
              ].map((setting) => (
                <div key={setting.key} className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold text-[#2D2A26]">{setting.label}</p>
                    <p className="text-[11px] text-[#6B6356]">{setting.desc}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={(notificationSettings as any)[setting.key]}
                    onChange={(e) => {
                      setNotificationSettings({
                        ...notificationSettings,
                        [setting.key]: e.target.checked,
                      });
                    }}
                    className="w-5 h-5 rounded text-[#4A6741] focus:ring-[#4A6741] accent-[#4A6741] cursor-pointer mt-1"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                onUpdateProfile({ ...profile, notificationSettings });
                setShowNotificationsModal(false);
              }}
              className="w-full py-3 rounded-xl bg-[#4A6741] text-white text-xs font-bold hover:bg-[#3D5535]"
            >
              Save Preferences
            </button>
          </div>
        </div>
      )}

      {/* History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FDFCF8] border border-[#E5E0D5] rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-[#E5E0D5] pb-3">
              <h3 className="font-serif font-bold text-lg text-[#2D2A26]">
                My Filed Grievances ({grievances.length})
              </h3>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="w-8 h-8 rounded-full bg-[#F5F2EA] flex items-center justify-center text-[#6B6356]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {grievances.map((item) => (
                <div key={item.id} className="bg-white border border-[#E5E0D5] p-4 rounded-2xl">
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <span className="text-xs font-bold font-mono text-[#4A6741]">
                      #{item.ticketNumber}
                    </span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      item.status === 'Resolved' ? 'bg-[#059669] text-white' : 'bg-[#E9EFE6] text-[#4A6741]'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-sm text-[#2D2A26]">{item.title}</h4>
                  <p className="text-xs text-[#6B6356] mt-1">{item.location} • {item.reportedDate}</p>
                  <p className="text-[11px] text-[#8B7E66] mt-1">Routed to: {item.department}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
