import { useState } from 'react';
import { motion } from 'framer-motion';
import { Image, Mic, Video, MapPin, Music } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';

const deliveryOptions = [
  { label: '1 Month', months: 1 },
  { label: '6 Months', months: 6 },
  { label: '1 Year', months: 12 },
  { label: '5 Years', months: 60 },
  { label: '10 Years', months: 120 },
];

const moodOptions = ['hopeful', 'excited', 'happy', 'calm', 'proud', 'confused', 'sad', 'stressed'];

// Attachments are UI-only for now — actual file upload (Cloudinary) is a later phase.
// Toggling them here doesn't yet attach real files to the letter.
const attachments = [
  { icon: Image, label: 'Photo' },
  { icon: Video, label: 'Video' },
  { icon: Mic, label: 'Voice' },
  { icon: MapPin, label: 'Location' },
  { icon: Music, label: 'Music' },
];

export default function WriteLetter() {
  const { token } = useAuth();
  const [text, setText] = useState('');
  const [mood, setMood] = useState('hopeful');
  const [selectedDelivery, setSelectedDelivery] = useState(1);
  const [activeAttachments, setActiveAttachments] = useState([]);
  const [sealed, setSealed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const toggleAttachment = (label) => {
    setActiveAttachments((prev) =>
      prev.includes(label) ? prev.filter((a) => a !== label) : [...prev, label]
    );
  };

  const handleSeal = async () => {
    if (!text.trim()) return;
    setError('');
    setSubmitting(true);

    const openDate = new Date();
    openDate.setMonth(openDate.getMonth() + selectedDelivery);

    try {
      await api.createLetter(token, {
        title: text.slice(0, 40) || 'Untitled letter',
        body: text,
        mood,
        openDate: openDate.toISOString(),
      });
      setSealed(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (sealed) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center px-6 py-32 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 14 }}
          className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-gold to-yellow-700 shadow-lg shadow-gold/30"
        >
          <span className="font-display text-3xl text-void">RA</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 font-display text-2xl text-parchment"
        >
          Sealed and sent forward
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-2 text-sm text-parchment/60"
        >
          Your letter will open in{' '}
          {deliveryOptions.find((d) => d.months === selectedDelivery)?.label.toLowerCase()}. It's
          saved and waiting.
        </motion.p>
        <button
          onClick={() => {
            setSealed(false);
            setText('');
          }}
          className="mt-8 text-sm text-aqua underline underline-offset-4"
        >
          Write another letter
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-14">
      <h1 className="font-display text-3xl text-parchment">Dear Future Me,</h1>
      <p className="mt-2 text-sm text-parchment/50">
        Write freely. This won't be read again until the date you choose.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 rounded-2xl border border-white/10 bg-void-light/50 p-1"
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Today I finally started learning web development. Hopefully I become a software engineer..."
          rows={10}
          className="w-full resize-none rounded-xl bg-transparent p-5 font-display text-lg leading-relaxed text-parchment placeholder:text-parchment/25 focus:outline-none"
        />
      </motion.div>

      {/* Mood */}
      <div className="mt-5">
        <p className="text-xs uppercase tracking-[0.2em] text-parchment/50">How are you feeling?</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {moodOptions.map((m) => (
            <button
              key={m}
              onClick={() => setMood(m)}
              className={`rounded-full border px-3 py-1.5 text-xs capitalize transition-colors ${
                mood === m
                  ? 'border-aqua/50 bg-aqua/15 text-aqua'
                  : 'border-white/10 text-parchment/50 hover:border-white/25'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Attachments (UI only for now) */}
      <div className="mt-5 flex flex-wrap gap-2">
        {attachments.map(({ icon: Icon, label }) => {
          const active = activeAttachments.includes(label);
          return (
            <button
              key={label}
              onClick={() => toggleAttachment(label)}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors ${
                active
                  ? 'border-aqua/50 bg-aqua/15 text-aqua'
                  : 'border-white/10 text-parchment/50 hover:border-white/25'
              }`}
            >
              <Icon size={13} strokeWidth={1.5} />
              {label}
            </button>
          );
        })}
      </div>

      {/* Delivery date */}
      <div className="mt-8">
        <p className="text-xs uppercase tracking-[0.2em] text-parchment/50">Open after</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {deliveryOptions.map((opt) => (
            <button
              key={opt.label}
              onClick={() => setSelectedDelivery(opt.months)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                selectedDelivery === opt.months
                  ? 'border-indigo bg-indigo/30 text-parchment'
                  : 'border-white/10 text-parchment/50 hover:border-white/25'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={handleSeal}
        disabled={!text.trim() || submitting}
        className="mt-10 w-full rounded-full bg-gradient-to-r from-indigo to-aqua py-3.5 font-medium text-void shadow-lg shadow-indigo/20 transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
      >
        {submitting ? 'Sealing...' : 'Seal this letter'}
      </motion.button>
    </div>
  );
}
