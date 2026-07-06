import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { galleryMemories, moodEmojiScale } from '../data/mockData';

// NOTE: still using mock data here — the backend doesn't have a dedicated
// media/gallery collection yet (media currently lives embedded inside Letter
// documents). Once Cloudinary upload is added, swap this for a real fetch,
// most likely pulling from GET /api/letters and flattening the media arrays.

export default function Gallery() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <h1 className="font-display text-3xl text-parchment">Memory gallery</h1>
      <p className="mt-2 text-sm text-parchment/50">Click a memory to revisit it.</p>

      <div className="mt-10 columns-2 gap-4 sm:columns-3 [&>*]:mb-4">
        {galleryMemories.map((m, i) => (
          <motion.button
            key={m.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            onClick={() => setSelected(m)}
            className={`block w-full break-inside-avoid rounded-2xl bg-gradient-to-br p-6 text-left ${
              i % 3 === 0 ? 'h-56' : i % 3 === 1 ? 'h-40' : 'h-64'
            } from-indigo/40 to-void-light border border-white/10 transition-transform hover:scale-[1.02]`}
          >
            <span className="text-2xl">{moodEmojiScale[4]}</span>
            <p className="mt-auto pt-8 font-display text-parchment">{m.caption}</p>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-void/80 backdrop-blur-sm px-6"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl border border-white/10 bg-void-light p-6"
            >
              <div className="flex items-start justify-between">
                <h2 className="font-display text-xl text-parchment">{selected.caption}</h2>
                <button onClick={() => setSelected(null)} className="text-parchment/50">
                  <X size={18} />
                </button>
              </div>
              <p className="mt-2 text-xs text-parchment/40">
                {new Date(selected.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
              <p className="mt-4 text-sm text-parchment/70">
                Mood: {selected.mood} {moodEmojiScale[4]}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
