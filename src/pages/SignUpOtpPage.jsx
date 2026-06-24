import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUpOtpPage() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(30);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef([]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling && element.value !== '') {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0 && inputs.current[index - 1]) {
      inputs.current[index - 1].focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    navigate('/set-password');
  };

  return (
    <div className="flex-grow flex items-center justify-center pt-12 pb-12 px-6 relative z-10 min-h-[calc(100vh-64px)]">
      {/* Ambient Background Glow */}
      <div className="fixed top-1/4 left-1/4 w-[500px] h-[500px] bg-secondary-container/30 dark:bg-primary-fixed/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      <div className="fixed bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary-fixed-dim/20 dark:bg-primary-fixed/10 rounded-full blur-[80px] -z-10 pointer-events-none"></div>
      
      <div className="glass-panel dark:bg-[#070e12]/80 w-full max-w-[520px] rounded-2xl p-8 md:p-10 relative overflow-hidden transition-colors">
        {/* Step 2: OTP Verification */}
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-secondary-container/30 dark:bg-primary-fixed/20 flex items-center justify-center mb-6 text-primary dark:text-primary-fixed">
            <span className="material-symbols-outlined">phonelink_ring</span>
          </div>
          <h2 className="font-[Outfit] text-[24px] font-semibold text-on-surface dark:text-white mb-2">Verify Mobile</h2>
          <p className="font-[Inter] text-[16px] text-on-surface-variant dark:text-slate-400 text-center mb-6">
            We've sent a 6-digit code to <br /> <strong className="text-on-surface dark:text-white">+91 98765 43210</strong>
          </p>
          
          <form className="w-full flex flex-col items-center" onSubmit={handleVerify}>
            <div className="flex gap-2 justify-center w-full mb-6">
              {otp.map((data, index) => {
                return (
                  <input
                    key={index}
                    className="otp-input w-12 h-14 text-center text-2xl font-semibold rounded-lg border border-outline-variant dark:border-slate-600 bg-surface-lowest dark:bg-slate-800 text-on-surface dark:text-white focus:border-primary dark:focus:border-primary-fixed outline-none"
                    type="text"
                    name="otp"
                    maxLength="1"
                    value={data}
                    onChange={e => handleChange(e.target, index)}
                    onKeyDown={e => handleKeyDown(e, index)}
                    onFocus={e => e.target.select()}
                    ref={el => inputs.current[index] = el}
                    autoFocus={index === 0}
                  />
                );
              })}
            </div>
            
            <div className="text-center font-[Inter] text-[16px] text-on-surface-variant dark:text-slate-400 mb-8">
              Didn't receive code? <br />
              {timeLeft > 0 ? (
                <span className="text-primary dark:text-primary-fixed font-medium mt-1 inline-block">Resend in 00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span>
              ) : (
                <button type="button" className="text-primary dark:text-primary-fixed font-medium hover:underline mt-1 inline-block" onClick={() => setTimeLeft(30)}>Resend Code</button>
              )}
            </div>
            
            <button 
              className="w-full h-[48px] bg-primary dark:bg-primary-container text-on-primary dark:text-primary-fixed font-[Inter] text-[14px] font-medium rounded-lg hover:opacity-90 active:scale-[0.98] transition-all" 
              type="submit"
            >
              Verify Mobile
            </button>
          </form>
          
          <button 
            className="mt-4 font-[Inter] text-[14px] font-medium text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-primary-fixed transition-colors flex items-center gap-1" 
            onClick={() => navigate('/signup')} 
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Back to details
          </button>
        </div>
      </div>
    </div>
  );
}
