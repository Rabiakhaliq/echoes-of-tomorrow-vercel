import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock3, Feather, Sparkles } from "lucide-react";

export default function Landing() {
  return (
    <div className="page-background landing-bg">

      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-16">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="glass-card max-w-4xl rounded-[32px] p-12 text-center"
        >

          {/* Small Heading */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .2 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#5E4634]/50 px-5 py-2"
          >

            <Clock3
              size={18}
              className="text-[#E7C88A]"
            />

            <p className="uppercase tracking-[0.35em] text-xs text-[#F7E9D0]">

              Echoes of Tomorrow

            </p>

          </motion.div>

          {/* Title */}

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .35 }}
            className="mt-8 font-display text-6xl leading-tight text-white md:text-7xl"
          >

            Write to the

            <span className="block text-[#E7C88A]">

              Future You

            </span>

          </motion.h1>

          {/* Subtitle */}

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .5 }}
            className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-[#F7E9D0]"
          >

            Capture today's thoughts,

            dreams and emotions in beautifully sealed letters.

            Time will protect your memories until the day

            you choose to read them again.

          </motion.p>

          {/* Quote */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .75 }}
            className="mx-auto mt-12 max-w-2xl rounded-2xl border border-[#C9A46B]/30 bg-[#7B5A45]/40 p-6"
          >

            <Sparkles
              className="mx-auto mb-4 text-[#E7C88A]"
              size={26}
            />

            <p className="italic text-[#F8EEDB] leading-8">

              "The letters you write today become
              the memories that guide tomorrow."

            </p>

          </motion.div>

          {/* Buttons */}

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .9 }}
            className="mt-14 flex flex-col items-center justify-center gap-5 sm:flex-row"
          >

            <Link
              to="/register"
              className="primary-button flex items-center gap-3"
            >

              <Feather size={18} />

              Begin Your Journey

            </Link>

            <Link
              to="/login"
              className="rounded-xl border border-[#C9A46B]/40 bg-white/10 px-8 py-4 font-medium text-white backdrop-blur-md transition hover:bg-white/20"
            >

              Log In

            </Link>

          </motion.div>

          {/* Bottom Text */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-16"
          >

            <p className="text-sm tracking-widest text-[#E7C88A]">

              Preserve • Reflect • Grow

            </p>

          </motion.div>

        </motion.div>

      </div>

    </div>
  );
}