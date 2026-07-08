import LoadingScreen from "../components/LoadingScreen";
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
    return (
        <LoadingScreen
            title="Loading Your Dashboard..."
            subtitle="Collecting your letters and memories."
        />
    );
}

  if (error) {
    return <p className="px-6 py-24 text-center text-red-400">{error}</p>;
  }

  const sealedCount = letters.filter((l) => l.status === 'sealed').length;
  const nextLetter = letters
    .filter((l) => l.status === 'sealed')
    .sort((a, b) => new Date(a.openDate) - new Date(b.openDate))[0];

  return (
    <div className="page-background dashboard-bg page-enter">
      <div className="mx-auto max-w-7xl px-6 py-16">

  <motion.div
    initial={{ opacity: 0, y: -25 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="mb-12 rounded-3xl bg-[#7B5A45]/75 p-10 backdrop-blur-md border border-[#C9A46B]/30 shadow-2xl"
  >

    <p className="uppercase tracking-[0.35em] text-[#F5DEB3] text-sm">

      Echoes of Tomorrow

    </p>

    <h1 className="mt-3 font-display text-5xl md:text-6xl text-white">
      Welcome Back,
    <span className="text-[#E7C88A]">
    {" "}
    {user?.name}
    </span>
    </h1>

<div className="mt-6 h-[2px] w-28 rounded-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>


 <p className="mt-5 max-w-3xl text-lg leading-8 text-[#F6E7D0]">

  Write today for the person you'll become tomorrow.

  <br />

  Seal your memories, your dreams, and your emotions inside a timeless archive that only time can unlock.

</p>

    <div className="mt-8 inline-flex rounded-full bg-[#5E4634]/60 px-5 py-3 text-[#F5E6D0]">

      {new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })}

    </div>

  </motion.div>

      <motion.div

initial={{opacity:0,y:20}}

animate={{opacity:1,y:0}}

transition={{delay:.2}}

className="grid gap-6 lg:grid-cols-3"

>

<div className="glass-card p-6">

<h2 className="font-display text-2xl text-white">

📜 Letters Waiting

</h2>

<div className="mt-5">

<StatCard

label="Sealed Letters"

value={sealedCount}

icon={Mail}

delay={0.05}

/>

</div>

</div>



<div className="glass-card p-6">

<h2 className="font-display text-2xl text-white">

⏳ Next Memory

</h2>

<div className="mt-5">

<CountdownCard

letter={nextLetter}

/>

</div>

</div>



<div className="glass-card p-6">

<h2 className="font-display text-2xl text-white">

🎯 Your Goals

</h2>

<div className="mt-5">

<StatCard

label="Goals"

value={goals.length}

icon={Target}

delay={0.15}

/>

</div>

</div>

</motion.div>

      <div className="mt-10 grid gap-8 lg:grid-cols-5">

  {/* ================= Mood Journey ================= */}

  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: .3 }}
    className="glass-card lg:col-span-3 p-8"
  >

    <div className="flex items-center justify-between">

      <div>

        <p className="uppercase tracking-[0.25em] text-sm text-[#E7C88A]">

          Emotional Journey

        </p>

        <h2 className="mt-2 font-display text-4xl text-white">

          Mood Timeline

        </h2>

      </div>

      {moodHistory.length > 0 && (

        <div className="text-5xl">

          {moodEmojiScale[moodHistory.at(-1).mood]}

        </div>

      )}

    </div>

    <div className="mt-8 h-64">

      {moodHistory.length === 0 ? (

        <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-[#C9A46B]/40">

          <p className="text-lg text-[#F7E9D0]">

            No emotions have been recorded yet.
            <br />
            Your mood timeline will slowly come alive as you continue writing letters.

          </p>

        </div>

      ) : (

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={moodHistory}>

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#F7E9D0",
                fontSize: 13,
              }}
            />

            <Tooltip content={<MoodTooltip />} />

            <Line
              type="monotone"
              dataKey="mood"
              stroke="#E7C88A"
              strokeWidth={4}
              dot={{
                fill: "#D4AF37",
                r: 6,
              }}
              activeDot={{
                r: 8,
                fill: "#FFF5D6",
              }}
            />

          </LineChart>

        </ResponsiveContainer>

      )}

    </div>

  </motion.div>

  {/* ================= Goals ================= */}

  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: .45 }}
    className="glass-card lg:col-span-2 p-8"
  >

    <p className="uppercase tracking-[0.25em] text-sm text-[#E7C88A]">

      Dreams

    </p>

    <h2 className="mt-2 font-display text-4xl text-white">

      Goals

    </h2>

    {goals.length === 0 ? (

      <div className="mt-8 rounded-2xl border border-dashed border-[#C9A46B]/40 p-8 text-center">

        <p className="text-[#F7E9D0]">

          🌱

        </p>

        <p className="mt-3 text-lg leading-8 text-[#F7E9D0]">
        Dreams become reality only when they are written down.
        <br />
        Create your first goal to begin tracking your future.
        </p>

      </div>

    ) : (

      <div className="mt-8 space-y-6">

        {goals.map((goal) => (

          <div key={goal._id}>

            <div className="flex justify-between">

              <span className="font-medium text-white">

                {goal.text}

              </span>

              <span className="text-[#E7C88A]">

                {goal.progress}%

              </span>

            </div>

            <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">

              <motion.div

                initial={{ width: 0 }}

                animate={{
                  width: `${goal.progress}%`,
                }}

                transition={{
                  duration: 1,
                }}

                className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#8B5E3C]"

              />

            </div>

          </div>

        ))}

      </div>

    )}

  </motion.div>

