import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Landing() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-24 text-center">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-aqua"
      >
        <Sparkles size={12} />
        A letter, sealed in time
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="font-display text-4xl leading-tight text-parchment sm:text-6xl"
      >
        Every memory deserves
        <br />
        <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-soft to-aqua">
          another chance to be remembered.
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25 }}
        className="mx-auto mt-6 max-w-xl text-parchment/60"
      >
        Write to your future self. Seal it with photos, voice, and mood. Let it
        arrive years from now, alongside an AI reflection on how far you've come.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="mt-10 flex justify-center"
      >
        <Link
          to="/write"
          className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo to-aqua px-7 py-3.5 font-medium text-void shadow-lg shadow-indigo/20 transition-transform hover:scale-105"
        >
          Create your first time capsule
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>

      {/* scrolling years — the "traveling through time" moment */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="mt-24 flex items-center justify-center gap-6 overflow-hidden font-display text-2xl text-parchment/20 sm:text-4xl"
      >
        {['2026', '2028', '2030', '2035', '2040'].map((year, i) => (
          <motion.span
            key={year}
            animate={{ opacity: [0.15, 1, 0.15] }}
            transition={{ duration: 4, repeat: Infinity, delay: i * 0.8, ease: 'easeInOut' }}
          >
            {year}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
