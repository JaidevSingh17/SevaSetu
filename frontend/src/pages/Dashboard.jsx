import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user, apiBaseUrl } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // NGO Specific state
  const [newItem, setNewItem] = useState({ item: '', quantity_required: '', urgency: 'Medium' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        if (user.role === 'donor') {
          const res = await axios.get(`${apiBaseUrl}/donations/donor`, config);
          setData(res.data);
        } else if (user.role === 'ngo') {
          // Temporarily fetching all requirements to filter by this NGO, 
          // Ideally a specific route /api/requirements/ngo shouldn't be too hard to add if we need
          const res = await axios.get(`${apiBaseUrl}/requirements`, config);
          const ngoReqs = res.data.filter(r => r.ngoId._id === user._id || r.ngoId === user._id);
          setData(ngoReqs);
        } else if (user.role === 'admin') {
          const res = await axios.get(`${apiBaseUrl}/admin/users`, config);
          setData(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user, apiBaseUrl]);

  const handleCreateRequirement = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const res = await axios.post(`${apiBaseUrl}/requirements`, newItem, config);
      setData([...data, res.data]);
      setNewItem({ item: '', quantity_required: '', urgency: 'Medium' });
      toast.success('Requirement posted successfully.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error creating requirement.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-8 text-center animate-pulse">Loading dashboard...</div>;

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
        <p className="text-textMuted capitalize">{user.role} Dashboard</p>
      </div>

      {user.role === 'ngo' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="card h-fit lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4">Post a Requirement</h2>
            <form onSubmit={handleCreateRequirement} className="space-y-4">
              <div>
                <label className="block text-sm mb-1 text-slate-300">Item Name</label>
                <input 
                  type="text" className="input-field" value={newItem.item} required
                  onChange={e => setNewItem({...newItem, item: e.target.value})}
                  placeholder="e.g. Blankets"
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-slate-300">Quantity Needed</label>
                <input 
                  type="number" min="1" className="input-field" value={newItem.quantity_required} required
                  onChange={e => setNewItem({...newItem, quantity_required: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-slate-300">Urgency</label>
                <select 
                  className="input-field" value={newItem.urgency}
                  onChange={e => setNewItem({...newItem, urgency: e.target.value})}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <button type="submit" className="btn-primary w-full" disabled={submitting}>
                {submitting ? 'Posting...' : 'Ask for Help'}
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold border-b border-slate-700 pb-2">Your Active Requests</h2>
            {data && data.length > 0 ? (
              <div className="grid gap-4">
                {data.map(req => {
                  const itemName = (req.item || '').toLowerCase();
                  return (
                    <div key={req._id} className="card p-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4 border border-slate-700 hover:border-slate-500 transition-all hover:shadow-lg">
                      <div className="h-24 w-24 rounded-lg bg-gradient-to-br from-teal-500/15 to-cyan-500/10 flex items-center justify-center text-4xl border border-white/10 flex-shrink-0">
                        {itemName.includes('blanket') && '🛏️'}
                        {itemName.includes('food') && '🍽️'}
                        {itemName.includes('medical') && '🏥'}
                        {itemName.includes('education') && '📚'}
                        {itemName.includes('clothing') && '👕'}
                        {itemName.includes('kit') && '🎁'}
                        {itemName.includes('book') && '📖'}
                        {!itemName.includes('blanket') && !itemName.includes('food') && !itemName.includes('medical') && !itemName.includes('education') && !itemName.includes('clothing') && !itemName.includes('kit') && !itemName.includes('book') && '📦'}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{req.item}</h3>
                        <p className="text-sm text-textMuted">Urgency: <span className={`${req.urgency === 'High' ? 'text-red-400' : 'text-yellow-400'}`}>{req.urgency}</span></p>
                        <div className="w-full bg-slate-800 rounded-full h-2 mt-2">
                          <div className="bg-gradient-to-r from-cyan-300 to-teal-400 h-2 rounded-full" style={{ width: `${(req.quantity_fulfilled / req.quantity_required) * 100}%` }}></div>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-2xl font-bold">{req.quantity_fulfilled} / {req.quantity_required}</div>
                        <div className="text-xs text-slate-400">Fulfilled</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : <p className="text-textMuted">You haven't posted any requirements yet.</p>}
          </div>
        </div>
      )}

      {user.role === 'donor' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold border-b border-slate-700 pb-2">Your Donation History</h2>
          {data && data.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {data.map(donation => {
                const itemName = (donation.requirementId?.item || 'Unknown Item').toLowerCase();
                const statusColor = donation.status === 'Delivered' ? 'from-green-500/15 to-emerald-500/10' : 'from-amber-500/15 to-orange-500/10';
                return (
                  <div key={donation._id} className="card p-4 flex flex-col space-y-2 border border-slate-700 hover:border-slate-500 transition-all">
                    <div className={`h-32 rounded-lg bg-gradient-to-br ${statusColor} flex items-center justify-center text-5xl border border-white/10 mb-2`}>
                      {itemName.includes('blanket') && '🛏️'}
                      {itemName.includes('food') && '🍽️'}
                      {itemName.includes('medical') && '🏥'}
                      {itemName.includes('education') && '📚'}
                      {itemName.includes('clothing') && '👕'}
                      {itemName.includes('kit') && '🎁'}
                      {!itemName.includes('blanket') && !itemName.includes('food') && !itemName.includes('medical') && !itemName.includes('education') && !itemName.includes('clothing') && !itemName.includes('kit') && '📦'}
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">{donation.requirementId?.item || 'Unknown Item'}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${donation.status === 'Delivered' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                        {donation.status}
                      </span>
                    </div>
                    <div className="text-sm text-textMuted">
                      Quantity Pledged: <span className="text-text font-bold">{donation.quantity_pledged}</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-2">
                      Date: {new Date(donation.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : <p className="text-textMuted">You haven't made any pledges yet. Visit the Requirements page to start!</p>}
        </div>
      )}

      {user.role === 'admin' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold border-b border-slate-700 pb-2">Platform Users</h2>
          {data && data.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left bg-surface rounded-xl overflow-hidden shadow">
                <thead className="bg-slate-800">
                  <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {data.map(u => (
                    <tr key={u._id} className="hover:bg-slate-800/50">
                      <td className="p-4">{u.name}</td>
                      <td className="p-4 capitalize">{u.role}</td>
                      <td className="p-4">{u.email}</td>
                      <td className="p-4">
                        {u.role === 'ngo' ? (
                          u.isVerified ? <span className="text-green-400">Verified</span> : <span className="text-yellow-400 cursor-pointer hover:underline text-sm font-semibold border border-yellow-500/50 rounded px-2 py-1 bg-yellow-500/10">Approve</span>
                        ) : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : <p>Loading users...</p>}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
