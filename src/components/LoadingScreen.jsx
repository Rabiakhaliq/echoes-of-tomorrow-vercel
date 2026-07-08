import { motion } from "framer-motion";
import { Clock3 } from "lucide-react";

export default function LoadingScreen({
  title = "Preparing Your Time Capsule...",
  subtitle = "The future is quietly preserving your memories.",
  background = "login-bg",
}) {
  return (
    <div className={`page-background ${background} flex min-h-screen items-center justify-center px-6`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-card w-full max-w-lg p-12 text-center"
      >
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 10,
            ease: "linear",
            repeat: Infinity,
          }}
          className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-[#8B5E3C]"
        >
          <Clock3
            size={42}
            className="text-[#F7E9D0]"
          />
        </motion.div>

        <p className="uppercase tracking-[0.35em] text-sm text-[#E7C88A]">
          Echoes of Tomorrow
        </p>

        <h2 className="mt-5 font-display text-5xl text-white">
          {title}
        </h2>

        <p className="mt-6 text-lg leading-8 text-[#F7E9D0]">
          {subtitle}
        </p>

        <div className="mt-10 flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -10, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                repeat: Infinity,
                duration: 1,
                delay: i * 0.2,
              }}
              className="h-3 w-3 rounded-full bg-[#D4AF37]"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}