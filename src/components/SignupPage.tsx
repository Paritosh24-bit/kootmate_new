import React, { useState } from 'react';
import { User, Mail, Gift, Sparkles, AlertCircle, ArrowLeft, KeyRound, ChevronRight, Send, CheckCircle, Calendar, GraduationCap } from 'lucide-react';
import Logo from './Logo';

interface SignupPageProps {
  onNavigate: (page: 'landing' | 'login' | 'signup' | 'dashboard') => void;
  onLoginSuccess: (user: { 
    name: string; 
    email: string; 
    couponCode?: string; 
    selectedBoard?: 'cbse' | 'ssc';
    avatarUrl?: string;
    googleId?: string;
    role?: string;
    schoolName?: string;
    dob?: string;
  }) => void;
  isDarkMode: boolean;
}

export default function SignupPage({ onNavigate, onLoginSuccess, isDarkMode }: SignupPageProps) {
  // Navigation & Multi-step configuration ('form' | 'otp')
  const [step, setStep] = useState<'form' | 'otp'>('form');

  // Input states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [coupon, setCoupon] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [selectedBoardChoice, setSelectedBoardChoice] = useState<'cbse' | 'ssc'>('cbse');
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher'>('student');
  const [otpCode, setOtpCode] = useState('');
  
  const [isOtpSending, setIsOtpSending] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [debugOtp, setDebugOtp] = useState('');

  // Step 1: Initiate signup by sending Email OTP
  const handleInitiateSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!name.trim()) {
      setErrorMsg('Full name is required to personalize your workspace.');
      return;
    }
    if (!email || !email.includes('@')) {
      setErrorMsg('Please input a valid email for verification.');
      return;
    }
    if (!password || password.length < 4) {
      setErrorMsg('Please create a password of at least 4 characters.');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Phone number is required and must be filled.');
      return;
    }

    setIsOtpSending(true);

    try {
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const res = await response.json();
      setIsOtpSending(false);

      if (response.ok && res.success) {
        if (res.mockUsed) {
          setSuccessMsg('Sandbox verification mode is active for standard test code 1234.');
        } else {
          setSuccessMsg('A 6-digit verification code has been successfully dispatched to your email.');
        }
        setStep('otp');
      } else {
        setErrorMsg(res.error || 'Failed to dispatch verification code. Try again.');
      }
    } catch (err) {
      setIsOtpSending(false);
      setErrorMsg('Network error requesting verification code. Try again later.');
    }
  };

  // Step 2: Verify OTP and save account details
  const handleVerifyOtpAndSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!otpCode || (otpCode.length !== 6 && otpCode !== '1234' && otpCode !== '123456')) {
      setErrorMsg('Please enter a correct 6-digit verification code to complete sign up.');
      return;
    }

    setIsRegistering(true);

    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          otp: otpCode,
          name,
          referral_code: coupon || '',
          selected_board: selectedBoardChoice,
          password: password, // safe password created by the user during signup
          role: selectedRole,
          school_name: schoolName,
          phone_number: phone,
          dob: dob
        }),
      });

      const res = await response.json();
      setIsRegistering(false);

      if (response.ok && res.success) {
        // Enforce synchronization to frontend localStorage so user login works flawlessly with created Email and Password
        try {
          const localUsersStr = localStorage.getItem('kootmate_users') || '[]';
          const localUsers = JSON.parse(localUsersStr);
          const filtered = localUsers.filter((u: any) => u.email.toLowerCase() !== email.toLowerCase());
          filtered.push({
            name: name,
            email: email.toLowerCase(),
            password: password,
            couponCode: coupon || '',
            selectedBoard: selectedBoardChoice,
            role: selectedRole,
            schoolName: schoolName,
            phoneNumber: phone,
            dob: dob,
            createdAt: new Date().toISOString()
          });
          localStorage.setItem('kootmate_users', JSON.stringify(filtered));
        } catch (storageErr) {
          console.warn('LocalStorage local user save warning:', storageErr);
        }

        setSuccessMsg(res.message || 'Email Verified! Loading your Syllabus Companion dashboard...');
        setTimeout(() => {
          const finalUser = { 
            ...res.user, 
            selectedBoard: selectedBoardChoice,
            role: selectedRole,
            schoolName: schoolName,
            phoneNumber: phone,
            dob: dob
          };
          onLoginSuccess(finalUser);
          onNavigate('dashboard');
        }, 1200);
      } else {
        setErrorMsg(res.error || 'Incorrect or expired verification code. Verify options.');
      }
    } catch (err) {
      setIsRegistering(false);
      setErrorMsg('Error enrolling profile in database. Verify network state.');
    }
  };

  const isCouponApplied = coupon.trim().length > 3;

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-neutral-50 text-neutral-900 transition-colors duration-200" id="signup-container">
      
      {/* Absolute top back link */}
      <div className="absolute top-6 left-6" id="signup-nav-header">
        <button
          onClick={() => {
            if (step === 'otp') {
              setStep('form');
              setErrorMsg('');
              setSuccessMsg('');
            } else {
              onNavigate('landing');
            }
          }}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer hover:bg-neutral-100 text-neutral-600"
          id="signup-back-btn"
        >
          <ArrowLeft className="w-4 h-4" />
          {step === 'otp' ? 'Back to Form' : 'Back to Home'}
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center" id="signup-branding">
        <div className="flex justify-center cursor-pointer" onClick={() => onNavigate('landing')}>
          <Logo size="sm" showText={true} className="w-20 h-20" />
        </div>
        <h2 className="mt-4 text-3xl font-black tracking-tight" style={{ color: '#5c3beb' }} id="signup-main-title">
          {step === 'form' ? 'Begin Your Journey' : 'Academic Verification'}
        </h2>
        <p className="mt-2 text-sm text-black font-black" id="signup-main-subtitle">
          {step === 'form' 
            ? 'Launch your premium Class 10 preparation dashboard' 
            : `Validate your email with OTP sent to ${email}`}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4" id="signup-card-container">
        <div className="py-8 px-6 sm:px-8 rounded-3xl border border-neutral-200 bg-white shadow-xl space-y-6" id="signup-card">
          
          {step === 'form' ? (
            /* ==================== STEP 1: GENERAL SIGNUP DATA ==================== */
            <form onSubmit={handleInitiateSignup} className="space-y-4" id="signup-main-form">
              
              {/* Account Role Selector */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
                  I want to sign up as a:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('student')}
                    className={`py-3 px-4 rounded-xl text-xs font-black border-2 transition-all cursor-pointer text-center ${
                      selectedRole === 'student'
                        ? 'border-[#5c3beb] bg-violet-50 text-[#5c3beb]'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-neutral-600'
                    }`}
                  >
                    🎓 Student
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole('teacher')}
                    className={`py-3 px-4 rounded-xl text-xs font-black border-2 transition-all cursor-pointer text-center ${
                      selectedRole === 'teacher'
                        ? 'border-amber-500 bg-amber-50 text-amber-800'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-neutral-600'
                    }`}
                  >
                    👩‍🏫 Teacher
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Paritosh Badave"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 border border-neutral-250 rounded-xl text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="paritoshbadave@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 border border-neutral-250 rounded-xl text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
                  Create Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                    <KeyRound className="w-5 h-5" />
                  </div>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 border border-neutral-250 rounded-xl text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                    <span className="text-sm font-bold pl-0.5">📞</span>
                  </div>
                  <input
                    type="tel"
                    required
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 border border-neutral-250 rounded-xl text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
                  Class 10 Syllabus Board
                </label>
                <div className="grid grid-cols-2 gap-3" id="signup-board-selector">
                  <button
                    type="button"
                    onClick={() => setSelectedBoardChoice('cbse')}
                    className={`py-3 px-4 rounded-xl text-xs font-black border transition-all cursor-pointer text-center ${
                      selectedBoardChoice === 'cbse'
                        ? 'border-[#5c3beb] bg-violet-50/50 text-[#5c3beb]'
                        : 'border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-600'
                    }`}
                  >
                    CBSE Board
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedBoardChoice('ssc')}
                    className={`py-3 px-4 rounded-xl text-xs font-black border transition-all cursor-pointer text-center ${
                      selectedBoardChoice === 'ssc'
                        ? 'border-[#5c3beb] bg-violet-50/50 text-[#5c3beb]'
                        : 'border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-600'
                    }`}
                  >
                    MH State Board (SSC)
                  </button>
                </div>
              </div>

              {selectedRole === 'student' && (
                <>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
                      School Name (Optional)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <input
                        type="text"
                        placeholder="Enter your school name (optional)"
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                        className="block w-full pl-11 pr-4 py-3 border border-neutral-250 rounded-xl text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white font-semibold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
                      Date of Birth
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <input
                        type="date"
                        required
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="block w-full pl-11 pr-4 py-3 border border-neutral-250 rounded-xl text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white font-semibold cursor-pointer"
                      />
                    </div>
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={isOtpSending}
                className="w-full mt-2 py-3.5 px-4 rounded-xl text-sm font-black text-white bg-[#5c3beb] hover:bg-[#4b2ec7] cursor-pointer disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-md shadow-violet-500/10"
                id="signup-send-otp-btn"
              >
                {isOtpSending ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Generating Security OTP...
                  </>
                ) : (
                  <>
                    <span>Generate & Send OTP</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* ==================== STEP 2: EMAIL OTP CONFIRMATION ==================== */
            <form onSubmit={handleVerifyOtpAndSave} className="space-y-5" id="signup-otp-form">
              <div className="space-y-2 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center text-[#5c3beb] mb-3">
                  <KeyRound className="w-6 h-6 animate-pulse" />
                </div>
                <h4 className="text-sm font-black text-neutral-900">Enter Verification Code</h4>
                <p className="text-xs text-neutral-500 font-semibold leading-relaxed">
                  Check your email inbox or folders for your validation code. (Note: Due to Resend's free tier configuration, verification emails are sent only to <span className="font-bold underline text-[#5c3beb]">paritoshbadave@gmail.com</span>. For any other email address, please use the standby bypass code <span className="font-extrabold text-[#5c3beb]">1234</span> or <span className="font-extrabold text-[#5c3beb]">123456</span> to register instantly!)
                </p>
              </div>

              <div>
                <input
                  id="signup-otp-input"
                  type="text"
                  maxLength={6}
                  required
                  placeholder="&bull; &bull; &bull; &bull; &bull; &bull;"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="block w-48 mx-auto text-center tracking-widest text-2xl font-black py-2.5 border-2 border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white animate-bounce"
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-neutral-500 space-y-1 text-left">
                <p className="font-extrabold text-neutral-800 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  Profile Configuration Summary:
                </p>
                <p className="pl-5 font-semibold text-[10.5px]">Name: <span className="text-neutral-900 font-bold">{name}</span></p>
                <p className="pl-5 font-semibold text-[10.5px]">Email: <span className="text-neutral-900 font-bold">{email}</span></p>
                <p className="pl-5 font-semibold text-[10.5px]">Syllabus Board: <span className="text-neutral-900 font-extrabold uppercase">{selectedBoardChoice}</span></p>
              </div>

              <button
                type="submit"
                disabled={isRegistering}
                className="w-full py-3.5 px-4 rounded-xl text-sm font-black text-white bg-[#5c3beb] hover:bg-[#4b2ec7] cursor-pointer disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-md shadow-violet-500/10"
                id="signup-verify-create-btn"
              >
                {isRegistering ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin animate-pulse"></span>
                    Enrolling Academic Profile...
                  </>
                ) : (
                  <>
                    <span>Verify Code & Create Account</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Feedback message alerts */}
          {errorMsg && (
            <div className="mt-4 p-3.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-600 text-xs flex items-start gap-2 animate-shake" id="signup-error-alert">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span className="font-extrabold text-left">{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mt-4 p-3.5 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-600 text-xs flex items-start gap-2 text-left" id="signup-success-alert">
              <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-emerald-500 animate-bounce" />
              <span className="font-extrabold">{successMsg}</span>
            </div>
          )}

          {/* Switch back to login options */}
          <p className="mt-4 text-center text-xs font-black text-black">
            Already have a premium school account?{' '}
            <button
              onClick={() => onNavigate('login')}
              className="text-violet-600 font-bold hover:underline cursor-pointer bg-transparent border-0"
              id="signup-navigate-to-login"
            >
              Sign In Instead
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
