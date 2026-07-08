import { useState } from "react";
import { motion } from "framer-motion";
import {
  Image,
  Mic,
  Video,
  MapPin,
  Music,
  Feather,
  CalendarDays,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { api } from "../api/client";
const deliveryOptions = [
  { label: "1 Month", months: 1 },
  { label: "6 Months", months: 6 },
  { label: "1 Year", months: 12 },
  { label: "5 Years", months: 60 },
  { label: "10 Years", months: 120 },
];
const moodOptions = [
  { emoji: "😊", value: "happy" },
  { emoji: "🌸", value: "hopeful" },
  { emoji: "😌", value: "calm" },
  { emoji: "🤩", value: "excited" },
  { emoji: "💪", value: "proud" },
  { emoji: "😕", value: "confused" },
  { emoji: "😢", value: "sad" },
  { emoji: "😫", value: "stressed" },
];
const attachments = [
  { icon: Image, label: "Photo" },
  { icon: Video, label: "Video" },
  { icon: Mic, label: "Voice" },
  { icon: MapPin, label: "Location" },
  { icon: Music, label: "Music" },
];
export default function WriteLetter() {
  const { token } = useAuth();

  const [text, setText] = useState("");
  const [mood, setMood] = useState("hopeful");
  const [selectedDelivery, setSelectedDelivery] = useState(1);
  const [activeAttachments, setActiveAttachments] = useState([]);
  const [sealed, setSealed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const toggleAttachment = (label) => {
    setActiveAttachments((prev) =>
      prev.includes(label)
        ? prev.filter((a) => a !== label)
        : [...prev, label]
    );
  };
  const handleSeal = async () => {
    if (!text.trim()) return;
    setError("");
    setSubmitting(true);
    const openDate = new Date();
    openDate.setMonth(openDate.getMonth() + selectedDelivery);
    try {
      await api.createLetter(token, {
        title: text.slice(0, 40) || "Untitled letter",
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
      <div className="page-background letter-bg flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card max-w-xl p-12 text-center"
        >
          <motion.div
            initial={{ scale: 0, rotate: -25 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 14,
            }}
            className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-yellow-700 to-yellow-500 shadow-2xl"
          >
            <Feather
              size={46}
              className="text-white"
            />
          </motion.div>
          <h2 className="mt-8 font-display text-5xl text-white">
            Your Time Capsule Is Sealed
          </h2>
          <p className="mt-5 text-lg text-amber-100 leading-8">
            Your memories have been safely locked away.
            <br />
            Time is now protecting them until
            <strong>
              {" "}
              {
                deliveryOptions.find(
                  (d) => d.months === selectedDelivery
                )?.label
              }
            </strong>
            {" "}from today.
          </p>
          <button
            onClick={() => {
              setSealed(false);
              setText("");
            }}
            className="primary-button mt-10"
          >
            Create Another Time Capsule
          </button>
        </motion.div>
      </div>
    );
  }
return (
  <div className="page-background letter-bg page-enter">
    <div className="mx-auto max-w-5xl px-6 py-16">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <p className="text-lg tracking-[0.3em] text-stone-700 uppercase">
          Echoes of Tomorrow
        </p>
        <h1 className="mt-3 font-display text-6xl text-stone-900">
          A Letter to Tomorrow
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-stone-700">
          Capture this exact moment before it becomes a memory.
          Your future self deserves to remember your dreams, your fears, and everything in between.
        </p>
      </motion.div>
      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .5 }}
        className="glass-card p-8"
      >
        {/* Journal */}
        <div>
          <div className="mb-4 flex items-center gap-3">
            <Feather
              className="text-yellow-300"
              size={24}
            />
            <h2 className="font-display text-3xl text-white">
              Write your memory
            </h2>
          </div>
          <textarea
            value={text}
            onChange={(e)=>setText(e.target.value)}
            rows={14}
            placeholder= {`Dear Future Me...
            Today I felt...
            Today I achieved...
            Right now I'm dreaming about...
            I hope when you read this...`}
            className="journal w-full resize-none text-lg leading-9 tracking-wide"
          />
        </div>
        {/* Mood */}
        <div className="mt-10">
          <h3 className="mb-5 font-display text-3xl text-white">
            Today's Emotion
          </h3>
          <div className="flex flex-wrap gap-3">
            {moodOptions.map((item)=>(
              <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
                key={item.value}
                onClick={()=>setMood(item.value)}
                className={`mood-pill ${
                  mood===item.value
                    ? "active"
                    : ""
                }`}
              >
                <span className="mr-2">
                  {item.emoji}
                </span>
                {item.value}
              </motion.button>
            ))}
          </div>
        </div>
        {/* Attachments */}
        <div className="mt-10">
          <h3 className="mb-5 font-display text-3xl text-white">
            Optional Memories
          </h3>
          <div className="flex flex-wrap gap-3">
            {attachments.map(({icon:Icon,label})=>{
              const active=
                activeAttachments.includes(label);
              return(
                <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                  key={label}
                  onClick={()=>
                    toggleAttachment(label)
                  }
                  className={`rounded-xl border px-5 py-3 transition-all flex items-center gap-2 ${
                    active
                      ? "bg-[#D4AF37] text-black border-yellow-300"
                      : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                  }`}
                >
                  <Icon size={18}/>
                  {label}
                </motion.button>
              );
            })}
          </div>
        </div>
              {/* Delivery Time */}
        <div className="mt-12">
          <div className="mb-5 flex items-center gap-3">
            <CalendarDays
              className="text-yellow-300"
              size={24}
            />
            <h3 className="font-display text-3xl text-white">
              Choose When Time Should Reveal It
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {deliveryOptions.map((option) => (
              <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
                key={option.label}
                onClick={() => setSelectedDelivery(option.months)}
                className={`rounded-2xl border p-5 transition-all duration-300 ${
                  selectedDelivery === option.months
                    ? "border-yellow-300 bg-[#D4AF37] text-black shadow-xl scale-105"
                    : "border-white/20 bg-white/10 text-white hover:bg-white/20 hover:-translate-y-1"
                }`}
              >
                <p className="font-display text-xl">
                  {option.label}
                </p>
              </motion.button>
            ))}
          </div>
        </div>
        {/* Error */}
        {error && (
          <div className="mt-8 rounded-xl border border-red-300 bg-red-100/90 p-4">
            <p className="text-red-800">
              {error}
            </p>
          </div>
        )}
        {/* Button */}
        <motion.button
          whileHover={{
          scale:1.05,
          y:-4
          }}
          whileTap={{
            scale: .97,
          }}
          onClick={handleSeal}
          disabled={!text.trim() || submitting}
          className="primary-button mt-12 flex w-full items-center justify-center gap-3 py-5 text-xl disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Feather size={22} />
          {submitting
            ? "Sealing Your Letter..."
            : "Seal Into Time"}
        </motion.button>
      </motion.div>
    </div>
  </div>
);
}