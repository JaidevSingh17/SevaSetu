import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'donor',
    description: '',
    address: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const result = await register(formData);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 my-8">
      <div className="card w-full max-w-lg space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Join SevaSetu</h2>
          <p className="text-textMuted mt-2">Create an account to make a difference</p>
        </div>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm text-center">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4 mb-4">
            <button
              type="button"
              className={`flex-1 py-2 rounded-lg transition-colors border ${formData.role === 'donor' ? 'bg-primary/20 border-primary text-primary' : 'border-slate-600 text-slate-400 hover:bg-slate-800'}`}
              onClick={() => setFormData({ ...formData, role: 'donor' })}
            >
              I am a Donor
            </button>
            <button
              type="button"
              className={`flex-1 py-2 rounded-lg transition-colors border ${formData.role === 'ngo' ? 'bg-accent/20 border-accent text-accent' : 'border-slate-600 text-slate-400 hover:bg-slate-800'}`}
              onClick={() => setFormData({ ...formData, role: 'ngo' })}
            >
              I am an NGO
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              {formData.role === 'ngo' ? 'Organization Name' : 'Full Name'}
            </label>
            <input 
              type="text" name="name" required className="input-field" 
              value={formData.name} onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
            <input 
              type="email" name="email" required className="input-field" 
              value={formData.email} onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
            <input 
              type="password" name="password" required className="input-field" 
              value={formData.password} onChange={handleChange}
            />
          </div>

          {formData.role === 'ngo' && (
            <div className="space-y-4 pt-2 border-t border-slate-700 animate-fadeIn">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Description / Mission</label>
                <textarea 
                  name="description" className="input-field h-24 resize-none" 
                  value={formData.description} onChange={handleChange} required
                />
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-300 mb-1">Address</label>
                  <input 
                    type="text" name="address" className="input-field" 
                    value={formData.address} onChange={handleChange} required
                  />
                </div>
                <div className="w-1/3">
                  <label className="block text-sm font-medium text-slate-300 mb-1">Phone</label>
                  <input 
                    type="text" name="phone" className="input-field" 
                    value={formData.phone} onChange={handleChange} required
                  />
                </div>
              </div>
            </div>
          )}
          
          <button 
            type="submit" 
            className={`btn-primary w-full flex justify-center py-2.5 mt-4 ${formData.role === 'ngo' ? 'hover:bg-green-600 bg-accent' : ''}`}
            disabled={loading}
          >
            {loading ? <span className="animate-pulse">Creating account...</span> : 'Sign Up'}
          </button>
        </form>
        
        <div className="text-center text-sm text-slate-400 mt-4">
          Already have an account? <Link to="/login" className="text-primary hover:underline">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
