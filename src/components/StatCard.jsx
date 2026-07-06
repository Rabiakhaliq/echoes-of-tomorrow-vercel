import { motion } from 'framer-motion';

export default function StatCard({ label, value, icon: Icon, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="rounded-2xl border border-white/10 bg-void-light/50 p-6"
    >
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.2em] text-parchment/50">{label}</p>
        {Icon && <Icon size={16} className="text-indigo-soft" strokeWidth={1.5} />}
      </div>
      <p className="mt-2 font-display text-4xl text-parchment">{value}</p>
    </motion.div>
  );
}
