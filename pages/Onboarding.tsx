import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Briefcase, ShieldCheck, ChevronRight, ArrowRight } from 'lucide-react';

const ONBOARDING_STEPS = [
  {
    id: 1,
    title: "探索創意宇宙",
    description: "連接全台頂尖創作者與設計師，發現無限靈感與可能性。",
    icon: Sparkles,
    color: "text-indigo-600",
    bg: "bg-indigo-50"
  },
  {
    id: 2,
    title: "輕鬆接案與發案",
    description: "無論是尋找人才還是尋找工作，透過 AI 智能匹配，快速達成合作。",
    icon: Briefcase,
    color: "text-purple-600",
    bg: "bg-purple-50"
  },
  {
    id: 3,
    title: "安全有保障",
    description: "完善的第三方支付託管與合約保護，讓每一次合作都安心無虞。",
    icon: ShieldCheck,
    color: "text-emerald-600",
    bg: "bg-emerald-50"
  }
];

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      navigate('/login');
    }
  };

  const handleSkip = () => {
    navigate('/login');
  };

  const CurrentIcon = ONBOARDING_STEPS[currentStep].icon;

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between pb-safe">
      {/* Skip Button */}
      <div className="px-6 pt-12 flex justify-end">
        <button 
          onClick={handleSkip}
          className="text-sm font-medium text-gray-400 hover:text-gray-900 transition-colors"
        >
          跳過
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        {/* Animated Icon Container */}
        <div className="mb-12 relative">
          <div className={`w-32 h-32 rounded-[2rem] ${ONBOARDING_STEPS[currentStep].bg} flex items-center justify-center mb-6 transform transition-all duration-500`}>
            <CurrentIcon size={64} className={`${ONBOARDING_STEPS[currentStep].color} transition-all duration-500`} />
          </div>
          {/* Decorative Elements */}
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-100 rounded-full opacity-50 blur-xl animate-pulse"></div>
          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-100 rounded-full opacity-50 blur-xl animate-pulse delay-150"></div>
        </div>

        {/* Text Content */}
        <div className="space-y-4 max-w-xs mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500" key={currentStep}>
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">
            {ONBOARDING_STEPS[currentStep].title}
          </h1>
          <p className="text-gray-500 leading-relaxed">
            {ONBOARDING_STEPS[currentStep].description}
          </p>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="px-8 pb-12">
        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mb-8">
          {ONBOARDING_STEPS.map((_, index) => (
            <div 
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentStep ? 'w-8 bg-indigo-600' : 'w-2 bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button 
          onClick={handleNext}
          className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-gray-200 hover:bg-black transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          {currentStep === ONBOARDING_STEPS.length - 1 ? (
            <>
              開始使用 <ArrowRight size={20} />
            </>
          ) : (
            '下一步'
          )}
        </button>
      </div>
    </div>
  );
};

export default Onboarding;