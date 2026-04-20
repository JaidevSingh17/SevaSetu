import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 py-20">
      <div className="text-center">
        <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-4">
          SevaSetu
        </h1>
        <p className="text-xl text-textMuted max-w-2xl mx-auto mb-8">
          Bridging the gap between unstructured donations and actual NGO requirements.
        </p>
        
        <div className="flex gap-4 justify-center">
          <Link to="/register" className="btn-primary">I am a Donor</Link>
          <Link to="/register" className="btn-secondary">I am an NGO</Link>
        </div>
      </div>
      
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        <div className="card space-y-3 hover:-translate-y-1 transition-transform duration-300">
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary text-2xl mb-4">
            📋
          </div>
          <h3 className="text-xl font-semibold">Post Requirements</h3>
          <p className="text-textMuted text-sm">NGOs can list specific, immediate needs with exact quantities and urgencies.</p>
        </div>
        
        <div className="card space-y-3 hover:-translate-y-1 transition-transform duration-300">
          <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center text-accent text-2xl mb-4">
            🤝
          </div>
          <h3 className="text-xl font-semibold">Match Donations</h3>
          <p className="text-textMuted text-sm">Donors browse and pledge items, directly fulfilling actual, real-time needs.</p>
        </div>
        
        <div className="card space-y-3 hover:-translate-y-1 transition-transform duration-300">
          <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center text-secondary text-2xl mb-4">
            🔔
          </div>
          <h3 className="text-xl font-semibold">Track Progress</h3>
          <p className="text-textMuted text-sm">Real-time status updates and notifications ensure transparency.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
