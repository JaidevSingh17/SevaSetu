import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const RequirementsPage = () => {
  const { user, apiBaseUrl } = useContext(AuthContext);
  const [requirements, setRequirements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pledgeData, setPledgeData] = useState({ reqId: null, quantity: '' });

  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        const res = await axios.get(`${apiBaseUrl}/requirements`);
        setRequirements(res.data);
      } catch (error) {
        console.error("Failed to fetch requirements", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequirements();
  }, [apiBaseUrl]);

  const handlePledge = async (e, reqId) => {
    e.preventDefault();
    if (!pledgeData.quantity || pledgeData.quantity < 1) return;

    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.post(`${apiBaseUrl}/donations`, {
        requirementId: reqId,
        quantity_pledged: Number(pledgeData.quantity)
      }, config);
      
      toast.success('Pledge successful. Thank you for supporting this request.');
      setPledgeData({ reqId: null, quantity: '' });
      // Refresh to get updated quantities
      const res = await axios.get(`${apiBaseUrl}/requirements`);
      setRequirements(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to complete your pledge right now.');
    }
  };

  if (loading) return <div className="p-8 text-center">Loading requirements...</div>;

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent to-primary">Active Requirements</h1>
        <p className="text-textMuted mt-2">Browse the real-time needs of verified NGOs and pledge your support.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {requirements.map(req => {
          const remaining = req.quantity_required - req.quantity_fulfilled;
          return (
            <div key={req._id} className="card flex flex-col hover:border-slate-500 transition-all duration-300 shadow hover:shadow-xl hover:shadow-primary/5">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-slate-100">{req.item}</h3>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  req.urgency === 'High' ? 'bg-red-500/20 text-red-400' :
                  req.urgency === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {req.urgency} Urgency
                </span>
              </div>
              
              <div className="mb-4">
                <div className="text-sm text-textMuted mb-1">
                  NGO: <span className="font-medium text-slate-300">{req.ngoId?.name || 'Unknown NGO'}</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2.5 mt-2">
                  <div className="bg-gradient-to-r from-primary to-accent h-2.5 rounded-full" style={{ width: `${(req.quantity_fulfilled / req.quantity_required) * 100}%` }}></div>
                </div>
                <div className="flex justify-between text-xs mt-1 font-medium">
                  <span className="text-accent">{req.quantity_fulfilled} fulfilled</span>
                  <span className="text-slate-400">{req.quantity_required} required</span>
                </div>
              </div>

              <div className="mt-auto border-t border-slate-700 pt-4">
                {pledgeData.reqId === req._id ? (
                  <form onSubmit={(e) => handlePledge(e, req._id)} className="flex gap-2">
                    <input 
                      type="number" min="1" max={remaining}
                      className="input-field py-1 px-2 flex-1"
                      placeholder={`Max ${remaining}`}
                      value={pledgeData.quantity}
                      onChange={e => setPledgeData({ ...pledgeData, quantity: e.target.value })}
                      required
                      autoFocus
                    />
                    <button type="submit" className="btn-primary py-1 px-3 bg-accent hover:bg-green-600 text-sm">Confirm</button>
                    <button type="button" onClick={() => setPledgeData({reqId: null, quantity: ''})} className="text-slate-400 hover:text-white px-2">✕</button>
                  </form>
                ) : (
                  <button 
                    onClick={() => setPledgeData({ reqId: req._id, quantity: '' })}
                    className="w-full py-2 bg-slate-800 hover:bg-primary/20 hover:text-primary transition-colors rounded-lg font-medium border border-slate-700 hover:border-primary/50 text-sm"
                  >
                    Pledge Donation
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {requirements.length === 0 && (
        <div className="text-center p-12 card border border-slate-700 bg-slate-800/50">
          <p className="text-textMuted text-lg">No active requirements at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default RequirementsPage;
