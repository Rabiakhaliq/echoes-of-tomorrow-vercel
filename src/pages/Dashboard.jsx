import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Target, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';
import CountdownCard from '../components/CountdownCard';
import StatCard from '../components/StatCard';

const moodEmojiScale = { 1: '😢', 2: '😟', 3: '😐', 4: '😊', 5: '😁' };

function MoodTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { label, mood } = payload[0].payload;
  return (
    <div className="rounded-lg border border-white/10 bg-void-light px-3 py-1.5 text-xs">
      <span className="mr-1">{moodEmojiScale[mood]}</span>
      {label || `Mood: ${mood}`}
    </div>
  );
}

export default function Dashboard() {
  const { user, token } = useAuth();
  const [letters, setLetters] = useState([]);
  const [goals, setGoals] = useState([]);
  const [moodHistory, setMoodHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) return;
    Promise.all([api.getLetters(token), api.getGoals(token), api.getMoodHistory(token)])
      .then(([lettersData, goalsData, moodData]) => {
        setLetters(lettersData);
        setGoals(goalsData);
        setMoodHistory(
          moodData.map((m) => ({
            month: new Date(m.createdAt).toLocaleDateString('en-US', { month: 'short' }),
            mood: m.mood,
            label: m.label,
          }))
        );
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) {
    return <p className="px-6 py-24 text-center text-parchment/40">Loading your dashboard...</p>;
  }

  if (error) {
    return <p className="px-6 py-24 text-center text-red-400">{error}</p>;
  }

  const sealedCount = letters.filter((l) => l.status === 'sealed').length;
  const nextLetter = letters
    .filter((l) => l.status === 'sealed')
    .sort((a, b) => new Date(a.openDate) - new Date(b.openDate))[0];

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-3xl text-parchment"
      >
        Welcome back, {user?.name}
      </motion.h1>
      <p className="mt-1 text-sm text-parchment/50">
        {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        <StatCard label="Letters waiting" value={sealedCount} icon={Mail} delay={0.05} />
        <CountdownCard letter={nextLetter} />
        <StatCard label="Goals in progress" value={goals.length} icon={Target} delay={0.15} />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-5">
        <div className="rounded-2xl border border-white/10 bg-void-light/50 p-6 lg:col-span-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg text-parchment">Your mood this year</h2>
            {moodHistory.length > 0 && (
              <span className="text-2xl">{moodEmojiScale[moodHistory.at(-1).mood]}</span>
            )}
          </div>
          <div className="mt-4 h-40">
            {moodHistory.length === 0 ? (
              <p className="flex h-full items-center justify-center text-sm text-parchment/40">
                No mood entries yet — log one when you write a letter.
              </p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={moodHistory}>
                  <XAxis
                    dataKey="month"
                    stroke="#F3EFE6"
                    strokeOpacity={0.3}
                    tick={{ fill: '#F3EFE6', opacity: 0.5, fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<MoodTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="mood"
                    stroke="#64DFDF"
                    strokeWidth={2}
                    dot={{ fill: '#5E60CE', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-void-light/50 p-6 lg:col-span-2">
          <h2 className="font-display text-lg text-parchment">Goals</h2>
          {goals.length === 0 ? (
            <p className="mt-4 text-sm text-parchment/40">No goals yet.</p>
          ) : (
            <div className="mt-4 space-y-4">
              {goals.map((g) => (
                <div key={g._id}>
                  <div className="flex justify-between text-sm">
                    <span className="text-parchment/80">{g.text}</span>
                    <span className="text-parchment/40">{g.progress}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo to-aqua"
                      style={{ width: `${g.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-void-light/50 p-6">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-gold" />
          <h2 className="font-display text-lg text-parchment">Your letters</h2>
        </div>
        {letters.length === 0 ? (
          <p className="mt-4 text-sm text-parchment/40">
            No letters yet. Head to "Write a Letter" to seal your first one.
          </p>
        ) : (
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {letters.map((l) => (
              <div key={l._id} className="rounded-xl border border-white/10 bg-void/60 p-4">
                <div className="flex items-center justify-between">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide ${
                      l.status === 'sealed' ? 'bg-indigo/30 text-indigo-soft' : 'bg-gold/20 text-gold'
                    }`}
                  >
                    {l.status}
                  </span>
                </div>
                <h3 className="mt-2 font-display text-parchment">{l.title}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-parchment/50">
                  {l.locked ? 'This letter is sealed until its open date.' : l.body}
                </p>
                <p className="mt-3 text-[11px] text-parchment/40">
                  Opens {new Date(l.openDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
