import { motion } from 'framer-motion';

export default function ConstellationTimeline({ events }) {
  return (
    <div className="relative pl-8">
      {/* the connecting thread */}
      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-aqua via-indigo to-transparent" />

      <div className="space-y-10">
        {events.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="relative"
          >
            {/* star node */}
            <span className="absolute -left-8 top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-void ring-2 ring-aqua">
              <span className="h-1.5 w-1.5 rounded-full bg-aqua" />
            </span>

            <p className="text-xs uppercase tracking-[0.15em] text-gold/80">
              {new Date(event.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </p>
            <h3 className="mt-1 font-display text-xl text-parchment">{event.title}</h3>
            <p className="mt-1 max-w-lg text-sm text-parchment/60">{event.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
