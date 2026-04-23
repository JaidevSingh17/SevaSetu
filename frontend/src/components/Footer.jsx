import React from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake, Mail, ShieldCheck, MapPin, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-10 border-t border-white/10 bg-[#070f1c]/90 backdrop-blur-md">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="inline-flex items-center gap-2.5 text-lg font-semibold text-text">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500/15 text-teal-300">
                <HeartHandshake size={17} />
              </span>
              SevaSetu
            </div>
            <p className="mt-3 max-w-sm text-sm leading-6 text-textMuted">
              Connecting donors and NGOs through transparent, requirement-based giving.
            </p>
            <p className="mt-3 inline-flex items-center gap-2 text-sm text-textMuted">
              <ShieldCheck size={14} className="text-cyan-300" />
              Role-based secure access
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-teal-300">Explore</h3>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <a href="/#" className="text-textMuted transition-colors hover:text-text">Home</a>
              <a href="/#features" className="text-textMuted transition-colors hover:text-text">Features</a>
              <a href="/#flow" className="text-textMuted transition-colors hover:text-text">How It Works</a>
              <Link to="/impact" className="text-textMuted transition-colors hover:text-text">Impact</Link>
              <Link to="/resources" className="text-textMuted transition-colors hover:text-text">Resources</Link>
              <Link to="/about" className="text-textMuted transition-colors hover:text-text">About Us</Link>
              <a href="/#faq" className="text-textMuted transition-colors hover:text-text">FAQ</a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-teal-300">Account</h3>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <Link to="/register" className="text-textMuted transition-colors hover:text-text">Create Account</Link>
              <Link to="/login" className="text-textMuted transition-colors hover:text-text">Login</Link>
              <Link to="/dashboard" className="text-textMuted transition-colors hover:text-text">Dashboard</Link>
              <Link to="/requirements" className="text-textMuted transition-colors hover:text-text">Requirements</Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-teal-300">Support</h3>
            <div className="mt-3 space-y-2 text-sm text-textMuted">
              <a href="mailto:support@sevasetu.org" className="inline-flex items-center gap-2 transition-colors hover:text-text">
                <Mail size={14} className="text-cyan-300" />
                support@sevasetu.org
              </a>
              <p className="inline-flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 text-cyan-300" />
                MIET COLLEGE
              </p>
              <a
                href="https://mail.google.com/mail/?view=cm&to=support@sevasetu.org"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-teal-300 transition-colors hover:text-teal-200"
              >
                Contact Support
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-4 text-xs text-textMuted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} SevaSetu. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="transition-colors hover:text-text">Privacy</Link>
            <Link to="/terms" className="transition-colors hover:text-text">Terms</Link>
            <a href="mailto:support@sevasetu.org" className="transition-colors hover:text-text">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
