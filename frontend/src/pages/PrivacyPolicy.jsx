import React from 'react';

const PrivacyPolicy = () => {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-white/10 bg-[#0d1628]/85 p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-text">Privacy Policy</h1>
        <p className="mt-3 text-sm leading-7 text-textMuted">
          SevaSetu collects only the information required to create accounts, match donations, and support NGO workflows.
        </p>
        <div className="mt-6 space-y-4 text-sm leading-7 text-textMuted">
          <p><strong className="text-text">Data collected:</strong> account details, role information, requirement and donation records.</p>
          <p><strong className="text-text">How data is used:</strong> platform operations, transparency features, security monitoring, and support.</p>
          <p><strong className="text-text">Data sharing:</strong> no sale of personal data; only minimal operational sharing needed for platform features.</p>
          <p><strong className="text-text">Security:</strong> role-based access and authentication controls are applied to protect user data.</p>
          <p><strong className="text-text">Contact:</strong> For privacy questions, email support@sevasetu.org.</p>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPolicy;
