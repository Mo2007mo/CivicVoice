import React, { useState } from 'react';
import { 
  Vote, 
  Plus, 
  Clock, 
  ThumbsUp, 
  Users, 
  CheckCircle2, 
  X, 
  FileText,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Initiative } from '../types';

interface InitiativesScreenProps {
  initiatives: Initiative[];
  onVote: (id: string) => void;
  onCreateInitiative: (newInit: Initiative) => void;
}

export const InitiativesScreen: React.FC<InitiativesScreenProps> = ({
  initiatives,
  onVote,
  onCreateInitiative,
}) => {
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('Urban Greens & Parks');
  const [description, setDescription] = useState<string>('');
  const [authorName, setAuthorName] = useState<string>('Arjun Sharma');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    const newInit: Initiative = {
      id: `init-${Date.now()}`,
      title,
      description,
      category,
      votesCount: 1,
      targetVotes: 250,
      daysLeft: 14,
      author: authorName,
      hasVoted: true,
      status: 'Active Voting',
    };

    onCreateInitiative(newInit);
    setShowCreateModal(false);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-24 md:pb-16 px-2 sm:px-4">
      {/* Header Banner */}
      <div className="bg-[#E9EFE6] border border-[#4A6741]/20 rounded-3xl p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 bg-white text-[#4A6741] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-[#4A6741]/20">
            <Vote className="w-3.5 h-3.5" />
            Direct Participatory Budgeting
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2D2A26]">
            Community Polls & Ballot Initiatives
          </h2>
          <p className="text-xs sm:text-sm text-[#6B6356] leading-relaxed">
            Every verified resident over 16 has direct voting power on local Ward 42 funding proposals. 
            Initiatives reaching 500 verified endorsements are tabled at the next City Council session.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-[#4A6741] text-white px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#3D5535] transition-all cursor-pointer shadow-md flex items-center gap-2 shrink-0"
          id="propose-initiative-btn"
        >
          <Plus className="w-4 h-4" />
          Propose Initiative
        </button>
      </div>

      {/* Initiatives Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {initiatives.map((item) => {
          const percent = Math.min(100, Math.round((item.votesCount / item.targetVotes) * 100));
          return (
            <div
              key={item.id}
              className="bg-white border border-[#E5E0D5] rounded-3xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="bg-[#E9EFE6] text-[#4A6741] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
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
                <p className="text-xs text-[#6B6356] leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5E0D5] space-y-4">
                {/* Meter */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1.5 text-[#2D2A26]">
                    <span>{item.votesCount} Verified Citizens</span>
                    <span className="text-[#8B7E66]">Target: {item.targetVotes} ({percent}%)</span>
                  </div>
                  <div className="w-full h-2.5 bg-[#F5F2EA] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#4A6741] rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-[#8B7E66]">
                    Proposed by {item.author}
                  </span>
                  <button
                    onClick={() => onVote(item.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                      item.hasVoted
                        ? 'bg-[#4A6741] text-white shadow-xs'
                        : 'border border-[#4A6741] text-[#4A6741] hover:bg-[#E9EFE6]'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    {item.hasVoted ? 'Endorsed' : 'Vote Poll'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Propose Initiative Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FDFCF8] border border-[#E5E0D5] rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E5E0D5] pb-3">
              <h3 className="font-serif font-bold text-xl text-[#2D2A26]">
                Propose New Community Initiative
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="w-8 h-8 rounded-full bg-[#F5F2EA] flex items-center justify-center text-[#6B6356] hover:bg-[#E5E0D5]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-widest text-[#6B6356] mb-1.5">
                  Initiative Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Installation of Speed Bumps on Pine Avenue"
                  className="w-full bg-white border border-[#E5E0D5] rounded-xl px-4 py-3 text-sm text-[#2D2A26] focus:outline-none focus:border-[#4A6741]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-widest text-[#6B6356] mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-white border border-[#E5E0D5] rounded-xl px-4 py-3 text-sm text-[#2D2A26] focus:outline-none focus:border-[#4A6741]"
                >
                  <option>Mobility & Safety</option>
                  <option>Urban Greens & Parks</option>
                  <option>Public Safety & Lighting</option>
                  <option>Community & Commerce</option>
                  <option>Water & Sanitation</option>
                </select>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-widest text-[#6B6356] mb-1.5">
                  Detailed Proposal & Justification
                </label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain why this improvement is needed, how it benefits the neighborhood, and estimated impact..."
                  className="w-full bg-white border border-[#E5E0D5] rounded-xl p-4 text-sm text-[#2D2A26] focus:outline-none focus:border-[#4A6741]"
                ></textarea>
              </div>

              <div className="bg-[#E9EFE6] p-3.5 rounded-2xl border border-[#4A6741]/20">
                <p className="text-[11px] text-[#4A6741] font-medium">
                  Verified Resident Mandate: You will need 50 signatures from fellow Ward 42 residents to table this item for formal municipal budget review.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-3 rounded-xl border border-[#D1CEC5] text-xs font-bold text-[#6B6356] hover:bg-[#F5F2EA]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-[#4A6741] text-white text-xs font-bold hover:bg-[#3D5535] shadow-sm"
                >
                  Publish Initiative
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
