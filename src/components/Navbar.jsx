import { NavLink, useNavigate } from 'react-router-dom';
import { Feather, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/write', label: 'Write a Letter' },
  { to: '/timeline', label: 'Timeline' },
  { to: '/gallery', label: 'Gallery' },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-void/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="flex items-center gap-2 font-display text-lg tracking-wide text-parchment">
          <Feather size={18} className="text-gold" strokeWidth={1.5} />
          Echoes of Tomorrow
        </NavLink>

        {user ? (
          <div className="hidden items-center gap-8 text-sm font-medium text-parchment/70 sm:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `transition-colors hover:text-aqua ${isActive ? 'text-aqua' : ''}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-parchment/50 transition-colors hover:text-parchment"
            >
              <LogOut size={14} />
              Log out
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4 text-sm font-medium">
            <NavLink to="/login" className="text-parchment/70 hover:text-aqua">
              Log in
            </NavLink>
            <NavLink
              to="/register"
              className="rounded-full bg-gradient-to-r from-indigo to-aqua px-4 py-2 text-void"
            >
              Sign up
            </NavLink>
          </div>
        )}
      </nav>
    </header>
  );
}
