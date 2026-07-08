import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Feather,
  LogOut,
  Clock3,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/write", label: "Write Letter" },
  { to: "/timeline", label: "Timeline" },
  { to: "/gallery", label: "Gallery" },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 px-4 py-4">

      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-[#D4AF37]/25 bg-[#6F4E37]/70 px-6 py-4 shadow-2xl backdrop-blur-xl"
      >

        {/* Logo */}

        <NavLink
          to="/"
          className="flex items-center gap-3"
        >

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#8B5E3C] shadow-lg">

            <Clock3
              size={22}
              className="text-[#F7E9D0]"
            />

          </div>

          <div>

            <p className="font-display text-2xl text-white">

              Echoes of Tomorrow

            </p>

            <p className="text-xs tracking-[0.25em] uppercase text-[#E7C88A]">

              Time Capsule

            </p>

          </div>

        </NavLink>

        {/* Desktop Links */}

        {user && (

          <div className="hidden items-center gap-2 lg:flex">

            {links.map((link) => (

              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-xl px-5 py-2 transition-all duration-300 ${
                    isActive
                      ? "bg-[#D4AF37] text-black shadow-lg"
                      : "text-[#F7E9D0] hover:bg-white/10"
                  }`
                }
              >

                {link.label}

              </NavLink>

            ))}

          </div>

        )}

        {/* Right Side */}

        <div className="flex items-center gap-3">

          {user ? (

            <>
              <div className="hidden text-right lg:block">

                <p className="text-sm text-[#E7C88A]">

                  Welcome

                </p>

                <p className="font-semibold text-white">

                  {user.name}

                </p>

              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-xl border border-[#D4AF37]/30 bg-white/10 px-4 py-2 text-[#F7E9D0] transition hover:bg-red-500/20 hover:text-white"
              >

                <LogOut size={17} />

                Logout

              </button>

              <button
                className="lg:hidden"
                onClick={() => setOpen(!open)}
              >

                {open ? (
                  <X className="text-white" />
                ) : (
                  <Menu className="text-white" />
                )}

              </button>
            </>

          ) : (

            <div className="flex items-center gap-3">

              <NavLink
                to="/login"
                className="rounded-xl border border-[#D4AF37]/30 px-5 py-2 text-[#F7E9D0] transition hover:bg-white/10"
              >

                Login

              </NavLink>

              <NavLink
                to="/register"
                className="primary-button"
              >

                Begin Journey

              </NavLink>

            </div>

          )}

        </div>

      </motion.nav>

      {/* Mobile Menu */}

      {user && open && (

        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-3 flex max-w-7xl flex-col gap-2 rounded-2xl border border-[#D4AF37]/25 bg-[#6F4E37]/90 p-4 backdrop-blur-xl lg:hidden"
        >

          {links.map((link) => (

            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `rounded-xl px-4 py-3 ${
                  isActive
                    ? "bg-[#D4AF37] text-black"
                    : "text-[#F7E9D0]"
                }`
              }
            >

              {link.label}

            </NavLink>

          ))}

        </motion.div>

      )}

    </header>
  );
}