import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Lock, Unlock, ScrollText } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { api } from "../api/client";

export default function Gallery() {
  const { token } = useAuth();

  const [letters, setLetters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
  if (!token) return;

  api.getLetters(token)
    .then((data) => setLetters(data))
    .catch(console.error)
    .finally(() => setLoading(false));
  }, [token]);

  if (loading) {
  return (
    <div className="page-background gallery-bg flex items-center justify-center">
      <p className="text-2xl text-white">Loading Memories...</p>
    </div>
  );
  }
  return (
    <div className="page-background gallery-bg page-enter">

      <div className="mx-auto max-w-7xl px-6 py-16">

        {/* Header */}

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-14 text-center"
        >

          <p className="uppercase tracking-[0.35em] text-[#E7C88A]">

            Echoes of Tomorrow

          </p>

          <h1 className="mt-3 font-display text-6xl text-white">

            Memory Archive

          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-xl leading-8 text-[#F7E9D0]">

            Every sealed letter tells the story of who you once were, waiting patiently for the right moment to be remembered.

          </p>

        </motion.div>

        {/* Cards */}

        {letters.length === 0 ? (

          <div className="glass-card p-16 text-center">

            <ScrollText
              size={70}
              className="mx-auto text-[#E7C88A]"
            />

            <h2 className="mt-6 font-display text-4xl text-white">

              No Memories Yet

            </h2>

            <p className="mt-4 text-[#F7E9D0]">

              Write your first letter and begin preserving moments that time can never erase.

            </p>

          </div>

        ) : (

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

            {letters.map((letter, index) => (

              <motion.button

                key={letter._id}

                initial={{ opacity: 0, y: 20 }}

                animate={{ opacity: 1, y: 0 }}

                transition={{ delay: index * .08 }}

                whileHover={{
                y: -10,
                scale: 1.03,
                }}

                onClick={() => setSelected(letter)}

                className="rounded-[28px] border border-[#D4AF37]/25 bg-[#7B5A45]/85 p-8 text-left shadow-2xl backdrop-blur-md"

              >

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-xs uppercase tracking-[0.3em] text-[#E7C88A]">

                      Memory

                    </p>

                  </div>

                  {letter.locked ? (

                    <Lock className="text-[#E7C88A]" />

                  ) : (

                    <Unlock className="text-green-300" />

                  )}

                </div>

                <h2 className="mt-6 font-display text-4xl text-white">

                  {letter.title}

                </h2>

                <p className="mt-5 line-clamp-4 leading-8 text-[#F7E9D0]">

                  {letter.locked
                    ? "Time has not yet unlocked this memory.."
                    : letter.body}

                </p>

                <div className="mt-8 flex items-center gap-3 border-t border-[#C9A46B]/30 pt-5">

                  <CalendarDays
                    size={18}
                    className="text-[#E7C88A]"
                  />

                  <div>
                  <p className="text-xs uppercase tracking-widest text-[#E7C88A]">
                  Opens On
                  </p>

                  <span className="text-[#F7E9D0]">
                  {new Date(letter.openDate).toLocaleDateString()}
                  </span>
                  </div>

                </div>

              </motion.button>

            ))}

          </div>

        )}

      </div>

      {/* Modal */}

      <AnimatePresence>

        {selected && (

          <motion.div

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            exit={{ opacity: 0 }}

            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6"

            onClick={() => setSelected(null)}

          >

            <motion.div

              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}

              onClick={(e) => e.stopPropagation()}

              className="glass-card max-w-2xl rounded-[30px] p-10"

            >

              <h2 className="font-display text-5xl text-white">

                {selected.title}

              </h2>

              <p className="mt-8 whitespace-pre-wrap leading-9 text-[#F7E9D0]">

                {selected.locked
                  ? "This letter remains sealed until its chosen moment in time."
                  : selected.body}

              </p>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
}