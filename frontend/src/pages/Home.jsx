import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import {
  HandHeart,
  Building2,
  PackageCheck,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  ChartNoAxesCombined,
  Users,
  Search,
  BellRing,
  CircleGauge,
  ChevronRight,
  Layers3,
  BadgeCheck,
  MessageSquareMore,
  Clock3,
  Globe2,
  Target,
} from 'lucide-react';

const Home = () => {
  const { apiBaseUrl } = useContext(AuthContext);
  const [impactData, setImpactData] = useState(null);

  const ambientStars = [
    { top: '11%', left: '14%', delay: '0.2s', duration: '18s', size: '1.8px', alpha: 0.72, dx: '14px', dy: '-9px' },
    { top: '17%', left: '67%', delay: '2.1s', duration: '22s', size: '1.4px', alpha: 0.58, dx: '-16px', dy: '10px' },
    { top: '24%', left: '81%', delay: '1.4s', duration: '20s', size: '1.9px', alpha: 0.76, dx: '11px', dy: '13px' },
    { top: '31%', left: '42%', delay: '3.8s', duration: '26s', size: '1.3px', alpha: 0.46, dx: '-18px', dy: '-11px' },
    { top: '39%', left: '19%', delay: '1.7s', duration: '24s', size: '1.6px', alpha: 0.62, dx: '15px', dy: '-7px' },
    { top: '47%', left: '73%', delay: '4.2s', duration: '19s', size: '2px', alpha: 0.8, dx: '-13px', dy: '8px' },
    { top: '54%', left: '8%', delay: '2.9s', duration: '23s', size: '1.2px', alpha: 0.44, dx: '10px', dy: '14px' },
    { top: '61%', left: '57%', delay: '0.9s', duration: '21s', size: '1.7px', alpha: 0.67, dx: '-12px', dy: '-12px' },
    { top: '68%', left: '87%', delay: '3.3s', duration: '27s', size: '1.5px', alpha: 0.53, dx: '17px', dy: '-10px' },
    { top: '76%', left: '29%', delay: '2.4s', duration: '25s', size: '1.9px', alpha: 0.74, dx: '-15px', dy: '9px' },
    { top: '84%', left: '49%', delay: '5s', duration: '28s', size: '1.3px', alpha: 0.48, dx: '13px', dy: '-14px' },
    { top: '90%', left: '71%', delay: '1.2s', duration: '22s', size: '1.6px', alpha: 0.59, dx: '-9px', dy: '11px' },
  ];

  const featureBlocks = [
    {
      title: 'Post Requirements with Precision',
      copy: 'NGOs can describe exact item, quantity, urgency, and notes so donors know the real need.',
      icon: Layers3,
      color: 'from-cyan-500/15 to-slate-900',
    },
    {
      title: 'Verified NGO Trust Layer',
      copy: 'Verified status, organization details, and response history give donors confidence.',
      icon: BadgeCheck,
      color: 'from-emerald-500/15 to-slate-900',
    },
    {
      title: 'Built-in Communication Flow',
      copy: 'Clear status updates and donation history reduce friction between donors and NGOs.',
      icon: MessageSquareMore,
      color: 'from-amber-500/15 to-slate-900',
    },
    {
      title: 'Track Time-Sensitive Needs',
      copy: 'Urgency labels, progress bars, and timelines help urgent requests get attention first.',
      icon: Clock3,
      color: 'from-blue-500/15 to-slate-900',
    },
  ];

  const faqs = [
    {
      q: 'Who can use SevaSetu?',
      a: 'Donors, NGOs, and admins all have role-based dashboards and access controls.',
    },
    {
      q: 'How do NGOs get verified?',
      a: 'Admin approval marks an NGO as verified before donors can trust the listed requests.',
    },
    {
      q: 'What happens after a donation is pledged?',
      a: 'The request progress updates, donation history records the pledge, and notifications can be sent.',
    },
  ];

  const fallbackImpactData = {
    summary: {
      totalRequests: 2340,
      fulfilledRequests: 1984,
      fulfillmentRate: 84.7,
      avgResponseHours: 18,
      openRequests: 74,
      verifiedNgos: 31,
      totalNgos: 45,
      totalDonors: 120,
      recurringDonors: 67,
      totalFulfilledQty: 6021,
    },
    urgencyBreakdown: [
      { name: 'High Urgency', progress: 89, total: '620 requests' },
      { name: 'Medium Urgency', progress: 82, total: '840 requests' },
      { name: 'Low Urgency', progress: 78, total: '510 requests' },
    ],
    monthlyTrend: [
      { month: 'Jan', requests: 120, fulfilled: 98 },
      { month: 'Feb', requests: 146, fulfilled: 116 },
      { month: 'Mar', requests: 170, fulfilled: 142 },
      { month: 'Apr', requests: 188, fulfilled: 162 },
      { month: 'May', requests: 210, fulfilled: 181 },
      { month: 'Jun', requests: 232, fulfilled: 205 },
    ],
    regionalImpact: [
      { region: 'Delhi NCR', ngos: 11, fulfilled: '312' },
      { region: 'Bengaluru', ngos: 8, fulfilled: '246' },
      { region: 'Pune', ngos: 6, fulfilled: '198' },
      { region: 'Hyderabad', ngos: 5, fulfilled: '173' },
    ],
    stories: [
      {
        title: 'Emergency Winter Relief',
        ngo: 'Asha Care Foundation',
        summary: 'Requested 500 blankets across two shelters. 100% pledged and delivered in 4 days.',
        result: 'Protected 480+ people during severe cold nights.',
      },
      {
        title: 'School Reopening Drive',
        ngo: 'Udaan Learning Trust',
        summary: 'Requested 800 education kits for under-resourced students. 92% fulfilled in one campaign cycle.',
        result: 'Enabled uninterrupted learning for 740 children.',
      },
    ],
  };

  useEffect(() => {
    let cancelled = false;

    const fetchImpact = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/impact/summary`);
        if (!cancelled) {
          setImpactData(response.data);
        }
      } catch (error) {
        if (!cancelled) {
          setImpactData(null);
        }
      }
    };

    fetchImpact();

    return () => {
      cancelled = true;
    };
  }, [apiBaseUrl]);

  const resolvedImpact = impactData || fallbackImpactData;
  const summary = resolvedImpact.summary;

  const impactStats = [
    {
      title: 'Total Requests',
      value: Number(summary.totalRequests || 0).toLocaleString(),
      subtitle: 'All-time posted',
      icon: PackageCheck,
      tone: 'text-cyan-300 bg-cyan-500/10',
    },
    {
      title: 'Fulfilled Requests',
      value: Number(summary.fulfilledRequests || 0).toLocaleString(),
      subtitle: 'Need matched successfully',
      icon: CheckCircle2,
      tone: 'text-emerald-300 bg-emerald-500/10',
    },
    {
      title: 'Fulfillment Rate',
      value: `${Number(summary.fulfillmentRate || 0).toFixed(1)}%`,
      subtitle: 'Across all categories',
      icon: ChartNoAxesCombined,
      tone: 'text-amber-300 bg-amber-500/10',
    },
    {
      title: 'Average Response Time',
      value: `${Number(summary.avgResponseHours || 0).toFixed(1)}h`,
      subtitle: 'From post to first pledge',
      icon: Clock3,
      tone: 'text-violet-300 bg-violet-500/10',
    },
  ];

  const impactCategories = resolvedImpact.urgencyBreakdown;
  const monthlyTrend = resolvedImpact.monthlyTrend;
  const regionalImpact = resolvedImpact.regionalImpact;
  const impactStories = resolvedImpact.stories;

  return (
    <div className="relative flex-1 overflow-hidden">
      <div className="shooting-sky">
        <div className="twinkle-layer">
          {ambientStars.map((star, idx) => (
            <span
              key={`ambient-star-${idx}`}
              className="ambient-star"
              style={{
                top: star.top,
                left: star.left,
                '--delay': star.delay,
                '--duration': star.duration,
                '--size': star.size,
                '--alpha': star.alpha,
                '--dx': star.dx,
                '--dy': star.dy,
              }}
            ></span>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(14,165,164,0.18),transparent_24%),radial-gradient(circle_at_10%_80%,rgba(16,185,129,0.10),transparent_20%),radial-gradient(circle_at_92%_50%,rgba(245,158,11,0.10),transparent_18%)]"></div>
      <div className="pointer-events-none absolute left-[-8%] top-[18%] h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl"></div>
      <div className="pointer-events-none absolute right-[-4%] top-[22%] h-72 w-72 rounded-full bg-amber-500/10 blur-3xl"></div>

      <section className="flex min-h-[calc(100vh-4.5rem)] w-full max-w-none flex-col px-3 pb-6 pt-6 sm:px-5 lg:px-7 lg:pb-8 lg:pt-6">
        <div className="grid flex-1 items-center gap-8 lg:grid-cols-[1fr_1fr] lg:gap-10">
          <div className="z-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
              <Sparkles size={13} />
              Built for real impact
            </div>

            <h1 className="text-[clamp(3rem,5.6vw,5.4rem)] font-extrabold leading-[0.95] tracking-tight text-text">
              One platform.
              <br />
              Complete <span className="text-teal-400">donation</span> journey.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-textMuted sm:text-lg">
              SevaSetu turns goodwill into measurable outcomes. NGOs post exact requirements, donors pledge what is truly needed, and every fulfillment step stays visible.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/register" className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm sm:text-base">
                Start As Donor
                <ArrowRight size={18} />
              </Link>
              <Link to="/register" className="btn-secondary inline-flex items-center gap-2 px-6 py-3 text-sm sm:text-base">
                Register Your NGO
                <Building2 size={17} />
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-textMuted">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-teal-400" />
                Trusted by NGOs. Loved by donors.
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-cyan-300" />
                Focused on impact.
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-center">
            <div className="relative h-[30rem] w-full max-w-[42rem] lg:h-[36rem]">
              <div className="absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/12 blur-3xl"></div>
              <div className="absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/25"></div>
              <div className="absolute left-1/2 top-1/2 h-[19rem] w-[19rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-teal-400/25"></div>
              <div className="absolute left-1/2 top-1/2 h-[14rem] w-[14rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.35),rgba(9,18,32,0.05)_70%)] shadow-[0_0_120px_rgba(16,185,129,0.18)]"></div>
              <div className="absolute left-1/2 top-1/2 h-[12rem] w-[12rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.12),transparent_40%),radial-gradient(circle_at_70%_70%,rgba(16,185,129,0.14),transparent_34%),linear-gradient(145deg,rgba(8,17,31,0.95),rgba(16,27,49,0.95))] shadow-[0_0_60px_rgba(14,165,164,0.22)]"></div>

              <div className="absolute inset-0 animate-[spin_28s_linear_infinite] rounded-full opacity-60 [background:radial-gradient(circle_at_center,transparent_61%,rgba(20,44,72,0.8)_62%,transparent_63%),conic-gradient(from_180deg,transparent 0deg,rgba(16,185,129,0.18) 30deg,transparent 80deg,rgba(34,211,238,0.2) 130deg,transparent 200deg,rgba(245,158,11,0.18) 250deg,transparent 320deg,transparent_360deg)]"></div>

              <div className="absolute left-1/2 top-[8%] h-[1px] w-[82%] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent"></div>
              <div className="absolute left-1/2 top-[20%] h-[1px] w-[92%] -translate-x-1/2 bg-gradient-to-r from-transparent via-teal-300/35 to-transparent"></div>
              <div className="absolute left-1/2 top-[74%] h-[1px] w-[88%] -translate-x-1/2 bg-gradient-to-r from-transparent via-emerald-300/35 to-transparent"></div>

              <div className="absolute left-[8%] top-[8%] h-16 w-16 rounded-full border border-cyan-300/25 bg-cyan-400/10 blur-[0.5px]"></div>
              <div className="absolute right-[4%] top-[24%] h-4 w-4 rounded-full bg-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.7)]"></div>
              <div className="absolute left-[16%] bottom-[14%] h-3 w-3 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(16,185,129,0.8)]"></div>
              <div className="absolute right-[18%] bottom-[18%] h-2.5 w-2.5 rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(103,232,249,0.7)]"></div>

              <div className="hidden lg:absolute right-0 top-8 w-[22rem] rounded-3xl border border-teal-500/20 bg-[#0f1a31]/95 p-4 shadow-2xl shadow-cyan-950/30 backdrop-blur-md">
                <div className="grid grid-cols-[1fr_auto] gap-4">
                  <div>
                    <div className="mb-3 inline-flex rounded-xl bg-teal-500/15 p-3 text-teal-300">
                      <PackageCheck size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-text">Structured Requirements</h3>
                    <p className="mt-2 max-w-[13rem] text-sm leading-6 text-textMuted">
                      Every request is detailed with urgency and quantity, enabling smarter giving.
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="rounded-2xl border border-white/10 bg-[#111c33] p-3">
                      <div className="mb-3 flex items-center justify-between gap-3 text-[10px] text-textMuted">
                        <span className="rounded-full bg-teal-500/15 px-2 py-1 text-teal-300">Urgent</span>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 w-24 rounded-full bg-slate-700"></div>
                        <div className="h-2 w-28 rounded-full bg-slate-700"></div>
                        <div className="h-2 w-20 rounded-full bg-slate-700"></div>
                      </div>
                    </div>
                    <ChevronRight size={18} className="ml-3 text-textMuted" />
                  </div>
                </div>
              </div>

              <div className="hidden lg:absolute right-0 top-[13.8rem] w-[22rem] rounded-3xl border border-amber-500/20 bg-[#0f1a31]/95 p-4 shadow-2xl shadow-amber-950/20 backdrop-blur-md">
                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
                  <div className="rounded-xl bg-amber-500/15 p-3 text-amber-300">
                    <HandHeart size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text">Faster Pledge Cycles</h3>
                    <p className="mt-1 text-sm leading-6 text-textMuted">Donors can quickly commit support where it creates immediate value.</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-[#111c33] px-3 py-2 text-right">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-textMuted">Pledge Cycle</p>
                    <p className="mt-1 text-2xl font-semibold text-amber-300">3.2x</p>
                    <p className="text-xs text-textMuted">faster</p>
                  </div>
                </div>
              </div>

              <div className="hidden lg:absolute right-0 top-[27rem] w-[22rem] rounded-3xl border border-cyan-500/20 bg-[#0f1a31]/95 p-4 shadow-2xl shadow-cyan-950/30 backdrop-blur-md">
                <div className="grid grid-cols-[1fr_auto] gap-4">
                  <div>
                    <div className="mb-3 inline-flex rounded-xl bg-cyan-500/15 p-3 text-cyan-300">
                      <ChartNoAxesCombined size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-text">Trackable Outcomes</h3>
                    <p className="mt-2 max-w-[13rem] text-sm leading-6 text-textMuted">
                      Watch request progress improve with transparent fulfillment signals.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-[#111c33] p-3">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-textMuted">Fulfillment Progress</p>
                    <p className="mt-2 text-3xl font-semibold text-text">86%</p>
                    <div className="mt-3 h-2 w-24 rounded-full bg-slate-700">
                      <div className="h-2 w-[86%] rounded-full bg-gradient-to-r from-cyan-300 to-teal-400"></div>
                    </div>
                    <p className="mt-2 text-[10px] text-cyan-300">+24% this month</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-textMuted">
          <ShieldCheck size={16} className="text-teal-300" />
          Trusted by NGOs. Loved by donors. Focused on impact.
        </div>

          <section id="features" className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-3xl border border-white/8 bg-[#0d1628]/85 p-6 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">What You Can Do</p>
              <h2 className="mt-3 text-2xl font-bold text-text sm:text-3xl">A complete platform, not just a landing screen</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-textMuted">
                Scroll below the hero to see the actual product story: structured requests, verified organizations, progress tracking, and donation management.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {featureBlocks.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <article key={feature.title} className={`rounded-2xl border border-white/8 bg-gradient-to-br ${feature.color} p-5`}>
                      <div className="mb-4 inline-flex rounded-2xl bg-white/5 p-3 text-teal-200 backdrop-blur-sm">
                        <Icon size={22} />
                      </div>
                      <h3 className="text-lg font-semibold text-text">{feature.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-textMuted">{feature.copy}</p>
                    </article>
                  );
                })}
              </div>
            </div>

            <div id="flow" className="rounded-3xl border border-white/8 bg-gradient-to-br from-[#0f1a31] to-[#0a1323] p-6 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">Platform Flow</p>
              <h2 className="mt-3 text-2xl font-bold text-text sm:text-3xl">How the experience works</h2>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-4 rounded-2xl border border-white/8 bg-white/5 p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cyan-500/15 text-cyan-300">
                    <Search size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text">1. Browse requirements</h3>
                    <p className="mt-1 text-sm leading-6 text-textMuted">Donors discover active NGO needs and can filter by urgency, item type, or progress.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-white/8 bg-white/5 p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
                    <HandHeart size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text">2. Pledge the exact quantity</h3>
                    <p className="mt-1 text-sm leading-6 text-textMuted">Pledge what you can provide, and the platform keeps the request balanced and updated.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-white/8 bg-white/5 p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-amber-300">
                    <Target size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text">3. Track fulfillment and delivery</h3>
                    <p className="mt-1 text-sm leading-6 text-textMuted">NGOs and donors can see what is fulfilled, pending, or delivered in one place.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="impact" className="mt-10 rounded-3xl border border-white/8 bg-[#0d1628]/85 p-6 sm:p-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">Impact</p>
                <h2 className="mt-2 text-2xl font-bold text-text sm:text-3xl">Measurable outcomes, not just promises</h2>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-textMuted">
                  SevaSetu tracks end-to-end results so donors, NGOs, and admins can evaluate real social impact over time.
                </p>
              </div>
              <div className="rounded-full bg-teal-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-teal-300">
                Updated Weekly
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {impactStats.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="rounded-2xl border border-white/8 bg-white/5 p-4">
                    <div className={`mb-3 inline-flex rounded-xl p-2.5 text-sm font-semibold ${item.tone}`}>
                      <Icon size={18} />
                    </div>
                    <p className="text-xs uppercase tracking-[0.16em] text-textMuted">{item.title}</p>
                    <p className="mt-2 text-3xl font-bold text-text">{item.value}</p>
                    <p className="mt-1 text-sm text-textMuted">{item.subtitle}</p>
                  </article>
                );
              })}
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-2xl border border-white/8 bg-slate-950/35 p-5">
                <h3 className="text-lg font-semibold text-text">Impact by Category</h3>
                <div className="mt-5 space-y-4">
                  {impactCategories.map((category) => (
                    <div key={category.name}>
                      <div className="mb-1.5 flex items-center justify-between text-sm text-textMuted">
                        <span>{category.name}</span>
                        <span>{category.progress}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-800">
                        <div className="h-2 rounded-full bg-gradient-to-r from-cyan-300 to-teal-400" style={{ width: `${category.progress}%` }}></div>
                      </div>
                      <p className="mt-1 text-xs text-textMuted">{category.total}</p>
                    </div>
                  ))}
                </div>

                <h3 className="mt-8 text-lg font-semibold text-text">Monthly Trend</h3>
                <div className="mt-4 space-y-3">
                  {monthlyTrend.map((row) => (
                    <div key={row.month} className="rounded-xl border border-white/8 bg-white/5 p-3">
                      <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.12em] text-textMuted">
                        <span>{row.month}</span>
                        <span>{row.fulfilled}/{row.requests}</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-800">
                        <div className="h-2 rounded-full bg-gradient-to-r from-emerald-300 to-cyan-400" style={{ width: `${(row.fulfilled / row.requests) * 100}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-2xl border border-white/8 bg-gradient-to-br from-slate-900 to-slate-950 p-5">
                  <h3 className="text-lg font-semibold text-text">Regional Reach</h3>
                  <div className="mt-4 space-y-3">
                    {regionalImpact.map((r) => (
                      <div key={r.region} className="flex items-center justify-between rounded-xl border border-white/8 bg-white/5 px-3 py-2.5">
                        <div>
                          <p className="font-medium text-text">{r.region}</p>
                          <p className="text-xs text-textMuted">{r.ngos} active NGOs</p>
                        </div>
                        <p className="text-sm font-semibold text-cyan-300">{r.fulfilled} fulfilled</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/8 bg-white/5 p-5">
                  <h3 className="text-lg font-semibold text-text">Trust Signals</h3>
                  <div className="mt-4 space-y-2 text-sm text-textMuted">
                    <p className="inline-flex items-center gap-2"><BadgeCheck size={15} className="text-emerald-300" /> {summary.verifiedNgos || 0} verified NGOs onboarded</p>
                    <p className="inline-flex items-center gap-2"><Users size={15} className="text-cyan-300" /> {summary.recurringDonors || 0} recurring monthly donors</p>
                    <p className="inline-flex items-center gap-2"><BellRing size={15} className="text-amber-300" /> {summary.openRequests || 0} open requests currently active</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {impactStories.map((story) => (
                <article key={story.title} className="rounded-2xl border border-white/8 bg-gradient-to-br from-white/5 to-slate-900/60 p-5">
                  <p className="text-xs uppercase tracking-[0.14em] text-emerald-300">{story.ngo}</p>
                  <h3 className="mt-2 text-lg font-semibold text-text">{story.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-textMuted">{story.summary}</p>
                  <p className="mt-3 text-sm font-medium text-cyan-300">{story.result}</p>
                </article>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/register" className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm">
                Become a Donor
                <ArrowRight size={16} />
              </Link>
              <Link to="/register" className="btn-secondary inline-flex items-center gap-2 px-6 py-3 text-sm">
                Register Your NGO
              </Link>
            </div>
          </section>

          <section id="faq" className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-3xl border border-white/8 bg-[#0d1628]/85 p-6 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">FAQ</p>
              <h2 className="mt-3 text-2xl font-bold text-text sm:text-3xl">Common questions</h2>
              <div className="mt-5 space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.q} className="rounded-2xl border border-white/8 bg-white/5 p-4">
                    <h3 className="font-semibold text-text">{faq.q}</h3>
                    <p className="mt-2 text-sm leading-6 text-textMuted">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-teal-500/20 bg-gradient-to-br from-teal-500/10 via-slate-900 to-slate-950 p-6 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">Next Step</p>
              <h2 className="mt-3 text-2xl font-bold text-text sm:text-3xl">Scroll, explore, and then create your role</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-textMuted">
                The home page now continues below the hero so visitors can understand the platform before signing up.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/register" className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm">
                  Get Started
                  <ArrowRight size={17} />
                </Link>
                <Link to="/login" className="btn-secondary inline-flex items-center gap-2 px-6 py-3 text-sm">
                  View Dashboard
                </Link>
              </div>
            </div>
          </section>
      </section>
    </div>
  );
};

export default Home;
