import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, HeartHandshake, Lightbulb, ShieldCheck, Users } from 'lucide-react';

const About = () => {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-white/8 bg-[#0d1628]/85 p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">About SevaSetu</p>
        <h1 className="mt-2 text-3xl font-bold text-text sm:text-4xl">A trusted bridge between needs and help</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-textMuted">
          SevaSetu is a requirement-based donation platform that connects NGOs and donors through transparent,
          verified, and timely support.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-white/8 bg-white/5 p-4">
            <span className="mb-3 inline-flex rounded-xl bg-cyan-500/10 p-2.5 text-cyan-300">
              <ShieldCheck size={18} />
            </span>
            <h2 className="text-base font-semibold text-text">Verified Transparency</h2>
            <p className="mt-2 text-sm leading-6 text-textMuted">Requests are visible and trackable to build trust for every contribution.</p>
          </article>

          <article className="rounded-2xl border border-white/8 bg-white/5 p-4">
            <span className="mb-3 inline-flex rounded-xl bg-emerald-500/10 p-2.5 text-emerald-300">
              <Users size={18} />
            </span>
            <h2 className="text-base font-semibold text-text">Community Driven</h2>
            <p className="mt-2 text-sm leading-6 text-textMuted">Donors and NGOs collaborate directly to solve urgent and recurring needs.</p>
          </article>

          <article className="rounded-2xl border border-white/8 bg-white/5 p-4">
            <span className="mb-3 inline-flex rounded-xl bg-amber-500/10 p-2.5 text-amber-300">
              <HeartHandshake size={18} />
            </span>
            <h2 className="text-base font-semibold text-text">Impact Focused</h2>
            <p className="mt-2 text-sm leading-6 text-textMuted">The platform is designed to improve fulfillment speed and real-world outcomes.</p>
          </article>
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-white/8 bg-gradient-to-br from-slate-900 to-slate-950 p-6 sm:p-8">
        <div className="flex items-start gap-3">
          <span className="mt-1 inline-flex rounded-xl bg-teal-500/15 p-2.5 text-teal-300">
            <Lightbulb size={18} />
          </span>
          <div>
            <h2 className="text-2xl font-semibold text-text">Founder's Note</h2>
            <p className="mt-3 text-sm leading-7 text-textMuted">
              I am the founder of SevaSetu. I created this platform with a simple belief: people want to help, but they
              need a reliable way to find genuine needs and respond quickly. SevaSetu turns that intention into action
              by giving NGOs a clear way to post requirements and donors a transparent way to fulfill them.
            </p>
            <p className="mt-3 text-sm leading-7 text-textMuted">
              Our mission is to reduce friction in giving and increase trust in every contribution, so more help reaches
              the right place at the right time.
            </p>
          </div>
        </div>

        <div className="mt-6">
          <Link
            to="/impact"
            className="inline-flex items-center gap-2 rounded-full bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 ease-out hover:scale-[1.04] hover:bg-teal-400"
          >
            View Platform Impact
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default About;