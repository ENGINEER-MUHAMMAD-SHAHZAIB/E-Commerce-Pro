import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, User, ArrowLeft, CheckCircle } from 'lucide-react';
import { useApp } from '../AppContext';
import { toast } from 'sonner';

interface AuthPagesProps {
  mode: 'login' | 'register' | 'forgot';
  onNavigate: (page: string) => void;
  onModeChange: (mode: 'login' | 'register' | 'forgot') => void;
}

export const AuthPages: React.FC<AuthPagesProps> = ({ mode, onNavigate, onModeChange }) => {
  const { login, register } = useApp();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'login') {
        const success = await login(formData.email, formData.password);
        if (success) {
          toast.success('Login successful!');
          onNavigate('home');
        } else {
          toast.error('Invalid credentials');
        }
      } else if (mode === 'register') {
        if (formData.password !== formData.confirmPassword) {
          toast.error('Passwords do not match');
          setLoading(false);
          return;
        }
        const success = await register(formData.email, formData.password, formData.name);
        if (success) {
          toast.success('Registration successful!');
          onNavigate('home');
        } else {
          toast.error('Registration failed');
        }
      } else if (mode === 'forgot') {
        // Mock password reset
        setTimeout(() => {
          setResetSent(true);
          setLoading(false);
        }, 1000);
        return;
      }
    } catch (error) {
      toast.error('An error occurred');
    }
    
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (mode === 'forgot' && resetSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Check Your Email</h2>
          <p className="text-gray-600 mb-6">
            We've sent password reset instructions to <strong>{formData.email}</strong>
          </p>
          <button
            onClick={() => onModeChange('login')}
            className="w-full py-3 gradient-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Back to Login
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="gradient-primary p-8 text-white text-center">
            <button
              onClick={() => onNavigate('home')}
              className="absolute top-4 left-4 p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-3xl font-bold mb-2">Phi Horizon</h1>
            <p className="text-purple-100">
              {mode === 'login' && 'Welcome back!'}
              {mode === 'register' && 'Create your account'}
              {mode === 'forgot' && 'Reset your password'}
            </p>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {mode === 'register' && (
                <div>
                  <label className="block text-sm font-semibold mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {mode !== 'forgot' && (
                <div>
                  <label className="block text-sm font-semibold mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              )}

              {mode === 'register' && (
                <div>
                  <label className="block text-sm font-semibold mb-2">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              )}

              {mode === 'login' && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span>Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => onModeChange('forgot')}
                    className="text-purple-600 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 gradient-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? 'Please wait...' : 
                 mode === 'login' ? 'Sign In' :
                 mode === 'register' ? 'Create Account' :
                 'Send Reset Link'}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center text-sm">
              {mode === 'login' ? (
                <p>
                  Don't have an account?{' '}
                  <button
                    onClick={() => onModeChange('register')}
                    className="text-purple-600 font-semibold hover:underline"
                  >
                    Sign up
                  </button>
                </p>
              ) : mode === 'register' ? (
                <p>
                  Already have an account?{' '}
                  <button
                    onClick={() => onModeChange('login')}
                    className="text-purple-600 font-semibold hover:underline"
                  >
                    Sign in
                  </button>
                </p>
              ) : (
                <button
                  onClick={() => onModeChange('login')}
                  className="text-purple-600 font-semibold hover:underline"
                >
                  Back to login
                </button>
              )}
            </div>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Demo Credentials:</strong>
              </p>
              <p className="text-xs text-gray-600">
                User: <strong>user@demo.com</strong> / password: <strong>demo</strong>
              </p>
              <p className="text-xs text-gray-600">
                Admin: <strong>admin@phihorizon.com</strong> / password: <strong>admin</strong>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
