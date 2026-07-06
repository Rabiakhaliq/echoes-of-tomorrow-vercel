import { motion } from 'framer-motion';

export default function CountdownCard({ letter }) {
  if (!letter) {
    return (
      <div className="rounded-2xl border border-white/10 bg-void-light/50 p-6">
        <p className="font-display text-parchment/60">No letters waiting. Write your first one.</p>
      </div>
    );
  }

  const daysLeft = Math.max(
    0,
    Math.ceil((new Date(letter.openDate) - new Date('2026-07-05')) / (1000 * 60 * 60 * 24))
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-indigo/20 to-void-light p-6"
    >
      <p className="text-xs uppercase tracking-[0.2em] text-aqua/80">Next letter opens in</p>
      <p className="mt-2 font-display text-5xl text-parchment">{daysLeft}</p>
      <p className="mt-1 text-sm text-parchment/60">days · "{letter.title}"</p>
      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, 100 - daysLeft / 3)}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-to-r from-indigo to-aqua"
        />
      </div>
    </motion.div>
  );
}
