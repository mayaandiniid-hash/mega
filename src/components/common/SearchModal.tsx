import React, { useState, useEffect } from 'react';
import { db } from '../../lib/storage';
import { soundEngine } from '../../lib/sound';
import { Search, X, BookOpen, Trophy, Sparkles, Gamepad2, ArrowRight } from 'lucide-react';
import { Subject, GameItem, Reward } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSubject: (subjectId: string) => void;
  onSelectReward: () => void;
  onSelectGame: (gameId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectSubject,
  onSelectReward,
  onSelectGame,
}) => {
  const [query, setQuery] = useState('');
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [games, setGames] = useState<GameItem[]>([]);
  const [rewards, setRewards] = useState<Reward[]>([]);

  useEffect(() => {
    if (isOpen) {
      setSubjects(db.getSubjects());
      setGames(db.getGames());
      setRewards(db.getRewards());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const cleanQ = query.trim().toLowerCase();

  const filteredSubjects = query
    ? subjects.filter(
        (s) =>
          s.title.toLowerCase().includes(cleanQ) ||
          s.description.toLowerCase().includes(cleanQ) ||
          s.category.toLowerCase().includes(cleanQ) ||
          s.chapters.some((c) => c.title.toLowerCase().includes(cleanQ) || c.content.toLowerCase().includes(cleanQ))
      )
    : subjects.slice(0, 3);

  const filteredGames = query
    ? games.filter((g) => g.title.toLowerCase().includes(cleanQ) || g.category.toLowerCase().includes(cleanQ))
    : games.slice(0, 2);

  const filteredRewards = query
    ? rewards.filter((r) => r.title.toLowerCase().includes(cleanQ) || r.category.toLowerCase().includes(cleanQ))
    : rewards.slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-10 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in zoom-in-95 duration-200 mt-6 sm:mt-12">
        {/* Search Bar Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 gap-3">
          <Search className="w-5 h-5 text-sky-500 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari mata pelajaran, materi bab, rumus, game, atau reward..."
            className="w-full text-slate-800 placeholder:text-slate-400 font-semibold text-sm outline-none bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs font-bold text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100"
          >
            ESC
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[65vh] overflow-y-auto p-4 space-y-5 divide-y divide-slate-100">
          {/* Subjects & Lessons */}
          <div>
            <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-sky-500" />
              <span>Mata Pelajaran & Materi ({filteredSubjects.length})</span>
            </div>
            {filteredSubjects.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-2">Tidak ada mata pelajaran yang cocok.</p>
            ) : (
              <div className="space-y-1.5">
                {filteredSubjects.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => {
                      onSelectSubject(s.id);
                      onClose();
                      soundEngine.playConfirm();
                    }}
                    className="p-2.5 rounded-2xl hover:bg-sky-50 border border-transparent hover:border-sky-200 cursor-pointer flex items-center justify-between transition-all group"
                  >
                    <div>
                      <div className="font-bold text-xs text-slate-800 group-hover:text-sky-700 flex items-center gap-2">
                        <span>{s.title}</span>
                        <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 group-hover:bg-sky-100 text-slate-600 group-hover:text-sky-800 rounded font-semibold">
                          {s.educationLevel}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{s.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-sky-600 transition-colors shrink-0 ml-2" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Games */}
          <div className="pt-4">
            <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Gamepad2 className="w-3.5 h-3.5 text-indigo-500" />
              <span>Games & Tantangan Belajar ({filteredGames.length})</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filteredGames.map((g) => (
                <div
                  key={g.id}
                  onClick={() => {
                    onSelectGame(g.id);
                    onClose();
                    soundEngine.playConfirm();
                  }}
                  className="p-2.5 rounded-2xl bg-slate-50 hover:bg-indigo-50 border border-slate-100 hover:border-indigo-200 cursor-pointer flex items-center justify-between transition-all group"
                >
                  <div>
                    <div className="font-bold text-xs text-slate-800 group-hover:text-indigo-700">{g.title}</div>
                    <div className="text-[10px] text-slate-500">+{g.rewardPoints} Poin Reward</div>
                  </div>
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Rewards */}
          <div className="pt-4">
            <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>Reward & Hadiah ({filteredRewards.length})</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filteredRewards.map((r) => (
                <div
                  key={r.id}
                  onClick={() => {
                    onSelectReward();
                    onClose();
                    soundEngine.playConfirm();
                  }}
                  className="p-2.5 rounded-2xl bg-slate-50 hover:bg-amber-50 border border-slate-100 hover:border-amber-200 cursor-pointer flex items-center justify-between transition-all group"
                >
                  <div className="truncate">
                    <div className="font-bold text-xs text-slate-800 group-hover:text-amber-700 truncate">{r.title}</div>
                    <div className="text-[10px] text-slate-500">{r.requiredPoints.toLocaleString()} Poin</div>
                  </div>
                  <span className="text-sm shrink-0">🎁</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="bg-slate-50 px-4 py-2 text-[11px] text-slate-400 text-center border-t border-slate-100">
          Tekan tombol panah atau klik untuk membuka materi pelajaran
        </div>
      </div>
    </div>
  );
};
