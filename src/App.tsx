import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { ReportWizard } from './components/ReportWizard';
import { ExploreMapScreen } from './components/ExploreMapScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { InitiativesScreen } from './components/InitiativesScreen';
import { FAQScreen } from './components/FAQScreen';
import { EmergencySOSModal } from './components/EmergencySOSModal';
import { CivicAssistantDrawer } from './components/CivicAssistantDrawer';
import { 
  INITIAL_PROFILE, 
  INITIAL_FAQS, 
  INITIAL_GRIEVANCES, 
  INITIAL_INITIATIVES 
} from './data/mockData';
import { Grievance, Initiative, UserProfile } from './types';
import { CheckCircle2, ShieldAlert } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [grievances, setGrievances] = useState<Grievance[]>(INITIAL_GRIEVANCES);
  const [initiatives, setInitiatives] = useState<Initiative[]>(INITIAL_INITIATIVES);
  const [faqs] = useState(INITIAL_FAQS);
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [selectedGrievanceId, setSelectedGrievanceId] = useState<string | null>(null);

  const [isSOSOpen, setIsSOSOpen] = useState<boolean>(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleVoteInitiative = (id: string) => {
    setInitiatives(prev =>
      prev.map(item => {
        if (item.id === id) {
          const nextVoted = !item.hasVoted;
          showToast(nextVoted ? `Endorsed "${item.title}"` : `Vote removed from "${item.title}"`);
          return {
            ...item,
            hasVoted: nextVoted,
            votesCount: nextVoted ? item.votesCount + 1 : item.votesCount - 1,
          };
        }
        return item;
      })
    );
  };

  const handleUpvoteGrievance = (id: string) => {
    setGrievances(prev =>
      prev.map(item => {
        if (item.id === id) {
          const nextUpvoted = !item.hasUpvoted;
          showToast(nextUpvoted ? `Upvoted ticket #${item.ticketNumber}` : `Removed upvote on #${item.ticketNumber}`);
          return {
            ...item,
            hasUpvoted: nextUpvoted,
            upvotes: nextUpvoted ? item.upvotes + 1 : item.upvotes - 1,
          };
        }
        return item;
      })
    );
  };

  const handleCreateInitiative = (newInit: Initiative) => {
    setInitiatives(prev => [newInit, ...prev]);
    showToast(`Published community proposal "${newInit.title}"`);
  };

  const handleGrievanceSubmitSuccess = (newGrievance: Grievance) => {
    setGrievances(prev => [newGrievance, ...prev]);
    showToast(`Grievance #${newGrievance.ticketNumber} submitted to ${newGrievance.department}!`);
  };

  const handleSelectGrievanceOnMap = (id: string) => {
    setSelectedGrievanceId(id);
    setCurrentTab('explore');
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#2D2A26] flex flex-col font-sans selection:bg-[#E9EFE6] selection:text-[#4A6741]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#2D2A26] text-white px-5 py-3 rounded-full text-xs font-semibold shadow-2xl flex items-center gap-2.5 animate-in fade-in slide-in-from-top-4 duration-200 border border-[#E5E0D5]/20">
          <CheckCircle2 className="w-4 h-4 text-[#85F8C4]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSOS={() => setIsSOSOpen(true)}
        onOpenAssistant={() => setIsAssistantOpen(true)}
      />

      {/* Main Screen Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 lg:px-12 pt-6 sm:pt-8">
        {currentTab === 'home' && (
          <HomeScreen
            faqs={faqs}
            initiatives={initiatives}
            grievances={grievances}
            onNavigate={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onVoteInitiative={handleVoteInitiative}
            onUpvoteGrievance={handleUpvoteGrievance}
            onOpenAssistant={() => setIsAssistantOpen(true)}
            onSelectGrievanceOnMap={handleSelectGrievanceOnMap}
          />
        )}

        {currentTab === 'report' && (
          <ReportWizard
            onCancel={() => setCurrentTab('home')}
            onSubmitSuccess={handleGrievanceSubmitSuccess}
          />
        )}

        {currentTab === 'explore' && (
          <ExploreMapScreen
            grievances={grievances}
            selectedGrievanceId={selectedGrievanceId}
            onSelectGrievance={setSelectedGrievanceId}
            onNavigateToReport={() => setCurrentTab('report')}
            onUpvoteGrievance={handleUpvoteGrievance}
          />
        )}

        {currentTab === 'initiatives' && (
          <InitiativesScreen
            initiatives={initiatives}
            onVote={handleVoteInitiative}
            onCreateInitiative={handleCreateInitiative}
          />
        )}

        {currentTab === 'faq' && (
          <FAQScreen
            faqs={faqs}
            onOpenAssistant={() => setIsAssistantOpen(true)}
          />
        )}

        {currentTab === 'profile' && (
          <ProfileScreen
            profile={profile}
            grievances={grievances}
            onUpdateProfile={(updated) => {
              setProfile(updated);
              showToast('Profile updated successfully');
            }}
            onNavigateToExplore={() => setCurrentTab('explore')}
          />
        )}
      </main>

      {/* Emergency SOS Modal */}
      <EmergencySOSModal
        isOpen={isSOSOpen}
        onClose={() => setIsSOSOpen(false)}
      />

      {/* Civic Assistant Drawer */}
      <CivicAssistantDrawer
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        onNavigateToReport={() => {
          setIsAssistantOpen(false);
          setCurrentTab('report');
        }}
        onNavigateToExplore={() => {
          setIsAssistantOpen(false);
          setCurrentTab('explore');
        }}
      />

      {/* Mobile Bottom Navigation */}
      <BottomNav
        currentTab={currentTab}
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
