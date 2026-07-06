import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-sm flex-col px-6 py-24">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl text-parchment">Create your capsule</h1>
        <p className="mt-2 text-sm text-parchment/50">Start writing to your future self.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="text-xs uppercase tracking-wide text-parchment/50">Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-white/10 bg-void-light/50 px-4 py-2.5 text-parchment focus:border-aqua/50 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wide text-parchment/50">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-white/10 bg-void-light/50 px-4 py-2.5 text-parchment focus:border-aqua/50 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wide text-parchment/50">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-white/10 bg-void-light/50 px-4 py-2.5 text-parchment focus:border-aqua/50 focus:outline-none"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-gradient-to-r from-indigo to-aqua py-3 font-medium text-void disabled:opacity-50"
          >
            {submitting ? 'Creating account...' : 'Sign up'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-parchment/50">
          Already have an account?{' '}
          <Link to="/login" className="text-aqua underline underline-offset-4">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
