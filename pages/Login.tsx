import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/app');
  };

  const handleSocialLogin = () => {
    navigate('/app');
  }

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center px-8 pb-safe">
      
      {/* Header */}
      <div className="mb-10 animate-in slide-in-from-bottom-5 duration-500 flex flex-col items-center sm:items-start">
        <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-indigo-200 ring-4 ring-indigo-50">
            <span className="text-white font-bold text-3xl font-sans drop-shadow-md">C</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2 self-start tracking-tight">
          {isLogin ? '歡迎回來' : '建立帳號'}
        </h1>
        <p className="text-gray-500 self-start font-medium">
          {isLogin ? '請輸入您的帳號密碼以繼續' : '加入 CreatorHub，開始您的創作旅程'}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5 animate-in slide-in-from-bottom-10 duration-700 delay-100">
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-900 ml-1">Email</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Mail size={20} className="text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
            </div>
            <input 
              type="email" 
              defaultValue="hello@example.com"
              placeholder="hello@example.com"
              className="w-full bg-gray-50 text-gray-900 text-base rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all placeholder:text-gray-400 border border-transparent focus:border-indigo-100"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-900 ml-1">密碼</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Lock size={20} className="text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
            </div>
            <input 
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              defaultValue="password123"
              className="w-full bg-gray-50 text-gray-900 text-base rounded-2xl py-4 pl-12 pr-12 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all placeholder:text-gray-400 border border-transparent focus:border-indigo-100"
              required
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600 p-2"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {isLogin && (
          <div className="flex justify-end">
            <button type="button" className="text-xs font-bold text-indigo-600 hover:text-indigo-700">
              忘記密碼？
            </button>
          </div>
        )}

        <button 
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-200 hover:shadow-indigo-300 hover:scale-[1.02] transition-all active:scale-95 mt-6"
        >
          {isLogin ? '登入' : '註冊'}
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-8 text-center animate-in fade-in duration-700 delay-200">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-100"></div>
        </div>
        <span className="relative px-4 bg-white text-xs text-gray-400 font-bold uppercase tracking-wider">Or continue with</span>
      </div>

      {/* Social Login */}
      <div className="grid grid-cols-2 gap-4 animate-in fade-in duration-700 delay-300">
        <button 
            type="button"
            onClick={handleSocialLogin}
            className="flex items-center justify-center gap-2 py-3.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors active:scale-95 bg-white"
        >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
            <span className="text-sm font-bold text-gray-700">Google</span>
        </button>
        <button 
            type="button"
            onClick={handleSocialLogin}
            className="flex items-center justify-center gap-2 py-3.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors active:scale-95 bg-white"
        >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.35-1.09-.56-2.09-.48-3.08.35-1.4 1.18-2.6 1.07-4.13-2.19-2.06-4.39.69-7.42 3.65-7.43 1.15-.01 2.05.49 2.65.49.66 0 1.95-.55 3.32-.47 1.12.07 2.15.5 2.76 1.25-2.52 1.4-2.1 5.27.56 6.32-.57 1.28-1.27 2.45-2.65 1.33zM12.03 7.25c-.15-2.28 1.63-4.22 3.84-4.25.26 2.48-2.34 4.54-3.84 4.25z"/>
            </svg>
            <span className="text-sm font-bold text-gray-700">Apple</span>
        </button>
      </div>

      {/* Toggle */}
      <div className="mt-10 text-center animate-in fade-in duration-700 delay-500">
        <p className="text-sm text-gray-500">
          {isLogin ? "還沒有帳號嗎？" : "已經有帳號了？"}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="ml-1 font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            {isLogin ? '立即註冊' : '登入'}
          </button>
        </p>
      </div>

    </div>
  );
};

export default Login;