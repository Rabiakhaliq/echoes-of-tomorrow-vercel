import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';
import ConstellationTimeline from '../components/ConstellationTimeline';

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

  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <div className="flex items-start justify-between">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl text-parchment"
          >
            Your memory timeline
          </motion.h1>
          <p className="mt-2 text-sm text-parchment/50">
            Every milestone, strung together like stars.
          </p>
        </div>
        <button
          onClick={() => setShowForm((s) => !s)}
          className="flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-2 text-sm text-parchment/70 hover:border-white/25"
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
          className="mt-6 space-y-3 rounded-2xl border border-white/10 bg-void-light/50 p-5"
        >
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full rounded-lg border border-white/10 bg-void/60 px-3 py-2 text-sm text-parchment focus:border-aqua/50 focus:outline-none"
          />
          <input
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-void/60 px-3 py-2 text-sm text-parchment focus:border-aqua/50 focus:outline-none"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full rounded-lg border border-white/10 bg-void/60 px-3 py-2 text-sm text-parchment focus:border-aqua/50 focus:outline-none"
          />
          <button
            type="submit"
            disabled={submitting}
            className="rounded-full bg-gradient-to-r from-indigo to-aqua px-5 py-2 text-sm font-medium text-void disabled:opacity-50"
          >
            {submitting ? 'Adding...' : 'Add to timeline'}
          </button>
        </motion.form>
      )}

      <div className="mt-12">
        {loading ? (
          <p className="text-parchment/40">Loading...</p>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : events.length === 0 ? (
          <p className="text-parchment/40">No events yet — add your first milestone.</p>
        ) : (
          <ConstellationTimeline events={events} />
        )}
      </div>
    </div>
  );
}
