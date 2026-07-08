import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Feather, Mail, Lock, User, Clock3 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSubmitting(true);

    try {
      await register(name, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-background register-bg page-enter">

      <div className="flex min-h-screen items-center justify-center px-6 py-16">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-card w-full max-w-md rounded-[28px] p-10"
        >

          {/* Logo */}

          <div className="text-center">

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{
                repeat: Infinity,
                duration: 3,
              }}
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#8B5E3C] shadow-xl"
            >

              <Clock3
                size={28}
                className="text-[#F7E9D0]"
              />

            </motion.div>

            <p className="mt-5 uppercase tracking-[0.35em] text-xs text-[#E7C88A]">

              Echoes of Tomorrow

            </p>

            <h1 className="mt-3 font-display text-5xl text-white">

              Begin Your Journey

            </h1>

            <p className="mt-4 leading-7 text-[#F7E9D0]">

              Write today's thoughts and let time
              preserve them for the future.

            </p>

          </div>

          {/* Form */}

          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-6"
          >

            <div>

              <label className="mb-2 flex items-center gap-2 text-sm text-[#F7E9D0]">

                <User size={16} />

                Full Name

              </label>

              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-[#C9A46B]/30 bg-white/10 px-4 py-3 text-white placeholder:text-[#E7C88A]/70 backdrop-blur-md focus:border-[#D4AF37]"
              />

            </div>

            <div>

              <label className="mb-2 flex items-center gap-2 text-sm text-[#F7E9D0]">

                <Mail size={16} />

                Email Address

              </label>

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-xl border border-[#C9A46B]/30 bg-white/10 px-4 py-3 text-white placeholder:text-[#E7C88A]/70 backdrop-blur-md focus:border-[#D4AF37]"
              />

            </div>

            <div>

              <label className="mb-2 flex items-center gap-2 text-sm text-[#F7E9D0]">

                <Lock size={16} />

                Password

              </label>

              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full rounded-xl border border-[#C9A46B]/30 bg-white/10 px-4 py-3 text-white placeholder:text-[#E7C88A]/70 backdrop-blur-md focus:border-[#D4AF37]"
              />

            </div>

            {error && (

              <div className="rounded-xl border border-red-400/30 bg-red-500/20 p-4">

                <p className="text-red-200">

                  {error}

                </p>

              </div>

            )}

            <motion.button
              whileHover={{
                scale: 1.02,
                y: -2,
              }}
              whileTap={{
                scale: 0.98,
              }}
              disabled={submitting}
              type="submit"
              className="primary-button flex w-full items-center justify-center gap-3 py-4 text-lg disabled:opacity-50"
            >

              <Feather size={20} />

              {submitting
                ? "Creating Your Time Capsule..."
                : "Create Your Time Capsule"}

            </motion.button>

          </form>

          {/* Footer */}

          <div className="mt-8 text-center">

            <p className="text-[#F7E9D0]">

              Already have an account?

            </p>

            <Link
              to="/login"
              className="mt-2 inline-block text-[#E7C88A] underline underline-offset-4 transition hover:text-white"
            >

              Enter Your Archive

            </Link>

          </div>

        </motion.div>

      </div>

    </div>
  );
}