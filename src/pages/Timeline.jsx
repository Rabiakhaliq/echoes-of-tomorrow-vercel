import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';
import ConstellationTimeline from '../components/ConstellationTimeline';
import LoadingScreen from "../components/LoadingScreen";

export default function Timeline() {
  const { token } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!token) return;
    api
      .getTimeline(token)
      .then((data) =>
        setEvents(data.map((e) => ({ id: e._id, title: e.title, description: e.description, date: e.date })))
      )
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title.trim() || !date) return;
    setSubmitting(true);
    try {
      const newEvent = await api.createTimelineEvent(token, { title, description, date });
      setEvents((prev) =>
        [...prev, { id: newEvent._id, title: newEvent.title, description: newEvent.description, date: newEvent.date }].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        )
      );
      setTitle('');
      setDescription('');
      setDate('');
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };
if (loading) {
  return (
    <LoadingScreen
    background="timeline-bg"
      title="Building Your Timeline..."
      subtitle="Every memory has its own place in time."
    />
  );
}
  return (
    <div className="page-background timeline-bg page-enter">
      <div className="mx-auto max-w-3xl px-6 py-14">
      <div className="flex items-start justify-between">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl text-white"
          >
            Your memory timeline
          </motion.h1>
          <p className="mt-3 text-lg text-[#F7E9D0]">
            Every milestone, strung together like stars.
          </p>
        </div>
        <button
          onClick={() => setShowForm((s) => !s)}
          className="flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#7B5A45]/70 px-5 py-2 text-[#F7E9D0] hover:bg-[#8B5E3C]/80 transition-all"
        >
          <Plus size={14} />
          Add
        </button>
      </div>

      {showForm && (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          onSubmit={handleAdd}
          className="mt-6 space-y-4 rounded-3xl border border-[#D4AF37]/30 bg-[#7B5A45]/80 p-6 backdrop-blur-md"
        >
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full rounded-xl border border-[#D4AF37]/30 bg-[#5E4634]/60 px-4 py-3 text-[#F7E9D0] placeholder:text-[#D8C3A5] focus:border-[#D4AF37] focus:outline-none"
          />
          <input
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-lg border border-[#D4AF37]/30 bg-[#5E4634]/60 px-4 py-3 text-[#F7E9D0] placeholder:text-[#D8C3A5] focus:border-[#D4AF37] focus:outline-none"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full rounded-lg border border-[#D4AF37]/30 bg-[#5E4634]/60 px-4 py-3 text-[#F7E9D0] placeholder:text-[#D8C3A5] focus:border-[#D4AF37] focus:outline-none"
          />
          <button
            type="submit"
            disabled={submitting}
            className="rounded-full bg-gradient-to-r from-[#D4AF37] to-[#8B5E3C] px-6 py-3 font-semibold text-white hover:scale-105 transition-all disabled:opacity-50"
          >
            {submitting ? 'Adding...' : 'Add to timeline'}
          </button>
        </motion.form>
      )}

      <div className="mt-12">
    
 {error ? (
  <p className="text-red-400">{error}</p>
) : events.length === 0 ? (
  <p className="text-xl text-[#F7E9D0]">
    No events yet — add your first milestone.
  </p>
) : (
  <ConstellationTimeline events={events} />
)}
      </div>
    </div>
    </div>
  );
}
