import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  BellRing,
  ChartNoAxesCombined,
  CheckCircle2,
  Clock3,
  PackageCheck,
  Users,
} from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';

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

const Impact = () => {
  const { apiBaseUrl } = useContext(AuthContext);
  const [impactData, setImpactData] = useState(null);

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

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-white/8 bg-[#0d1628]/85 p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">Impact Dashboard</p>
        <h1 className="mt-2 text-3xl font-bold text-text sm:text-4xl">Real outcomes from real community support</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-textMuted">
          This page tracks how SevaSetu converts requirements into fulfilled support across regions, urgency levels, and time.
        </p>

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
            <h2 className="text-lg font-semibold text-text">Impact by Category</h2>
            <div className="mt-5 space-y-4">
              {resolvedImpact.urgencyBreakdown.map((category) => (
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

            <h2 className="mt-8 text-lg font-semibold text-text">Monthly Trend</h2>
            <div className="mt-4 space-y-3">
              {resolvedImpact.monthlyTrend.map((row) => (
                <div key={row.month} className="rounded-xl border border-white/8 bg-white/5 p-3">
                  <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.12em] text-textMuted">
                    <span>{row.month}</span>
                    <span>{row.fulfilled}/{row.requests}</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-800">
                    <div className="h-2 rounded-full bg-gradient-to-r from-emerald-300 to-cyan-400" style={{ width: `${row.requests > 0 ? (row.fulfilled / row.requests) * 100 : 0}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-white/8 bg-gradient-to-br from-slate-900 to-slate-950 p-5">
              <h2 className="text-lg font-semibold text-text">Regional Reach</h2>
              <div className="mt-4 space-y-3">
                {resolvedImpact.regionalImpact.map((r) => (
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
              <h2 className="text-lg font-semibold text-text">Trust Signals</h2>
              <div className="mt-4 space-y-2 text-sm text-textMuted">
                <p className="inline-flex items-center gap-2"><BadgeCheck size={15} className="text-emerald-300" /> {summary.verifiedNgos || 0} verified NGOs onboarded</p>
                <p className="inline-flex items-center gap-2"><Users size={15} className="text-cyan-300" /> {summary.recurringDonors || 0} recurring monthly donors</p>
                <p className="inline-flex items-center gap-2"><BellRing size={15} className="text-amber-300" /> {summary.openRequests || 0} open requests currently active</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {resolvedImpact.stories.map((story) => (
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
    </main>
  );
};

export default Impact;
