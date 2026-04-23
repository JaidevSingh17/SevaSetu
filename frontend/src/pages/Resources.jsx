import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpenText,
  CircleHelp,
  FileCheck2,
  HandHeart,
  ShieldCheck,
  Video,
  Wrench,
} from 'lucide-react';

const resourceCards = [
  {
    title: 'Donor Starter Guide',
    description: 'Learn how to discover active needs, evaluate urgency, and pledge effectively.',
    icon: HandHeart,
  },
  {
    title: 'NGO Requirement Playbook',
    description: 'Best practices for posting clear, verifiable, and fulfillment-ready requirements.',
    icon: FileCheck2,
  },
  {
    title: 'Verification & Trust',
    description: 'Understand NGO verification, safe usage, and platform transparency standards.',
    icon: ShieldCheck,
  },
  {
    title: 'Support & Troubleshooting',
    description: 'Find quick answers for login issues, dashboard errors, and route/access problems.',
    icon: Wrench,
  },
];

const quickLinks = [
  { label: 'How donations are matched', href: '/requirements' },
  { label: 'Create a donor account', href: '/register' },
  { label: 'Access your dashboard', href: '/dashboard' },
  { label: 'Platform impact overview', href: '/impact' },
];

const Resources = () => {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-white/8 bg-[#0d1628]/85 p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Resources</p>
        <h1 className="mt-2 text-3xl font-bold text-text sm:text-4xl">Everything you need to use SevaSetu well</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-textMuted">
          Explore practical guides for donors and NGOs, platform policies, and support material to make each contribution meaningful.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {resourceCards.map((card) => {
            const Icon = card.icon;
            return (
              <article key={card.title} className="rounded-2xl border border-white/8 bg-white/5 p-5">
                <div className="mb-3 inline-flex rounded-xl bg-cyan-500/12 p-2.5 text-cyan-300">
                  <Icon size={18} />
                </div>
                <h2 className="text-lg font-semibold text-text">{card.title}</h2>
                <p className="mt-2 text-sm leading-6 text-textMuted">{card.description}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-white/8 bg-slate-950/35 p-5">
            <h2 className="inline-flex items-center gap-2 text-lg font-semibold text-text">
              <BookOpenText size={18} className="text-cyan-300" />
              Learning Library
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-textMuted">
              <li className="rounded-xl border border-white/8 bg-white/5 p-3">How to write high-clarity NGO requests</li>
              <li className="rounded-xl border border-white/8 bg-white/5 p-3">Donor pledge etiquette and fulfillment tips</li>
              <li className="rounded-xl border border-white/8 bg-white/5 p-3">Tracking request status with confidence</li>
              <li className="rounded-xl border border-white/8 bg-white/5 p-3">Role-based dashboard usage guide</li>
            </ul>
          </div>

          <aside className="rounded-2xl border border-white/8 bg-gradient-to-br from-slate-900 to-slate-950 p-5">
            <h2 className="inline-flex items-center gap-2 text-lg font-semibold text-text">
              <CircleHelp size={18} className="text-amber-300" />
              Quick Access
            </h2>
            <div className="mt-4 space-y-2">
              {quickLinks.map((item) => (
                <Link key={item.label} to={item.href} className="flex items-center justify-between rounded-xl border border-white/8 bg-white/5 px-3 py-2.5 text-sm text-textMuted transition-colors hover:text-text">
                  <span>{item.label}</span>
                  <ArrowRight size={14} className="text-cyan-300" />
                </Link>
              ))}
            </div>

            <div className="mt-5 rounded-xl border border-white/8 bg-white/5 p-4 text-sm text-textMuted">
              <p className="inline-flex items-center gap-2 text-text">
                <Video size={16} className="text-emerald-300" />
                Need guided help?
              </p>
              <p className="mt-2">Reach support for onboarding and dashboard walkthroughs for your team.</p>
              <a href="mailto:support@sevasetu.org" className="mt-3 inline-flex text-cyan-300 hover:text-cyan-200">
                support@sevasetu.org
              </a>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default Resources;