</div>

      <motion.div
  initial={{ opacity: 0, y: 25 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.55 }}
  className="glass-card mt-10 p-8"
>

  <div className="flex items-center justify-between">

    <div>

      <p className="uppercase tracking-[0.25em] text-sm text-[#E7C88A]">

        Time Capsule Collection

      </p>

      <h2 className="mt-2 font-display text-4xl text-white">

        Your Letters

      </h2>

    </div>

    <Calendar
      size={34}
      className="text-[#E7C88A]"
    />

  </div>

  {letters.length === 0 ? (

    <div className="mt-10 rounded-2xl border border-dashed border-[#C9A46B]/40 p-12 text-center">

      <div className="text-6xl">

        📜

      </div>

      <h3 className="mt-5 font-display text-3xl text-white">

        Your journey through time begins with a single letter.

      </h3>

      <p className="mt-3 text-lg text-[#F7E9D0]">

        Write your first memory and let tomorrow preserve it forever.

      </p>

    </div>

  ) : (

    <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

      {letters.map((letter, index) => (

        <motion.div

          key={letter._id}

          initial={{ opacity: 0, y: 20 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ delay: index * 0.08 }}

          whileHover={{
          y: -10,
          scale: 1.03,
          }}

          className="glass-card p-6"

        >

          <div className="flex items-center justify-between">

            <span

              className={`rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider ${
                letter.status === "sealed"
                  ? "bg-[#D4AF37] text-black"
                  : "bg-green-700 text-white"
              }`}

            >

              {letter.status === "sealed"
                ? "🔒 Sealed"
                : "📖 Open"}

            </span>

          </div>

          <h3 className="mt-6 font-display text-3xl text-white">

            {letter.title}

          </h3>

          <p className="mt-4 min-h-[70px] leading-7 text-[#F7E9D0]">

            {letter.locked
              ? "This memory is safely sealed and cannot be opened until its chosen date."
              : letter.body}

          </p>

          <div className="mt-8 border-t border-[#C9A46B]/20 pt-5">

            <p className="text-sm text-[#E7C88A]">

              Opens on

            </p>

            <p className="mt-1 text-white">

              {new Date(letter.openDate).toLocaleDateString(
                "en-US",
                {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                }
              )}

            </p>

          </div>

        </motion.div>

      ))}

    </div>

  )}

</motion.div>

</div>
    </div>
  );
}
