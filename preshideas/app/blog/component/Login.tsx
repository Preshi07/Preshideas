import React, { useState } from 'react';
import { Lock, ArrowRight, AlertCircle } from 'lucide-react';

interface LoginProps {
  onLogin: (success: boolean) => void;
  onCancel: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin, onCancel }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would check against a secure backend.
    // For this demo, we'll use a hardcoded simple password.
    if (password === 'admin' || password === 'presh') {
      localStorage.setItem('presh_auth', 'true');
      onLogin(true);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl border border-gray-100 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gray-900 to-gray-600" />
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-50 mb-4 text-gray-900">
            <Lock size={20} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 font-serif">Admin Access</h2>
          <p className="text-gray-500 text-sm mt-2">Enter your password to manage content.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all bg-gray-50 focus:bg-white text-lg"
              placeholder="••••••••"
              autoFocus
            />
            {error && (
              <div className="flex items-center text-red-500 text-sm mt-2 animate-in slide-in-from-left-2">
                <AlertCircle size={14} className="mr-1" />
                <span>Incorrect password. Try 'admin'.</span>
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-black transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              Sign In <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
        </form>
        
        <div className="mt-8 text-center">
            <p className="text-xs text-gray-400">Restricted area for PreshIdeas administrators.</p>
        </div>
      </div>
    </div>
  );
};