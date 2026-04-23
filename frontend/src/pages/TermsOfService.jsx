import React from 'react';

const TermsOfService = () => {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-white/10 bg-[#0d1628]/85 p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-text">Terms of Service</h1>
        <p className="mt-3 text-sm leading-7 text-textMuted">
          By using SevaSetu, you agree to use the platform responsibly and provide accurate information.
        </p>
        <div className="mt-6 space-y-4 text-sm leading-7 text-textMuted">
          <p><strong className="text-text">Account responsibility:</strong> Users are responsible for account security and truthful profile details.</p>
          <p><strong className="text-text">NGO requirements:</strong> NGOs must post genuine, relevant requests and keep fulfillment status accurate.</p>
          <p><strong className="text-text">Donor pledges:</strong> Donors should pledge responsibly and communicate changes as early as possible.</p>
          <p><strong className="text-text">Prohibited actions:</strong> fraudulent activity, abuse, spam, and misuse of platform data are not allowed.</p>
          <p><strong className="text-text">Service updates:</strong> Terms may be updated as product features evolve.</p>
        </div>
      </section>
    </main>
  );
};

export default TermsOfService;
