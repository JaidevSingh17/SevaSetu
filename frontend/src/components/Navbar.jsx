import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import {
  ChevronDown,
  HeartHandshake,
  Home,
  LayoutDashboard,
  ClipboardList,
  ChartNoAxesCombined,
  BookOpenText,
  Info,
  UserRound,
  LogIn,
  UserPlus,
} from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, protected: true },
    { label: 'Requirements', href: '/requirements', icon: ClipboardList, donorOnly: true },
    { label: 'Impact', href: '/impact', icon: ChartNoAxesCombined },
    { label: 'Resources', href: '/resources', icon: BookOpenText },
    { label: 'About Us', href: '/about', icon: Info },
  ];

  const isActive = (href) => {
    if (href.startsWith('/#')) return false;
    return location.pathname === href;
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-3 z-50 px-3 sm:px-4">
      <nav className="mx-auto max-w-7xl rounded-[1.5rem] border border-white/10 bg-[#09101d]/85 px-4 py-3 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-transform duration-300 ease-out hover:scale-[1.01] sm:px-5">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex shrink-0 items-center gap-2.5 rounded-2xl px-2 py-1.5 text-lg font-semibold text-text transition-transform duration-300 ease-out hover:scale-[1.04] sm:text-xl">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-500/15 text-teal-300 shadow-[0_0_20px_rgba(20,184,166,0.16)]">
              <HeartHandshake size={18} />
            </span>
            <span>SevaSetu</span>
          </Link>

          <div className="hidden flex-1 items-center justify-center lg:flex">
            <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1.5">
              {navItems.map((item) => {
                if (item.protected && !user) return null;
                if (item.donorOnly && user?.role !== 'donor') return null;

                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`group inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ease-out hover:scale-[1.06] ${active ? 'bg-teal-500/15 text-teal-300 shadow-sm' : 'text-textMuted hover:bg-white/5 hover:text-text'}`}
                  >
                    <Icon size={15} className={active ? 'text-teal-300' : 'text-textMuted group-hover:text-text'} />
                    <span>{item.label}</span>
                    {(item.label === 'Impact' || item.label === 'Resources') && <ChevronDown size={13} className="opacity-60" />}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-textMuted transition-all duration-300 ease-out hover:scale-[1.05] hover:text-text sm:inline-flex"
                >
                  <LayoutDashboard size={14} />
                  Dashboard
                </Link>
                {user.role === 'donor' && (
                  <Link
                    to="/requirements"
                    className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-textMuted transition-all duration-300 ease-out hover:scale-[1.05] hover:text-text sm:inline-flex"
                  >
                    <ClipboardList size={14} />
                    Requirements
                  </Link>
                )}
                <div className="hidden items-center gap-3 border-l border-white/10 pl-3 sm:flex sm:pl-4">
                  <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500/15 text-teal-300">
                      <UserRound size={15} />
                    </span>
                    <div className="flex flex-col leading-tight">
                      <span className="text-sm font-semibold">{user.name}</span>
                      <span className="text-[11px] text-textMuted capitalize">
                        {user.role} {user.role === 'ngo' && (user.isVerified ? 'Verified' : 'Pending')}
                      </span>
                    </div>
                  </div>
                  <button onClick={handleLogout} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-textMuted transition-all duration-300 ease-out hover:scale-[1.05] hover:text-text">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-textMuted transition-all duration-300 ease-out hover:scale-[1.05] hover:text-text sm:inline-flex">
                  <LogIn size={14} />
                  Log In
                </Link>
                <Link to="/register" className="inline-flex items-center gap-2 rounded-full bg-teal-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_30px_rgba(20,184,166,0.2)] transition-all duration-300 ease-out hover:scale-[1.05] hover:bg-teal-400">
                  <UserPlus size={14} />
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
